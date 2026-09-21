import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Bulletproof, high-performance audio engine:
 * - Plays custom audio files (MP3, WAV, M4A, OGG, AAC, Data URLs, Blob URLs, server paths).
 * - Instant reactive playback when a new audio track is uploaded.
 * - Auto-handles user gesture unlocks for Web Audio & HTML5 Audio.
 * - Smooth volume ramping and seeking.
 * - Procedural ambient piano/harp synthesizer fallback if no audio file is uploaded yet.
 */
export function useAudioPlayer(audioSrc?: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolumeState] = useState(0.7);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const synthGainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Stop procedural synth
  const stopSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthGainNodeRef.current && audioCtxRef.current) {
      try {
        synthGainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      } catch {
        // Ignore
      }
    }
  }, []);

  // Procedural romantic chord synth fallback
  const playAmbientTone = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Warm chord progression: Cmaj9, Am9, Fmaj7, G6
      const chordNotes = [
        [261.63, 329.63, 392.00, 493.88, 587.33],
        [220.00, 261.63, 329.63, 392.00, 493.88],
        [174.61, 261.63, 329.63, 349.23, 440.00],
        [196.00, 246.94, 293.66, 392.00, 440.00],
      ];

      let chordIdx = 0;

      const triggerChord = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const now = audioCtxRef.current.currentTime;
        const currentChord = chordNotes[chordIdx % chordNotes.length];
        chordIdx++;

        currentChord.forEach((freq, i) => {
          if (!audioCtxRef.current) return;
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          const filter = audioCtxRef.current.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(850 + i * 150, now);

          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 0.002 - 0.001)), now);

          const stagger = i * 0.18;
          gain.gain.setValueAtTime(0.0001, now + stagger);
          gain.gain.exponentialRampToValueAtTime(0.06 / (i + 1), now + stagger + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.00001, now + stagger + 4.5);

          osc.connect(filter);
          filter.connect(gain);
          if (synthGainNodeRef.current) {
            gain.connect(synthGainNodeRef.current);
          } else {
            gain.connect(audioCtxRef.current.destination);
          }

          osc.start(now + stagger);
          osc.stop(now + stagger + 5.0);
        });
      };

      if (!synthGainNodeRef.current) {
        synthGainNodeRef.current = ctx.createGain();
        synthGainNodeRef.current.gain.value = volumeRef.current;
        synthGainNodeRef.current.connect(ctx.destination);
      }

      stopSynth();
      triggerChord();
      synthIntervalRef.current = window.setInterval(triggerChord, 4200);
    } catch {
      // AudioContext not available
    }
  }, [stopSynth]);

  // Audio element setup and event binding
  useEffect(() => {
    if (!audioRef.current) {
      const el = document.createElement('audio');
      el.loop = true;
      el.preload = 'auto';
      el.crossOrigin = 'anonymous';
      audioRef.current = el;
    }

    const audio = audioRef.current;

    const onCanPlay = () => {
      setDuration(audio.duration || 180);
      setAudioLoaded(true);
      setAudioError(false);
      if (isPlayingRef.current) {
        stopSynth();
        audio.play().catch(() => {});
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onError = () => {
      setAudioLoaded(false);
      setAudioError(true);
      if (isPlayingRef.current) {
        playAmbientTone();
      }
    };

    const onEnded = () => {
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('loadeddata', onCanPlay);
    audio.addEventListener('loadedmetadata', onCanPlay);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    if (audioSrc && audioSrc.trim() !== '') {
      audio.src = audioSrc;
      audio.volume = isMuted ? 0 : volume;
      audio.load();
    }

    return () => {
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('loadeddata', onCanPlay);
      audio.removeEventListener('loadedmetadata', onCanPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioSrc, isMuted, volume, stopSynth, playAmbientTone]);

  // Volume synchronization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (synthGainNodeRef.current) {
      synthGainNodeRef.current.gain.value = isMuted ? 0 : volume * 0.5;
    }
  }, [volume, isMuted]);

  // Unlock AudioContext on user interaction
  const unlockAudio = useCallback(() => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, []);

  // Play audio track
  const startAudio = useCallback(() => {
    unlockAudio();
    setIsPlaying(true);
    isPlayingRef.current = true;

    if (audioRef.current && audioSrc && !audioError) {
      audioRef.current
        .play()
        .then(() => {
          stopSynth();
          setAudioLoaded(true);
        })
        .catch(() => {
          playAmbientTone();
        });
    } else {
      playAmbientTone();
    }
  }, [unlockAudio, audioSrc, audioError, playAmbientTone, stopSynth]);

  // Pause audio
  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    stopSynth();
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend().catch(() => {});
    }
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, [stopSynth]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  }, [isPlaying, pauseAudio, startAudio]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current && !isNaN(time)) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    } else {
      setCurrentTime(time);
    }
  }, []);

  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
  }, []);

  const fadeVolume = useCallback((targetVol: number, durationMs: number = 1500) => {
    const steps = 20;
    const stepTime = durationMs / steps;
    const startVol = volumeRef.current;
    const volDiff = targetVol - startVol;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const nextVol = Math.max(0, Math.min(1, startVol + volDiff * (step / steps)));
      setVolumeState(nextVol);
      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);
  }, []);

  return {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    volume,
    audioLoaded,
    audioError,
    togglePlay,
    startAudio,
    pauseAudio,
    toggleMute,
    setVolume,
    seek,
    fadeVolume,
    unlockAudio,
  };
}
