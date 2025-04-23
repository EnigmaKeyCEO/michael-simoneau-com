import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useSpeech } from '../contexts/SpeechContext';

export const UniversalPlayer: React.FC = () => {
  const { 
    isPlaying, 
    play,
    pause,
    skipForward, 
    skipBack, 
    currentPhrase, 
    totalPhrases,
    isSupported 
  } = useSpeech();
  
  if (!isSupported) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const currentIndex = currentPhrase ? parseInt(currentPhrase) : 0;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-center justify-center gap-1 bg-black/40 backdrop-blur-sm h-[52px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Previous Button */}
        <motion.button 
          onClick={skipBack}
          className="relative h-4 w-4 flex items-center justify-center transition-all group disabled:opacity-50"
          disabled={currentIndex === 0}
          whileTap={{ scale: 0.95 }}
        >
          <SkipBack className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button 
          onClick={handlePlayPause}
          className="relative h-8 w-8 flex items-center justify-center rounded-full bg-cyan-400 transition-all group mx-1"
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-black/80" />
          ) : (
            <Play className="w-4 h-4 text-black/80 ml-0.5" />
          )}
        </motion.button>

        {/* Next Button */}
        <motion.button 
          onClick={skipForward}
          className="relative h-4 w-4 flex items-center justify-center transition-all group disabled:opacity-50"
          disabled={currentIndex === totalPhrases - 1}
          whileTap={{ scale: 0.95 }}
        >
          <SkipForward className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </motion.button>
      </motion.div>
    </div>
  );
}; 