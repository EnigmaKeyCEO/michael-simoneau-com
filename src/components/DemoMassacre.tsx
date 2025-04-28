import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Zap, TrendingDown, Timer } from 'lucide-react';

// Define proper types for metrics and project data
type Metric = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

type ProjectData = {
  title: string;
  description: string;
  metrics?: Metric[];
  before?: { performance: string; cost: string; uptime: string };
  after?: { performance: string; cost: string; uptime: string };
};

export const DemoMassacre: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Responsive x offset for animation
  const getXOffset = (idx: number) => {
    if (idx !== 1) return 0;
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return 100;
    }
    return 0;
  };

  // Animate when in view
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Define projects array using ProjectData type
  const projects: ProjectData[] = [
    {
      title: "QUANTUM MESH TRANSFORMATION",
      description: "Fortune 500 Financial Institution - Complete System Evolution",
      metrics: [
        { label: "Processing Speed", value: "40,000x", icon: <Zap /> },
        { label: "Cost Reduction", value: "$4.2M → $180K", icon: <TrendingDown /> },
        { label: "Implementation", value: "8 Weeks", icon: <Timer /> }
      ]
    },
    {
      title: "LEGACY SYSTEM TERMINATION",
      description: "",
      before: {
        performance: "4.5s quantum vulnerability window",
        cost: "$3.8M operational overhead",
        uptime: "94.5%"
      },
      after: {
        performance: "50ms quantum-safe processing",
        cost: "$220K with autoscaling",
        uptime: "99.99%"
      }
    }
  ];

  return (
    <motion.section 
      ref={sectionRef}
      id="demo-massacre"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative"
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.8 } },
        hidden: { opacity: 0 }
      }}
    >
      <motion.div
        className="container mx-auto px-4"
        variants={{
          visible: { opacity: 1, transition: { duration: 1 } },
          hidden: { opacity: 0 }
        }}
      >
        <h2 className="font-bold mb-8 md:mb-16 text-center break-words w-full">
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cyan-400 break-words text-center">FROM HOMELESS TO $200M ARCHITECT</span>
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl block mt-4 break-words text-center">Enterprise Transformation Gallery</span>
        </h2>

        {/* Render projects dynamically */}
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            className={`mb-20 bg-black/50 p-8 rounded-lg ${idx === 1 ? '' : ''}`}
            variants={{
              visible: { x: getXOffset(idx), opacity: 1, transition: { duration: 0.8 } },
              hidden: { x: getXOffset(idx), opacity: 0 }
            }}
          >
            <h3 className={`font-bold mb-6 ${idx === 0 ? 'text-cyan-400' : 'text-red-500'} text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}>
              {project.title}
            </h3>
            {project.description && (
              <p className="text-xl mb-8 text-gray-300">{project.description}</p>
            )}
            {project.metrics && (
              <div className="grid md:grid-cols-3 gap-8">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg"
                    variants={{
                      visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: index * 0.2 } },
                      hidden: { y: 50, opacity: 0 }
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {metric.icon}
                      <span className="text-lg font-semibold">{metric.label}</span>
                    </div>
                    <span className="text-3xl font-bold text-cyan-400">{metric.value}</span>
                  </motion.div>
                ))}
              </div>
            )}
            {project.before && project.after && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-2xl font-semibold mb-4">Legacy Infrastructure</h4>
                  <div className="space-y-4">
                    <p className="text-xl text-gray-400">Performance: {project.before.performance}</p>
                    <p className="text-xl text-gray-400">Monthly Cost: {project.before.cost}</p>
                    <p className="text-xl text-gray-400">Security: Classical encryption only</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-semibold mb-4">Quantum-Ready Architecture</h4>
                  <div className="space-y-4">
                    <p className="text-xl text-green-400">Performance: {project.after.performance}</p>
                    <p className="text-xl text-green-400">Monthly Cost: {project.after.cost}</p>
                    <p className="text-xl text-green-400">Security: Post-quantum cryptography</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};