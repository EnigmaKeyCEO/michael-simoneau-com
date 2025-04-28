import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket } from 'lucide-react';
import { QuantumButton } from './QuantumButton';

export const CTOTriage: React.FC = () => {
  return (
    <motion.section 
      id="cto-triage"
      className="flex flex-col items-center justify-center text-white px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="container w-full mx-auto px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-center">
          <span className="block text-cyan-400">QUANTUM CRYPTOGRAPHY PIONEER</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-4">Enterprise Transformation Protocol</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-6 md:mb-16">
          <motion.div
            className="bg-black/50 p-4 md:p-8 rounded-lg"
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-cyan-400" />
              Quantum Strategy Analysis
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Post-Quantum Readiness Assessment
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Self-Evolving Architecture Design
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Enterprise Mesh Implementation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Fortune 500 Value Proposition
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-black/50 p-4 md:p-8 rounded-lg"
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="text-cyan-400" />
              Quantum Transformation Protocol
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                60-Day Quantum Evolution Roadmap
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Quantum-Ready Team Development
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Self-Healing System Implementation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                ROI-Driven Success Metrics
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
        >
          <QuantumButton
            text="SCHEDULE A CONSULTATION"
            href="https://www.linkedin.com/in/michaelsimoneau/"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};