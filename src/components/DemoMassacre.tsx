import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, TrendingDown, Timer } from 'lucide-react';

export const DemoMassacre: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const projects = [
    {
      title: "PROJECT YACHTOFFICE",
      description: "AI-powered legacy system obliteration",
      metrics: [
        { label: "Learning Rate", value: "900%", icon: <Zap /> },
        { label: "Cost Reduction", value: "$1.2M → $280K", icon: <TrendingDown /> },
        { label: "Implementation", value: "11 Weeks", icon: <Timer /> }
      ]
    },
    {
      title: "STONEX BLOODBATH",
      description: "Complete system resurrection and optimization",
      before: {
        performance: "2.3s load time",
        cost: "$1.2M monthly",
        uptime: "94.5%"
      },
      after: {
        performance: "187ms load time",
        cost: "$280K monthly",
        uptime: "99.99%"
      }
    }
  ];

  return (
    <section 
      id="demo-massacre" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-black/90 to-gray-900 text-white py-20"
    >
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold mb-16 text-center">
          System Massacre Gallery
        </h2>

        {/* YachtOffice Project */}
        <motion.div
          className="mb-20 bg-black/50 p-8 rounded-lg"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-cyan-400">
            {projects[0].title}
          </h3>
          <p className="text-xl mb-8 text-gray-300">{projects[0].description}</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects[0].metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  {metric.icon}
                  <span className="text-lg font-semibold">{metric.label}</span>
                </div>
                <span className="text-3xl font-bold text-cyan-400">{metric.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* StoneX Bloodbath */}
        <motion.div
          className="bg-black/50 p-8 rounded-lg"
          initial={{ x: 100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold mb-6 text-red-500">
            {projects[1].title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold mb-4">Before Execution</h4>
              <div className="space-y-4">
                <p className="text-xl text-gray-400">Performance: {projects[1].before.performance}</p>
                <p className="text-xl text-gray-400">Monthly Cost: {projects[1].before.cost}</p>
                <p className="text-xl text-gray-400">Uptime: {projects[1].before.uptime}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-2xl font-semibold mb-4">After Resurrection</h4>
              <div className="space-y-4">
                <p className="text-xl text-green-400">Performance: {projects[1].after.performance}</p>
                <p className="text-xl text-green-400">Monthly Cost: {projects[1].after.cost}</p>
                <p className="text-xl text-green-400">Uptime: {projects[1].after.uptime}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};