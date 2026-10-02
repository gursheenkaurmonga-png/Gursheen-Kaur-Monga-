import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Disc,
  Heart,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { romanticAudio, ROMANTIC_TRACKS, TrackInfo } from '../utils/audio';

interface AudioToggleProps {
  initialExpanded?: boolean;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ initialExpanded = false }) => {
  const [isPlaying, setIsPlaying] = useState(romanticAudio.getIsPlaying());
  const [activeTrack, setActiveTrack] = useState<string>(romanticAudio.getActiveTrack());
  const [volume, setVolume] = useState<number>(romanticAudio.getVolume());
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [showTrackPicker, setShowTrackPicker] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing, trackId) => {
      setIsPlaying(playing);
      setActiveTrack(trackId);
    });
    return () => unsubscribe();
  }, []);

  const handleTogglePlay = () => {
    romanticAudio.toggleBackgroundMusic();
  };

  const handleTrackChange = (trackId: string) => {
    romanticAudio.setTrack(trackId);
    setShowTrackPicker(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    romanticAudio.setVolume(val);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      const restored = prevVolume > 0 ? prevVolume : 0.35;
      setIsMuted(false);
      setVolume(restored);
      romanticAudio.setVolume(restored);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
      setVolume(0);
      romanticAudio.setVolume(0);
    }
  };

  const currentTrackObj: TrackInfo =
    ROMANTIC_TRACKS.find((t) => t.id === activeTrack) || ROMANTIC_TRACKS[0];

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      {!isExpanded ? (
        /* Collapsed Floating Pill */
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-rose-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
          {/* Spinning Disc / Note Icon */}
          <div
            onClick={handleTogglePlay}
            className={`w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center cursor-pointer transition-transform ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
            title={isPlaying ? 'Click to pause romantic music' : 'Click to play romantic music'}
          >
            <Disc
              className={`w-4 h-4 ${
                isPlaying ? 'text-rose-500 fill-rose-200' : 'text-stone-400'
              }`}
            />
          </div>

          {/* Quick Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-rose-600 transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span className="text-rose-600">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-stone-700 text-stone-700 group-hover:fill-rose-600 group-hover:text-rose-600" />
                <span>Play Our Song</span>
              </>
            )}
          </button>

          {/* Animated sound bars when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3 px-1">
              <span className="w-0.5 h-full bg-rose-400 rounded-full animate-bounce" />
              <span className="w-0.5 h-2/3 bg-rose-500 rounded-full animate-pulse" />
              <span className="w-0.5 h-full bg-rose-400 rounded-full animate-bounce [animation-delay:150ms]" />
            </div>
          )}

          {/* Expand details button */}
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full ml-1"
            title="Open music player controls"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Expanded Floating Music Card */
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-rose-200/90 shadow-2xl w-72 sm:w-80 transition-all duration-300 animate-fadeIn relative">
          {/* Header row */}
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                <Music className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <span>Romantic Music</span>
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-300" />
                </h4>
                <p className="text-[10px] text-stone-400 font-medium">Looping soft instrumental</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex items-center justify-center transition-colors"
              title="Minimize player"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Active Track Info */}
          <div className="py-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-rose-600 truncate max-w-[190px]">
                {currentTrackObj.name}
              </span>
              <button
                type="button"
                onClick={() => setShowTrackPicker(!showTrackPicker)}
                className="text-[10px] text-stone-400 hover:text-rose-600 underline font-medium"
              >
                Change melody
              </button>
            </div>
            <p className="text-[10px] text-stone-500 italic">{currentTrackObj.mood}</p>

            {/* Track Picker Dropdown */}
            {showTrackPicker && (
              <div className="mt-2.5 p-2 bg-rose-50/70 border border-rose-100 rounded-2xl space-y-1">
                {ROMANTIC_TRACKS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTrackChange(t.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      activeTrack === t.id
                        ? 'bg-rose-500 text-white font-semibold'
                        : 'text-stone-700 hover:bg-rose-100/60'
                    }`}
                  >
                    <span>{t.name}</span>
                    {activeTrack === t.id && <Sparkles className="w-3 h-3 text-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main Controls: Big Play Button & Sound Bars */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTogglePlay}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all active:scale-95 shadow-xs ${
                  isPlaying
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-rose-600" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Play Music</span>
                  </>
                )}
              </button>

              {/* Animated Sound Equalizer Waves */}
              {isPlaying ? (
                <div className="flex items-end gap-1 h-5 px-1.5 py-0.5">
                  <span className="w-1 h-full bg-rose-400 rounded-full animate-bounce" />
                  <span className="w-1 h-3/4 bg-rose-500 rounded-full animate-pulse" />
                  <span className="w-1 h-5/6 bg-rose-400 rounded-full animate-bounce [animation-delay:180ms]" />
                  <span className="w-1 h-2/3 bg-rose-300 rounded-full animate-pulse [animation-delay:90ms]" />
                </div>
              ) : (
                <span className="text-[11px] text-stone-400 italic">Click Play to listen</span>
              )}
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-stone-400 hover:text-stone-700 p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-16 h-1 bg-stone-200 accent-rose-500 rounded-lg cursor-pointer"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
