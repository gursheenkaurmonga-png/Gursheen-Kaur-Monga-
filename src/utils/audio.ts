/**
 * Romantic Audio Synthesizer & Sound Effects using Web Audio API.
 * Features:
 * - 3 soft, soothing romantic instrumental melody themes (warm piano, music box, starlit ambient)
 * - True continuous harmonic looping with smooth voice release
 * - Custom audio stream support with automatic fallback
 * - Event listener subscription for play/pause state sync across the entire app
 */

import { cleanAudioUrl } from './urlHelper';

export interface TrackInfo {
  id: string;
  name: string;
  mood: string;
}

export const ROMANTIC_TRACKS: TrackInfo[] = [
  { id: 'piano-romance', name: 'Golden Hour Piano', mood: 'Warm, cozy & sentimental' },
  { id: 'music-box', name: 'Music Box Keepsake', mood: 'Delicate, nostalgic chime' },
  { id: 'starlit-chimes', name: 'Starlit Love Theme', mood: 'Dreamy & romantic ambient' },
];

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private musicIntervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private currentVolume = 0.35;
  private activeTrackId: string = 'piano-romance';
  private stateChangeListeners: Set<(isPlaying: boolean, trackId: string) => void> = new Set();
  private audioElement: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: (isPlaying: boolean, trackId: string) => void) {
    this.stateChangeListeners.add(listener);
    // Notify immediately with current state
    listener(this.isPlayingMusic, this.activeTrackId);
    return () => {
      this.stateChangeListeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.stateChangeListeners.forEach((fn) => fn(this.isPlayingMusic, this.activeTrackId));
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.currentVolume;
    }
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }

  public getActiveTrack(): string {
    return this.activeTrackId;
  }

  public setCustomAudioUrl(url: string | null) {
    const cleaned = url ? cleanAudioUrl(url) : null;
    const isNew = this.customAudioUrl !== cleaned;
    this.customAudioUrl = cleaned;

    if (isNew && this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
      if (this.isPlayingMusic) {
        this.stopBackgroundMusic();
        this.startBackgroundMusic();
      }
    }
  }

  public getCustomAudioUrl(): string | null {
    return this.customAudioUrl;
  }

  public setTrack(trackId: string) {
    this.activeTrackId = trackId;
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      this.startBackgroundMusic();
    } else {
      this.notifyListeners();
    }
  }

  // Plays a soft piano or music-box note with warm harmonics
  private playInstrumentNote(freq: number, duration = 1.6, volume = 0.12, isLead = false) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const overtone = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      if (this.activeTrackId === 'music-box') {
        osc.type = 'sine';
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, now); // Octave chime
      } else if (this.activeTrackId === 'starlit-chimes') {
        osc.type = 'sine';
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(freq * 1.5, now); // Fifth harmonic
      } else {
        // Warm Piano: Sine fundamental + warm subtle overtone
        osc.type = 'sine';
        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, now);
      }

      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft cozy warmth (no harsh high frequencies)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isLead ? 1800 : 900, now);

      // Gentle attack and exponential decay
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(volume, now + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      overtone.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + duration);
      overtone.stop(now + duration);
    } catch {
      // AudioContext ignored if blocked
    }
  }

  // Harmonic chord progressions for each romantic theme
  private getSequenceForTrack(trackId: string): { melody: number[]; bass: number[]; tempoMs: number } {
    if (trackId === 'music-box') {
      // Pachelbel Canon & Romantic lullaby inspired sequence
      return {
        melody: [
          659.25, 783.99, 987.77, 1046.50,
          880.00, 783.99, 659.25, 587.33,
          523.25, 659.25, 783.99, 880.00,
          783.99, 659.25, 587.33, 523.25,
          587.33, 659.25, 783.99, 880.00,
          659.25, 587.33, 523.25, 493.88,
        ],
        bass: [261.63, 196.00, 220.00, 164.81, 174.61, 261.63, 174.61, 196.00],
        tempoMs: 480,
      };
    } else if (trackId === 'starlit-chimes') {
      // Dreamy, ethereal ambient progression
      return {
        melody: [
          523.25, 659.25, 783.99, 1046.50,
          987.77, 783.99, 880.00, 659.25,
          698.46, 880.00, 1046.50, 1318.51,
          1046.50, 880.00, 783.99, 659.25,
        ],
        bass: [261.63, 329.63, 349.23, 392.00],
        tempoMs: 650,
      };
    } else {
      // 'piano-romance': Golden Hour Piano Arpeggios (C - G/B - Am - F)
      return {
        melody: [
          // C Major arpeggios
          523.25, 659.25, 783.99, 1046.50, 783.99, 659.25,
          // G / B
          493.88, 587.33, 783.99, 987.77, 783.99, 587.33,
          // A minor
          440.00, 523.25, 659.25, 880.00, 659.25, 523.25,
          // F Major
          349.23, 440.00, 523.25, 698.46, 523.25, 440.00,
        ],
        bass: [130.81, 123.47, 110.00, 87.31],
        tempoMs: 420,
      };
    }
  }

  public startBackgroundMusic() {
    this.initContext();
    if (this.isPlayingMusic) return;

    // If a custom audio URL is set, try playing it with full error safety
    if (this.customAudioUrl) {
      try {
        if (this.audioElement) {
          this.audioElement.pause();
          this.audioElement = null;
        }

        const audio = new Audio();
        audio.src = this.customAudioUrl;
        audio.loop = true;
        audio.volume = this.currentVolume;
        audio.preload = 'auto';

        let hasFallenBack = false;
        const triggerFallback = () => {
          if (!hasFallenBack) {
            hasFallenBack = true;
            this.audioElement = null;
            this.startSynthesizedMusic();
          }
        };

        audio.addEventListener('error', triggerFallback);

        this.audioElement = audio;

        audio.play().then(() => {
          this.isPlayingMusic = true;
          this.notifyListeners();
        }).catch(() => {
          triggerFallback();
        });
        return;
      } catch {
        this.startSynthesizedMusic();
        return;
      }
    }

    this.startSynthesizedMusic();
  }

  private startSynthesizedMusic() {
    this.isPlayingMusic = true;
    this.notifyListeners();

    const { melody, bass, tempoMs } = this.getSequenceForTrack(this.activeTrackId);
    let step = 0;

    // Loop the progression continuously
    this.musicIntervalId = window.setInterval(() => {
      if (!this.isPlayingMusic) return;

      const note = melody[step % melody.length];
      this.playInstrumentNote(note, 1.8, 0.11, true);

      // Play bass pedal chord every 6 beats
      if (step % 6 === 0) {
        const bassIdx = Math.floor(step / 6) % bass.length;
        const bassNote = bass[bassIdx];
        this.playInstrumentNote(bassNote, 3.2, 0.08, false);
        // Add gentle fifth overtone to root
        this.playInstrumentNote(bassNote * 1.5, 2.5, 0.04, false);
      }

      step++;
    }, tempoMs);
  }

  public stopBackgroundMusic() {
    this.isPlayingMusic = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch {
        // Ignore
      }
    }
    this.notifyListeners();
  }

  public toggleBackgroundMusic(): boolean {
    if (this.isPlayingMusic) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  // Interactive Sound Effects for user delight
  public playChime() {
    this.initContext();
    const chords = [523.25, 659.25, 783.99, 1046.50];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote(freq, 0.8, 0.12, true);
      }, idx * 70);
    });
  }

  public playPop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.07);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignored
    }
  }

  public playSealBreak() {
    this.initContext();
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote(freq, 1.0, 0.14, true);
      }, idx * 60);
    });
  }

  public playRedeemSound() {
    this.initContext();
    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote(freq, 1.2, 0.15, true);
      }, idx * 80);
    });
  }

  // Card flip gentle swoosh / click
  public playCardFlip() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignored
    }
  }

  // Memory card match / trivia correct sound
  public playMatchSuccess() {
    this.initContext();
    const notes = [659.25, 880.00, 1046.50]; // E5, A5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote(freq, 0.9, 0.12, true);
      }, idx * 60);
    });
  }

  // Wrong answer soft gentle boop (not harsh)
  public playWrongTone() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.18);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // Ignored
    }
  }

  // Spin wheel click tick sound
  public playWheelTick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.02);
    } catch {
      // Ignored
    }
  }

  // Victory Fanfare for winning trivia, wheel, or memory game
  public playVictoryFanfare() {
    this.initContext();
    const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    fanfare.forEach((freq, idx) => {
      setTimeout(() => {
        this.playInstrumentNote(freq, 1.4, 0.16, true);
      }, idx * 90);
    });
  }
}

export const romanticAudio = new RomanticAudioManager();
