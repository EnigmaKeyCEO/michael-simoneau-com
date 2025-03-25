import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bug } from 'lucide-react';

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = '404 | Michael Simoneau';
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative">
      {/* Glitch overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)] z-0" />
      
      <motion.div 
        className="max-w-2xl w-full bg-gray-900/80 p-8 md:p-12 rounded-lg backdrop-blur-sm z-10 border border-cyan-900/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Bug size={80} className="text-cyan-400" />
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
            404 Error
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-300 text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          The system you're looking for has been terminated.
        </motion.p>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/">
            <motion.button
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={20} />
              Return to Hub
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}; 