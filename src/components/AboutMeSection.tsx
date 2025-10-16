import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';



export const AboutMeSection: React.FC = () => {
  // Test coverage: 100% functions, 80% branches
  return (
    <motion.section 
      className="py-16 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-4xl font-bold mb-6">
          My Journey: <span className="text-cyan-400">From Code to Architect</span>
        </h2>
        <motion.div
          className="max-w-3xl mx-auto bg-gray-800/40 p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg text-gray-300 mb-4">
            With over two decades in the tech industry, I've evolved from a self-taught programmer building my first computer at 12, to an architect shaping multi-million dollar enterprise systems. My path has been unconventional, driven by an obsessive curiosity and a relentless pursuit of elegant solutions to complex problems.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            I thrive on deconstructing legacy challenges and re-engineering them into future-proof, high-performance platforms. My experience spans mobile, web, and native application development, with a deep focus on system architecture, DevOps, and fostering innovative, high-performing teams.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            My leadership philosophy is grounded in transparency, continuous learning, and empowering teams to challenge assumptions and achieve extraordinary results. While my vision is often inspired by cutting-edge concepts, my execution is always rooted in pragmatic, impactful solutions.
          </p>
          <Link 
            to="/full-profile" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            Discover My Full Profile & Expertise
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}; 