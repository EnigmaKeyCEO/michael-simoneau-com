import React, { useEffect, useRef, useState } from 'react';
import { HeroSection } from './HeroSection';
import { SecurityAudit } from './SecurityAudit';
import { DemoMassacre } from './DemoMassacre';
import { CTOTriage } from './CTOTriage';
import { MainNav } from './MainNav';

// Custom hook for reliable full-page scrolling
const useSectionScroll = () => {
  // References and state
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const scrollLock = useRef(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const sections = Array.from(container.querySelectorAll('section'));
    if (sections.length === 0) return;
    
    // Function to scroll to a specific section
    const scrollToSection = (index: number) => {
      // Stay within bounds
      if (index < 0) index = 0;
      if (index >= sections.length) index = sections.length - 1;
      
      // Don't scroll if already at target section
      if (index === currentSection && !isScrolling) return;
      
      // Apply scroll lock
      setIsScrolling(true);
      scrollLock.current = true;
      
      // Perform smooth scroll
      sections[index].scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(index);
      
      // Release scroll lock after animation completes
      setTimeout(() => {
        setIsScrolling(false);
        scrollLock.current = false;
      }, 800); // Animation time
    };
    
    // Wheel event handler with strong direction detection
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Prevent rapid scroll events
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;
      
      // Don't process if scroll locked
      if (scrollLock.current) return;
      
      // Detect scroll direction with higher threshold for reliability
      const direction = e.deltaY > 20 ? 1 : e.deltaY < -20 ? -1 : 0;
      if (direction === 0) return;
      
      // Scroll to next section based on direction
      scrollToSection(currentSection + direction);
    };
    
    // Touch handling with improved reliability
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      // Skip if already scrolling
      if (scrollLock.current) return;
      
      // Calculate touch distance
      const touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      // Higher threshold for touch to prevent accidental triggers
      if (Math.abs(touchDiff) < 80) return;
      
      // Determine direction and scroll
      const direction = touchDiff > 0 ? 1 : -1;
      scrollToSection(currentSection + direction);
    };
    
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrollLock.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      }
    };
    
    // Detect section visibility for scroll synchronization
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7, // Higher threshold for more reliable section detection
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !scrollLock.current) {
          const index = sections.indexOf(entry.target as HTMLElement);
          if (index !== -1 && index !== currentSection) {
            setCurrentSection(index);
          }
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      sectionObserver.observe(section);
    });
    
    // Add event listeners
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    // Control body overflow
    document.body.style.overflow = 'hidden';
    
    // Handle direct link clicks
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const id = target.getAttribute('href')?.substring(1);
        const targetSection = sections.findIndex(section => section.id === id);
        if (targetSection !== -1) {
          e.preventDefault();
          scrollToSection(targetSection);
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    // Initialize button click handlers for section navigation
    const setupCTAButtons = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // Check if this button navigates to a section
          const targetId = button.getAttribute('data-target');
          if (targetId) {
            const targetSection = sections.findIndex(section => section.id === targetId);
            if (targetSection !== -1) {
              scrollToSection(targetSection);
            }
          }
        });
      });
    };
    
    // Add a small delay to ensure buttons are available
    setTimeout(setupCTAButtons, 500);
    
    // Clean up
    return () => {
      sectionObserver.disconnect();
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleLinkClick);
      document.body.style.overflow = '';
    };
  }, [currentSection, isScrolling]);
  
  return containerRef;
};

export const MainPage: React.FC = () => {
  const sectionContainerRef = useSectionScroll();
  
  useEffect(() => {
    document.title = 'Michael Simoneau | FROM HOMELESS TO $200M ARCHITECT';
  }, []);

  return (
    <>
      <MainNav />
      <div className="section-container h-screen overflow-hidden" ref={sectionContainerRef}>
        <HeroSection />
        <SecurityAudit />
        <DemoMassacre />
        <CTOTriage />
      </div>
    </>
  );
}; 