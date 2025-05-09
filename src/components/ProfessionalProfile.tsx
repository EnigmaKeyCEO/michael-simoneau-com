import React from 'react';
import { motion } from 'framer-motion';
import { QuantumButton } from './QuantumButton';
import { UniversalPlayer } from './UniversalPlayer';

// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// LEGACY SYSTEM TERMINATOR

export const ProfessionalProfile: React.FC = () => {
  return (
    <motion.div 
      className="bg-gradient-to-b from-quantum-900 to-black text-white p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Quick Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-quantum-300 mb-2">20+</h3>
            <p className="text-quantum-400">Years Experience</p>
          </div>
          <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-quantum-300 mb-2">$200M+</h3>
            <p className="text-quantum-400">Architectural Impact</p>
          </div>
          <div className="bg-quantum-800/30 p-6 rounded-lg text-center">
            <h3 className="text-4xl font-bold text-quantum-300 mb-2">100+</h3>
            <p className="text-quantum-400">Projects Delivered</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-8 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <QuantumButton 
            text="View Full Quantum Profile"
            to="/full-profile"
            className="mx-auto"
          />
          <p className="mt-4 text-quantum-300">
            Discover the complete journey of a quantum-ready architect
          </p>
        </motion.div>

        {/* Audio Player */}
        <motion.div
          className="text-center mt-8 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <UniversalPlayer />
        </motion.div>
        
      </div>
    </motion.div>
  );
}; 