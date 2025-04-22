import React, { useEffect, useRef, useState } from 'react';
import { HeroSection } from './HeroSection';
import { SecurityAudit } from './SecurityAudit';
import { DemoMassacre } from './DemoMassacre';
import { CTOTriage } from './CTOTriage';
import { MainNav } from './MainNav';

const useSectionScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const sections = Array.from(container.querySelectorAll<HTMLDivElement>('div.h-screen, div.min-h-screen'));
    if (sections.length === 0) return;
    
    const handleScroll = () => {
      if (!container) return;
      
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const currentIndex = Math.floor(scrollPosition / windowHeight);
      
      if (currentIndex !== currentSection) {
        setCurrentSection(currentIndex);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSection]);
  
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
      <div 
        className="section-container h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory"
        ref={sectionContainerRef}
      >
        <div className="h-screen snap-start snap-always pt-16">
          <HeroSection />
        </div>
        <div className="min-h-screen snap-start snap-always pt-16 pb-8">
          <SecurityAudit />
        </div>
        <div className="min-h-screen snap-start snap-always pt-16 pb-8">
          <DemoMassacre />
        </div>
        <div className="min-h-screen snap-start snap-always pt-16 pb-8">
          <CTOTriage />
        </div>
      </div>
    </>
  );
}; 