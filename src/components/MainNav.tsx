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
        // Adjust for fixed MainNav height if necessary, assuming approx 60-80px
        const offset = 80; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setIsOpen(false);
      }
    } else {
      navigate(`/#${sectionId}`, { replace: true });
      // setTimeout to allow navigation then scroll, might need adjustment
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // delay to ensure page has navigated
      setIsOpen(false);
    }
  };
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/" className="text-white font-bold text-lg hover:text-cyan-400 transition-colors flex items-center">
            <span className="mr-1">MS</span>
            {/* Removed Home icon from beside MS as MainNav is always visible on main page now */}
          </Link>
        </div>
        <UniversalPlayer />
        
        {/* Desktop Navigation - Updated section IDs */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('about-me-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">About</button>
          <button onClick={() => scrollToSection('expertise-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Expertise</button>
          <button onClick={() => scrollToSection('blog-teaser-section')} className="text-gray-300 hover:text-cyan-400 transition-colors">Insights</button>
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
              onClick={() => scrollToSection('about-me-section')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('expertise-section')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Expertise
            </button>
            <button 
              onClick={() => scrollToSection('blog-teaser-section')}
              className="text-xl text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Insights
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