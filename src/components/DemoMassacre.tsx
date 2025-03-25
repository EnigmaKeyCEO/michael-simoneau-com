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
  metrics: Metric[];
  before?: {
    performance: string;
    cost: string;
    uptime: string;
  };
  after?: {
    performance: string;
    cost: string;
    uptime: string;
  };
};

export const DemoMassacre: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Animate when in view
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Define with proper typing
  const projects: ProjectData[] = [
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
      metrics: [], // Empty metrics for the second project
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

  // Get references to the projects
  const project1 = projects[0];
  const project2 = projects[1];

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
        <h2 className="text-5xl font-bold mb-16 text-center">
          System Massacre Gallery
        </h2>

        {/* YachtOffice Project */}
        <motion.div
          className="mb-20 bg-black/50 p-8 rounded-lg"
          variants={{
            visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
            hidden: { x: -100, opacity: 0 }
          }}
        >
          <h3 className="text-3xl font-bold mb-6 text-cyan-400">
            {project1.title}
          </h3>
          <p className="text-xl mb-8 text-gray-300">{project1.description}</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {project1.metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-lg"
                variants={{
                  visible: { 
                    y: 0, 
                    opacity: 1,
                    transition: { duration: 0.5, delay: index * 0.2 }
                  },
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
        </motion.div>

        {/* StoneX Bloodbath */}
        <motion.div
          className="bg-black/50 p-8 rounded-lg"
          variants={{
            visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
            hidden: { x: 100, opacity: 0 }
          }}
        >
          <h3 className="text-3xl font-bold mb-6 text-red-500">
            {project2.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {project2.before && (
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold mb-4">Before Execution</h4>
                <div className="space-y-4">
                  <p className="text-xl text-gray-400">Performance: {project2.before.performance}</p>
                  <p className="text-xl text-gray-400">Monthly Cost: {project2.before.cost}</p>
                  <p className="text-xl text-gray-400">Uptime: {project2.before.uptime}</p>
                </div>
              </div>
            )}
            
            {project2.after && (
              <div className="space-y-6">
                <h4 className="text-2xl font-semibold mb-4">After Resurrection</h4>
                <div className="space-y-4">
                  <p className="text-xl text-green-400">Performance: {project2.after.performance}</p>
                  <p className="text-xl text-green-400">Monthly Cost: {project2.after.cost}</p>
                  <p className="text-xl text-green-400">Uptime: {project2.after.uptime}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};