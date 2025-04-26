import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Cpu, BookOpen } from 'lucide-react';
import { InterviewButton } from './InterviewButton';
import { QuantumButton } from './QuantumButton';

const GlowingText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.span
      whileHover={{ textShadow: '0 0 10px rgba(0, 255, 136, 0.7), 0 0 20px rgba(0, 255, 136, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)' }}
      className="transition-colors duration-300"
    >
      {children}
    </motion.span>
  );
};

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <motion.section 
      style={{ y, opacity }}
      id="hero-section"
      className="relative min-h-screen flex flex-col justify-between text-white px-4 py-16 overflow-y-auto snap-start"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Top section with title */}
      <div className="flex-shrink-0">
        <motion.h1 
          className="text-4xl md:text-8xl font-bold text-center"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlowingText>MICHAEL SIMONEAU</GlowingText>
          <span className="block text-lg md:text-4xl mt-3 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text font-extrabold">
            <GlowingText>QUANTUM CRYPTOGRAPHY PIONEER</GlowingText>
          </span>
          <span className="block text-base md:text-3xl mt-2 text-cyan-400 font-bold">
            <GlowingText>FROM HOMELESS TO $200M ARCHITECT</GlowingText>
          </span>
        </motion.h1>

        <motion.p 
          className="text-base md:text-2xl text-gray-300 mt-3 text-center max-w-3xl mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Pioneering quantum-resistant enterprise architectures that transform legacy systems into self-evolving quantum fortresses
        </motion.p>
      </div>

      {/* Center section with interview */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <InterviewButton />
      </div>

      {/* Bottom section with buttons */}
      <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <QuantumButton 
            text="Security Audit" 
            icon={<Shield size={20} />} 
            targetId="security-audit"
            className="flex-1" 
          />
          <QuantumButton 
            text="Demo Massacre" 
            icon={<Zap size={20} />} 
            targetId="demo-massacre"
            className="flex-1" 
          />
          <QuantumButton 
            text="CTO Triage" 
            icon={<Cpu size={20} />} 
            targetId="cto-triage"
            className="flex-1" 
          />
          <QuantumButton 
            text="Web Log" 
            icon={<BookOpen size={20} />} 
            to="/blog"
            className="flex-1" 
          />
        </div>
      </div>
    </motion.section>
  );
};