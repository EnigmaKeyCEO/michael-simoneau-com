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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        className="flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Previous Button */}
        <motion.button 
          onClick={skipBack}
          className="relative p-2.5 rounded-full transition-all group disabled:opacity-50"
          disabled={currentIndex === 0}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/30 rounded-full shadow-inner" />
          <SkipBack className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10" />
        </motion.button>

        {/* Play/Pause Button */}
        <motion.button 
          onClick={handlePlayPause}
          className="relative p-4 rounded-full transition-all group"
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-[4px] group-hover:blur-[6px] group-hover:bg-cyan-400/30 transition-all" />
          
          {/* Button background */}
          <div className="absolute inset-0 rounded-full bg-cyan-500 group-hover:bg-cyan-400 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
          </div>
          
          {/* Icon */}
          {isPlaying ? (
            <Pause className="w-6 h-6 text-black/80 relative z-10" />
          ) : (
            <Play className="w-6 h-6 text-black/80 relative z-10 ml-0.5" />
          )}
        </motion.button>

        {/* Next Button */}
        <motion.button 
          onClick={skipForward}
          className="relative p-2.5 rounded-full transition-all group disabled:opacity-50"
          disabled={currentIndex === totalPhrases - 1}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-600/30 to-gray-800/30 rounded-full shadow-inner" />
          <SkipForward className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors relative z-10" />
        </motion.button>
      </motion.div>
    </div>
  );
}; 