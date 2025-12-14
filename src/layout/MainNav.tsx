import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, Home, User, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversalPlayer } from '../ui/players/UniversalPlayer';
import { useScrollToSection } from '../hooks/useScrollToSection';

interface MainNavProps {
  scrollContainerId?: string;
}

export const MainNav: React.FC<MainNavProps> = ({ scrollContainerId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLabsExpanded, setIsLabsExpanded] = React.useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const scrollToSectionHandler = useScrollToSection({ scrollContainerId });
  const labsRef = useRef<HTMLDivElement>(null);

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
    scrollToSectionHandler(sectionId, () => {
      setIsOpen(false);
      setIsLabsExpanded(false);
    });
  };

  const handleLabsClick = () => {
    setIsLabsExpanded(!isLabsExpanded);
  };

  const handleLabsItemClick = (sectionId: string) => {
    handleSectionLinkClick(sectionId);
    setIsLabsExpanded(false);
    setIsOpen(false); // Close mobile menu if open
  };

  // Close Labs when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (labsRef.current && !labsRef.current.contains(event.target as Node)) {
        setIsLabsExpanded(false);
      }
    };

    if (isLabsExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isLabsExpanded]);
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center relative min-w-[80px]">
          <Link 
            to="/" 
            onClick={(e) => {
              handleHomeClick(e);
              setIsLabsExpanded(false);
            }}
            className="text-white font-bold text-lg hover:text-cyan-400 transition-colors flex items-center"
          >
            <motion.span 
              layout
              className="mr-1"
            >
              MS
            </motion.span>
            <AnimatePresence mode="wait">
              {isLabsExpanded && (
                <motion.span
                  key="labs-label"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="ml-1 uppercase tracking-wider"
                >
                  : LABS:
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
        <UniversalPlayer />
        
        <nav className="hidden md:flex items-center space-x-6 xl:space-x-8 relative" ref={labsRef}>
          <button onClick={() => handleSectionLinkClick('about-me-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">About</button>
          <button onClick={() => handleSectionLinkClick('expertise-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Expertise</button>
          <button onClick={() => handleSectionLinkClick('service-offerings-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Services</button>
          
          {/* Labs Navigation */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!isLabsExpanded ? (
                <motion.button
                  key="labs-button"
                  onClick={handleLabsClick}
                  className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <FlaskConical size={16} className="mr-1.5" />
                  Labs
                </motion.button>
              ) : (
                <motion.div
                  key="labs-items"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-center space-x-2"
                >
                  <button
                    onClick={() => handleLabsItemClick('zero')}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Zeroth Theory
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={() => handleLabsItemClick('crypto-fabric')}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    Crypto Fabric
                  </button>
                  <span className="text-gray-500">|</span>
                  <button
                    onClick={() => handleLabsItemClick('thth')}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    THTH Token
                  </button>
                  <button
                    onClick={handleLabsClick}
                    className="ml-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
                    aria-label="Close Labs"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => handleSectionLinkClick('cto-triage-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Consulting</button>
          <button onClick={() => handleSectionLinkClick('blog-teaser-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Insights</button>
          
          {isHomePage ? (
            <button onClick={() => handleSectionLinkClick('profile')} className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
              <User size={16} className="mr-1 xl:mr-2" />
              Profile
            </button>
          ) : (
            <Link to="/profile" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
              <User size={16} className="mr-1 xl:mr-2" />
              Profile
            </Link>
          )}
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
            
            {/* Labs Navigation - Mobile */}
            <div className="w-full">
              <button 
                onClick={() => setIsLabsExpanded(!isLabsExpanded)}
                className="text-xl text-gray-300 hover:text-cyan-400 transition-colors w-full text-left flex items-center"
              >
                <FlaskConical size={18} className="mr-2" />
                {isLabsExpanded ? 'Labs ▼' : 'Labs ▶'}
              </button>
              {isLabsExpanded && (
                <div className="ml-4 mt-2 space-y-2">
                  <button 
                    onClick={() => handleLabsItemClick('zero')}
                    className="text-lg text-gray-400 hover:text-cyan-400 transition-colors block w-full text-left"
                  >
                    Zeroth Theory
                  </button>
                  <button 
                    onClick={() => handleLabsItemClick('crypto-fabric')}
                    className="text-lg text-gray-400 hover:text-cyan-400 transition-colors block w-full text-left"
                  >
                    Crypto Fabric
                  </button>
                  <button 
                    onClick={() => handleLabsItemClick('thth')}
                    className="text-lg text-gray-400 hover:text-cyan-400 transition-colors block w-full text-left"
                  >
                    THTH Token
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => handleSectionLinkClick('cto-triage-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Consulting</button>
            <button onClick={() => handleSectionLinkClick('blog-teaser-section')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors">Insights</button>

            {isHomePage ? (
              <button onClick={() => handleSectionLinkClick('profile')} className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center">
                <User size={18} className="mr-2" />
                Profile
              </button>
            ) : (
              <Link to="/profile" className="text-xl text-gray-300 hover:text-cyan-400 transition-colors flex items-center" onClick={() => setIsOpen(false)}>
                <User size={18} className="mr-2" />
                Profile
              </Link>
            )}
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