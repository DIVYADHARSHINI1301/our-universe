import { type StoryConfig } from '../data/story';

const DB_NAME = 'OurLittleUniverseDB';
const STORE_NAME = 'story_store';
const STORY_KEY = 'active_story';
const DB_VERSION = 1;

/**
 * Open or initialize the browser IndexedDB database.
 * IndexedDB provides gigabytes of persistent browser storage
 * and never throws 5MB QuotaExceededError like localStorage.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this environment'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Save the entire story configuration (including high-res Base64 photos, videos, audios)
 * into IndexedDB permanently.
 */
export async function saveStoryToDB(story: StoryConfig): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(story, STORY_KEY);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('Failed to save story to IndexedDB, falling back to localStorage if possible:', err);
    try {
      localStorage.setItem('our_little_universe_fallback', JSON.stringify(story));
    } catch {
      // Ignore if localStorage quota exceeded
    }
  }
}

/**
 * Load the saved story configuration from IndexedDB permanently.
 */
export async function loadStoryFromDB(): Promise<StoryConfig | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(STORY_KEY);

      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result as StoryConfig);
        } else {
          // Check fallback localStorage
          try {
            const fallback = localStorage.getItem('our_little_universe_fallback');
            if (fallback) {
              resolve(JSON.parse(fallback) as StoryConfig);
              return;
            }
          } catch {
            // Ignore
          }
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('Failed to load story from IndexedDB:', err);
    try {
      const fallback = localStorage.getItem('our_little_universe_fallback');
      if (fallback) {
        return JSON.parse(fallback) as StoryConfig;
      }
    } catch {
      // Ignore
    }
    return null;
  }
}

/**
 * Clear the saved story from IndexedDB and fallbacks.
 */
export async function clearStoryFromDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(STORY_KEY);

      request.onsuccess = () => {
        try {
          localStorage.removeItem('our_little_universe_fallback');
          localStorage.removeItem('our_little_universe_story_data_v2');
        } catch {
          // Ignore
        }
        resolve();
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (err) {
    console.warn('Failed to clear story from IndexedDB:', err);
  }
}

/**
 * Sync with Vite Local Server API if available.
 */
export async function fetchStoryFromServer(): Promise<StoryConfig | null> {
  try {
    const res = await fetch('/api/story');
    if (!res.ok) return null;
    const data = await res.json();
    if (data && data.exists && data.story) {
      return data.story as StoryConfig;
    }
    return null;
  } catch {
    return null;
  }
}

export async function saveStoryToServer(story: StoryConfig): Promise<boolean> {
  try {
    const res = await fetch('/api/save-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ story }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function uploadFileToServer(file: File): Promise<{ url: string; type: 'image' | 'video' | 'audio' } | null> {
  return new Promise((resolve) => {
    const isVideo = file.type.startsWith('video');
    const isAudio = file.type.startsWith('audio');
    const mediaType: 'image' | 'video' | 'audio' = isVideo ? 'video' : isAudio ? 'audio' : 'image';

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        resolve(null);
        return;
      }

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: file.name,
            dataUrl,
            type: mediaType,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.success && result.url) {
            resolve({ url: result.url, type: mediaType });
            return;
          }
        }
      } catch (err) {
        console.warn('Server upload not reachable, using local DataURL:', err);
      }

      // Fallback: return dataUrl
      resolve({ url: dataUrl, type: mediaType });
    };

    reader.onerror = () => {
      resolve(null);
    };

    reader.readAsDataURL(file);
  });
}
