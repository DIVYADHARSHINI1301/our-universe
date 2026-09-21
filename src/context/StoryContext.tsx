import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { initialStoryData, type StoryConfig } from '../data/story';
import {
  loadStoryFromDB,
  saveStoryToDB,
  clearStoryFromDB,
  fetchStoryFromServer,
  saveStoryToServer,
  uploadFileToServer,
} from '../utils/storage';

interface StoryContextType {
  story: StoryConfig;
  isEditMode: boolean;
  isCustomizerOpen: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  toggleEditMode: () => void;
  openCustomizer: () => void;
  closeCustomizer: () => void;
  updateCouple: (coupleData: Partial<StoryConfig['couple']>) => void;
  updateApology: (apologyData: Partial<StoryConfig['apology']>) => void;
  updateHero: (heroData: Partial<StoryConfig['hero']>) => void;
  updateSoundtrack: (soundtrackData: Partial<StoryConfig['soundtrack']>) => void;
  updateTimelineItem: (id: string, updatedFields: Partial<StoryConfig['timeline'][0]>) => void;
  updatePolaroid: (id: string, updatedFields: Partial<StoryConfig['polaroids'][0]>) => void;
  updateFilmFrame: (id: string, updatedFields: Partial<StoryConfig['filmReel']['frames'][0]>) => void;
  updateLittleThing: (id: string, updatedFields: Partial<StoryConfig['littleThings'][0]>) => void;
  updateJarStar: (id: string, updatedFields: Partial<StoryConfig['memoryJar']['stars'][0]>) => void;
  updateGeneralStory: (newStory: StoryConfig) => void;
  handleFileUpload: (
    file: File,
    callback: (mediaUrl: string, mediaType: 'image' | 'video' | 'audio') => void
  ) => Promise<void>;
  exportConfigToClipboard: () => string;
  exportConfigAsJSON: () => void;
  importConfigFromJSON: (jsonString: string) => boolean;
  resetToDefault: () => Promise<void>;
}

const StoryContext = createContext<StoryContextType | null>(null);

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [story, setStory] = useState<StoryConfig>(initialStoryData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const saveTimerRef = useRef<number | null>(null);

  // 1. Initial async load from IndexedDB and/or Local Server on mount
  useEffect(() => {
    let isMounted = true;

    async function initializeStory() {
      try {
        // Priority 1: Check server-saved disk story
        const serverStory = await fetchStoryFromServer();
        if (serverStory && isMounted) {
          setStory({ ...initialStoryData, ...serverStory });
          await saveStoryToDB({ ...initialStoryData, ...serverStory });
          setIsLoaded(true);
          return;
        }

        // Priority 2: Check IndexedDB browser database
        const dbStory = await loadStoryFromDB();
        if (dbStory && isMounted) {
          setStory({ ...initialStoryData, ...dbStory });
          setIsLoaded(true);
          // Sync back to server if connected
          saveStoryToServer({ ...initialStoryData, ...dbStory });
          return;
        }
      } catch (err) {
        console.warn('Could not load custom story from storage:', err);
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    }

    initializeStory();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Auto-save whenever story state changes (after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    setIsSaving(true);
    saveTimerRef.current = window.setTimeout(async () => {
      try {
        // Save to IndexedDB (permanent browser storage, handles GBs of videos/photos)
        await saveStoryToDB(story);
        // Save to local disk via Vite server endpoint
        await saveStoryToServer(story);
        setLastSavedAt(new Date());
      } catch (err) {
        console.error('Error saving story:', err);
      } finally {
        setIsSaving(false);
      }
    }, 400);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [story, isLoaded]);

  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
  }, []);

  const openCustomizer = useCallback(() => {
    setIsCustomizerOpen(true);
  }, []);

  const closeCustomizer = useCallback(() => {
    setIsCustomizerOpen(false);
  }, []);

  const updateCouple = useCallback((coupleData: Partial<StoryConfig['couple']>) => {
    setStory((prev) => ({
      ...prev,
      couple: { ...prev.couple, ...coupleData },
    }));
  }, []);

  const updateApology = useCallback((apologyData: Partial<StoryConfig['apology']>) => {
    setStory((prev) => ({
      ...prev,
      apology: { ...prev.apology, ...apologyData },
    }));
  }, []);

  const updateHero = useCallback((heroData: Partial<StoryConfig['hero']>) => {
    setStory((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroData },
    }));
  }, []);

  const updateSoundtrack = useCallback((soundtrackData: Partial<StoryConfig['soundtrack']>) => {
    setStory((prev) => ({
      ...prev,
      soundtrack: { ...prev.soundtrack, ...soundtrackData },
    }));
  }, []);

  const updateTimelineItem = useCallback((id: string, updatedFields: Partial<StoryConfig['timeline'][0]>) => {
    setStory((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)),
    }));
  }, []);

  const updatePolaroid = useCallback((id: string, updatedFields: Partial<StoryConfig['polaroids'][0]>) => {
    setStory((prev) => ({
      ...prev,
      polaroids: prev.polaroids.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)),
    }));
  }, []);

  const updateFilmFrame = useCallback((id: string, updatedFields: Partial<StoryConfig['filmReel']['frames'][0]>) => {
    setStory((prev) => ({
      ...prev,
      filmReel: {
        ...prev.filmReel,
        frames: prev.filmReel.frames.map((frame) => (frame.id === id ? { ...frame, ...updatedFields } : frame)),
      },
    }));
  }, []);

  const updateLittleThing = useCallback((id: string, updatedFields: Partial<StoryConfig['littleThings'][0]>) => {
    setStory((prev) => ({
      ...prev,
      littleThings: prev.littleThings.map((item) => (item.id === id ? { ...item, ...updatedFields } : item)),
    }));
  }, []);

  const updateJarStar = useCallback((id: string, updatedFields: Partial<StoryConfig['memoryJar']['stars'][0]>) => {
    setStory((prev) => ({
      ...prev,
      memoryJar: {
        ...prev.memoryJar,
        stars: prev.memoryJar.stars.map((star) => (star.id === id ? { ...star, ...updatedFields } : star)),
      },
    }));
  }, []);

  const updateGeneralStory = useCallback((newStory: StoryConfig) => {
    setStory(newStory);
  }, []);

  // Permanent file upload handler (Saves directly to disk in public/uploads/ + IndexedDB)
  const handleFileUpload = useCallback(
    async (file: File, callback: (mediaUrl: string, mediaType: 'image' | 'video' | 'audio') => void) => {
      const isVideo = file.type.startsWith('video');
      const isAudio = file.type.startsWith('audio');
      const defaultType: 'image' | 'video' | 'audio' = isVideo ? 'video' : isAudio ? 'audio' : 'image';

      const result = await uploadFileToServer(file);
      if (result) {
        callback(result.url, result.type);
      } else {
        // Fallback to FileReader DataURL
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            callback(e.target.result as string, defaultType);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const exportConfigToClipboard = useCallback(() => {
    const formatted = `export const storyData = ${JSON.stringify(story, null, 2)};`;
    navigator.clipboard.writeText(formatted);
    return formatted;
  }, [story]);

  const exportConfigAsJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(story, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `our-little-universe-config-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [story]);

  const importConfigFromJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setStory({ ...initialStoryData, ...parsed });
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetToDefault = useCallback(async () => {
    if (window.confirm('Reset all stories, photos, and messages back to initial defaults?')) {
      await clearStoryFromDB();
      try {
        await fetch('/api/reset-story', { method: 'POST' });
      } catch {
        // Ignore
      }
      setStory(initialStoryData);
    }
  }, []);

  return (
    <StoryContext.Provider
      value={{
        story,
        isEditMode,
        isCustomizerOpen,
        isSaving,
        lastSavedAt,
        toggleEditMode,
        openCustomizer,
        closeCustomizer,
        updateCouple,
        updateApology,
        updateHero,
        updateSoundtrack,
        updateTimelineItem,
        updatePolaroid,
        updateFilmFrame,
        updateLittleThing,
        updateJarStar,
        updateGeneralStory,
        handleFileUpload,
        exportConfigToClipboard,
        exportConfigAsJSON,
        importConfigFromJSON,
        resetToDefault,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
};
