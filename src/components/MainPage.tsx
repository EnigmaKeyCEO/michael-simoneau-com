import React from 'react';
import { HeroSection } from './HeroSection';
import { SecurityAudit } from './SecurityAudit';
import { DemoMassacre } from './DemoMassacre';
import { CTOTriage } from './CTOTriage';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const MainNav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white font-bold text-lg">MS</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#security-audit" className="text-gray-300 hover:text-cyan-400 transition-colors">Security</a>
          <a href="#demo-massacre" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#cto-triage" className="text-gray-300 hover:text-cyan-400 transition-colors">Services</a>
          <Link to="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
            <BookOpen size={16} className="mr-2" />
            Blog
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/95 z-40 pt-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="flex flex-col items-center space-y-8 p-6">
            <a 
              href="#security-audit" 
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Security
            </a>
            <a 
              href="#demo-massacre" 
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projects
            </a>
            <a 
              href="#cto-triage" 
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <Link 
              to="/blog" 
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={18} className="mr-2" />
              Blog
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export const MainPage: React.FC = () => {
  return (
    <>
      <MainNav />
      <HeroSection />
      <SecurityAudit />
      <DemoMassacre />
      <CTOTriage />
    </>
  );
}; 