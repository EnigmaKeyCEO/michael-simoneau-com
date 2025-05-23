import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Timer } from 'lucide-react';

// Metric type for clarity
type Metric = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export const JPMorganProject: React.FC = () => {
  const metrics: Metric[] = [
    { label: "Uptime Improvement", value: "94.5% → 99.99%", icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400" /> },
    { label: "Operational Cost Reduction", value: "Over 60%", icon: <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-green-400" /> },
    { label: "Deployment Frequency", value: "10x Faster", icon: <Timer className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" /> }
  ];

  return (
    <motion.div
      // #quantumReady #billionDollarProof
      // Type-safe since inception
      className="p-8 bg-gray-800/30 rounded-lg my-8 md:my-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h3 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">J.P. Morgan - Enterprise System Transformation (PaymentNet)</h3>
      <p className="text-base md:text-lg text-gray-300 mb-6">
        Modernized a critical legacy payment platform (PaymentNet), dramatically improving reliability and efficiency while reducing operational overhead. This involved architectural redesign, agile transformation, and team leadership.
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
              <span className={`block text-md md:text-lg font-semibold ${ (metric.icon as React.ReactElement).props.className?.includes('text-green') ? 'text-green-400' : 'text-cyan-300' }`}>{metric.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h4 className="text-lg md:text-xl font-semibold text-cyan-400 mb-3">Key Contributions & Highlights:</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm md:text-base">
          <li>Led the native iOS development for PaymentNet using Swift.</li>
          <li>Architected for phased modernization, introducing an API gateway for decoupling.</li>
          <li>Migrated components to a microservices architecture on a cloud-native platform.</li>
          <li>Drove adoption of Agile (SCRUM), improving team alignment and deployment frequency.</li>
          <li>Implemented robust CI/CD pipelines and Infrastructure as Code (IaC).</li>
          <li>Built and mentored a high-performing development team.</li>
        </ul>
      </div>
      <p className="text-cyan-500 font-semibold text-sm md:text-base">Key Technologies: Swift, iOS Native, Microservices, API Gateways, Cloud Platforms, CI/CD, Agile (SCRUM), System Architecture.</p>
      {/* TODO: Add visuals, perhaps illustrating team collaboration or app scale */}
    </motion.div>
  );
}; 