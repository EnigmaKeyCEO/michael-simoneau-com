import React from 'react';
import { motion } from 'framer-motion';



export const JPMorganProject: React.FC = () => {
  return (
    <motion.div
      // #quantumReady #billionDollarProof
      // Type-safe since inception
      className="p-8 bg-gray-800/30 rounded-lg my-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h3 className="text-3xl font-bold text-cyan-400 mb-4">J.P. Morgan - Lead iOS Engineer (PaymentNet)</h3>
      <p className="text-lg text-gray-300 mb-4">
        Spearheaded the development of the PaymentNet mobile application for corporate internal use, serving over 2 million users.
        Successfully navigated tech stack transitions and transformed project methodology from waterfall to Agile (SCRUM).
      </p>
      <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
        <li>Architected the native iOS application using Swift.</li>
        <li>Built and mentored a high-performing development team.</li>
        <li>Improved team alignment across business, design, and development verticals.</li>
        <li>Drove significant time savings and efficiency through Agile adoption.</li>
      </ul>
      <p className="text-cyan-500 font-semibold">Key Technologies: Swift, iOS Native Development, Agile (SCRUM), Team Leadership, System Architecture.</p>
      {/* TODO: Add visuals, perhaps illustrating team collaboration or app scale */}
    </motion.div>
  );
}; 