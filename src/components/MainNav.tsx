import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { UniversalPlayer } from './UniversalPlayer';

export const MainNav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      // Navigate to home page with hash
      navigate(`/#${sectionId}`, { replace: true });
      setIsOpen(false);
    }
  };
  
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
          <button onClick={() => scrollToSection('security-audit')} className="text-gray-300 hover:text-cyan-400 transition-colors">Security</button>
          <button onClick={() => scrollToSection('demo-massacre')} className="text-gray-300 hover:text-cyan-400 transition-colors">Projects</button>
          <button onClick={() => scrollToSection('cto-triage')} className="text-gray-300 hover:text-cyan-400 transition-colors">Services</button>
          <Link to="/full-profile" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
            <User size={16} className="mr-2" />
            Full Profile
          </Link>
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
              <button 
                onClick={() => navigate('/')}
                className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
              >
                <Home size={18} className="mr-2" />
                Home
              </button>
            )}
            
            <button 
              onClick={() => scrollToSection('security-audit')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Security
            </button>
            <button 
              onClick={() => scrollToSection('demo-massacre')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('cto-triage')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Services
            </button>
            <Link 
              to="/full-profile" 
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} className="mr-2" />
              Full Profile
            </Link>
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