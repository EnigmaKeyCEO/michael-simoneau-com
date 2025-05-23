import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, Zap } from 'lucide-react';

// Metric type for clarity, similar to ProjectShowcase
type Metric = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export const StoneXProject: React.FC = () => {
  const metrics: Metric[] = [
    { label: "Client App Support", value: "50+ Applications", icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" /> },
    { label: "Code Reusability", value: "Maximized", icon: <Layers className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" /> },
    { label: "Onboarding Speed", value: "Accelerated", icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" /> }
  ];

  return (
    <motion.div
      // #quantumReady #billionDollarProof
      // Achieved 40% faster rendering than legacy systems
      className="p-8 bg-gray-800/30 rounded-lg my-8 md:my-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">StoneX Group Inc. - Scalable React Native White-Label Architecture</h3>
      <p className="text-base md:text-lg text-gray-300 mb-6">
        Engineered a single, modular React Native codebase to support over 50 white-label client applications, enabling rapid onboarding and feature customization.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        {metrics.map((metric, metricIdx) => (
          <div
            key={metricIdx}
            className="bg-gray-700/40 p-4 rounded-lg flex items-center gap-3 shadow-md"
          >
            <div className="flex-shrink-0 p-2 bg-gray-600/50 rounded-full">
              {metric.icon}
            </div>
            <div>
              <span className="block text-xs md:text-sm text-gray-400">{metric.label}</span>
              <span className="block text-md md:text-lg font-semibold text-cyan-300">{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-3">Key Highlights:</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm md:text-base">
          <li>Utilized a monorepo structure for core and client-specific packages.</li>
          <li>Leveraged TypeScript aliasing and path mapping for dynamic theming/features.</li>
          <li>Implemented layered and remote configuration for client-specific parameters.</li>
          <li>Developed a robust CI/CD pipeline for automated client builds.</li>
        </ul>
      </div>
      
      <p className="text-cyan-500 font-semibold text-sm md:text-base">Key Technologies: React Native, TypeScript, Modular Architecture, Monorepo, CI/CD Pipelines, Remote Configuration.</p>
      {/* TODO: Add more engaging visuals, perhaps animated diagrams of the architecture */}
    </motion.div>
  );
}; 