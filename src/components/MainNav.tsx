import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { UniversalPlayer } from './UniversalPlayer';

export const MainNav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-lg hover:text-cyan-400 transition-colors flex items-center">
            <span className="mr-1">MS</span>
            {!isHomePage && <Home size={16} className="ml-1" />}
          </Link>
        </div>
        <UniversalPlayer />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage ? (
            <>
              <a href="#security-audit" className="text-gray-300 hover:text-cyan-400 transition-colors">Security</a>
              <a href="#demo-massacre" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#cto-triage" className="text-gray-300 hover:text-cyan-400 transition-colors">Services</a>
            </>
          ) : (
            <>
              <Link to="/#security-audit" className="text-gray-300 hover:text-cyan-400 transition-colors">Security</Link>
              <Link to="/#demo-massacre" className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</Link>
              <Link to="/#cto-triage" className="text-gray-300 hover:text-cyan-400 transition-colors">Services</Link>
            </>
          )}
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
          <nav className="flex flex-col items-center space-y-8 p-6 bg-black/75">
            {!isHomePage && (
              <Link 
                to="/" 
                className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
            )}
            
            {isHomePage ? (
              <>
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
              </>
            ) : (
              <>
                <Link 
                  to="/#security-audit" 
                  className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Security
                </Link>
                <Link 
                  to="/#demo-massacre" 
                  className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>
                <Link 
                  to="/#cto-triage" 
                  className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
              </>
            )}
            
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