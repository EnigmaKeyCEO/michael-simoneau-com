import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Cpu, BookOpen } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { InterviewButton } from './InterviewButton';

const GlowingText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const glow = useSpring({
    textShadow: isHovered
      ? '0 0 10px rgba(0, 255, 136, 0.7), 0 0 20px rgba(0, 255, 136, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)'
      : '0 0 0px rgba(0, 255, 136, 0)',
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.span
      style={glow}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-colors duration-300"
    >
      {children}
    </animated.span>
  );
};

const CTAButton: React.FC<{ text: string; icon: React.ReactNode; targetId: string }> = ({ text, icon, targetId }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonSpring = useSpring({
    scale: isHovered ? 1.05 : 1,
    config: { tension: 300, friction: 10 }
  });

  const glowSpring = useSpring({
    boxShadow: isHovered
      ? '0 0 20px rgba(0, 255, 136, 0.4), 0 0 40px rgba(0, 255, 136, 0.2)'
      : '0 0 0px rgba(0, 255, 136, 0)',
    config: { tension: 200, friction: 20 }
  });

  // Get appropriate abbreviation for mobile display
  const getAbbreviation = () => {
    if (text === "Security Audit") return "Se";
    if (text === "Demo Massacre") return "Ma";
    if (text === "CTO Triage") return "T";
    return text.substring(0, 2);
  };
  
  const abbreviation = getAbbreviation();

  return (
    <animated.button
      style={{
        ...buttonSpring,
        ...glowSpring
      }}
      data-target={targetId}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold 
                 rounded-lg flex items-center justify-center gap-2 overflow-hidden relative group
                 w-40 md:w-64 h-12"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
        initial={{ x: '100%' }}
        whileHover={{ x: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div className="relative z-10 flex items-center justify-center w-full">
        <div className="flex items-center justify-center gap-2 md:hidden">
          {icon}
          <span>{abbreviation}</span>
        </div>
        <div className="hidden md:flex items-center justify-center gap-2">
          {icon}
          <GlowingText>{text}</GlowingText>
        </div>
      </motion.div>
    </animated.button>
  );
};

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section 
      style={{ y, opacity }}
      id="hero-section"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.1)_0%,transparent_70%)]" />
      </div>

      <motion.h1 
        className="text-6xl md:text-8xl font-bold text-center mb-6 relative"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <GlowingText>MICHAEL SIMONEAU</GlowingText>
        <span className="block text-2xl md:text-4xl mt-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text font-extrabold">
          <GlowingText>QUANTUM CRYPTOGRAPHY PIONEER</GlowingText>
        </span>
        <span className="block text-xl md:text-3xl mt-2 text-cyan-400 font-bold">
          <GlowingText>FROM HOMELESS TO $200M ARCHITECT</GlowingText>
        </span>
      </motion.h1>

      <motion.p 
        className="text-xl md:text-2xl text-gray-300 mb-12 text-center max-w-3xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Pioneering quantum-resistant enterprise architectures that transform legacy systems into self-evolving quantum fortresses
      </motion.p>

      <motion.div 
        className="flex flex-col items-center gap-6 w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <InterviewButton />
        <div className="flex flex-col md:flex-row gap-6">
          <CTAButton text="Security Audit" icon={<Shield size={20} />} targetId="security-audit" />
          <CTAButton text="Demo Massacre" icon={<Zap size={20} />} targetId="demo-massacre" />
          <CTAButton text="CTO Triage" icon={<Cpu size={20} />} targetId="cto-triage" />
        </div>
      </motion.div>
      
      <motion.div
        className="mt-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <Link to="/blog">
          <motion.button
            className="bg-transparent text-cyan-400 font-bold py-2 px-4 rounded-lg border border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={16} className="mr-2" />
            Quantum Insights Blog
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-3 bg-cyan-400 rounded-full"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};