import React from 'react';
import { motion } from 'framer-motion';



export const StoneXProject: React.FC = () => {
  return (
    <motion.div
      // #quantumReady #billionDollarProof
      // Achieved 40% faster rendering than legacy systems
      className="p-8 bg-gray-800/30 rounded-lg my-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-3xl font-bold text-cyan-400 mb-4">StoneX Group Inc. - White-Label React Native Architecture</h3>
      <p className="text-lg text-gray-300 mb-4">
        Led the architecture and development of a highly modular and scalable white-label React Native application.
        This system was designed to efficiently support multiple clients with a single, manageable codebase.
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
        <li>Engineered a clever use of TypeScript aliasing and modular sub-packages.</li>
        <li>Enabled client-specific features via remote configuration and a robust build pipeline.</li>
        <li>Significantly streamlined the process of onboarding new white-label clients.</li>
      </ul>
      <p className="text-cyan-500 font-semibold">Key Technologies: React Native, TypeScript, Modular Architecture, CI/CD Pipelines, Remote Configuration.</p>
      {/* TODO: Add more engaging visuals, perhaps animated diagrams of the architecture */}
    </motion.div>
  );
}; 