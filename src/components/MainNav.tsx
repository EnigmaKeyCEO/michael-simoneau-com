import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Home, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { UniversalPlayer } from './UniversalPlayer';
import { useScrollToSection } from '../hooks/useScrollToSection';

interface MainNavProps {
  scrollContainerId?: string;
}

export const MainNav: React.FC<MainNavProps> = ({ scrollContainerId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const scrollToSectionHandler = useScrollToSection({ scrollContainerId });

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    if (isHomePage) {
      e.preventDefault();
      const container = scrollContainerId ? document.getElementById(scrollContainerId) : null;
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSectionLinkClick = (sectionId: string) => {
    scrollToSectionHandler(sectionId, () => setIsOpen(false));
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className="text-white font-bold text-lg hover:text-cyan-400 transition-colors flex items-center"
          >
            <span className="mr-1">MS</span>
          </Link>
        </div>
        <UniversalPlayer />
        
        <nav className="hidden md:flex items-center space-x-6 xl:space-x-8">
          <button onClick={() => handleSectionLinkClick('about-me-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">About</button>
          <button onClick={() => handleSectionLinkClick('expertise-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Expertise</button>
          <button onClick={() => handleSectionLinkClick('service-offerings-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Services</button>
          <button onClick={() => handleSectionLinkClick('cto-triage-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Consulting</button>
          <button onClick={() => handleSectionLinkClick('blog-teaser-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Insights</button>
          
          <Link to="/full-profile" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
            <User size={16} className="mr-1 xl:mr-2" />
            Full Profile
          </Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
            <BookOpen size={16} className="mr-2" />
            Blog
          </Link>
        </nav>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
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
                onClick={handleHomeClick} 
                className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
              >
                <Home size={18} className="mr-2" />
                Home
              </Link>
            )}
            
            <button onClick={() => handleSectionLinkClick('about-me-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">About</button>
            <button onClick={() => handleSectionLinkClick('expertise-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Expertise</button>
            <button onClick={() => handleSectionLinkClick('service-offerings-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Services</button>
            <button onClick={() => handleSectionLinkClick('cto-triage-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Consulting</button>
            <button onClick={() => handleSectionLinkClick('blog-teaser-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Insights</button>

            <Link to="/full-profile" className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center" onClick={() => setIsOpen(false)}>
              <User size={18} className="mr-2" />
              Full Profile
            </Link>
            <Link to="/blog" className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center" onClick={() => setIsOpen(false)}>
              <BookOpen size={18} className="mr-2" />
              Blog
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}; 