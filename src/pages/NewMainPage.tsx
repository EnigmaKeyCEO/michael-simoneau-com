import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MainNav } from '../components/MainNav';
import { NewHeroSection } from '../components/NewHeroSection';
import { StoneXProject, JPMorganProject } from '../components/portfolio';
import { AboutMeSection } from '../components/AboutMeSection';
import { ServiceOffering } from '../components/ServiceOffering';
import { CTOTriage } from '../components/CTOTriage';
import { BlogTeaser } from '../components/BlogTeaser';
import { ContactFooter } from '../components/ContactFooter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { useScrollContext } from '../contexts/ScrollContext';

export const NewMainPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { registerMainScrollContainer } = useScrollContext();

  useEffect(() => {
    document.title = "Michael Simoneau | Enterprise Architect & Technology Leader";
    if (scrollContainerRef.current) {
      registerMainScrollContainer(scrollContainerRef);
    }
    if (!window.location.hash && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({top: 0, behavior: 'auto'});
    }
  }, [registerMainScrollContainer]);

  const sectionWrapperClasses = "py-12 md:py-20 px-4 relative snap-start";

  return (
    <>
      <AnimatedBackground />
      <div 
        ref={scrollContainerRef} 
        id="new-main-page-scroll-container"
        className="text-white h-screen flex flex-col overflow-y-auto overflow-x-hidden overscroll-behavior-x-none snap-y snap-mandatory scroll-smooth relative z-10"
      >
        <MainNav scrollContainerId="new-main-page-scroll-container" />

        <section className="snap-start">
          <NewHeroSection />
        </section>

        <motion.section 
          id="about-me-section" 
          className={`${sectionWrapperClasses}`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}} 
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <AboutMeSection />
        </motion.section>

        <motion.section 
          id="expertise-section" 
          className={`${sectionWrapperClasses} bg-gray-900/40`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}} 
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Proven <span className="text-cyan-400">Expertise</span> & Impact
            </h2>
            <StoneXProject />
            <JPMorganProject />
          </div>
        </motion.section>

        <motion.section 
          id="service-offerings-section"
          className={`${sectionWrapperClasses}`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}} 
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <ServiceOffering />
        </motion.section>

        <motion.section 
          id="cto-triage-section"
          className={`${sectionWrapperClasses} bg-gray-900/40`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}} 
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <CTOTriage />
        </motion.section>

        <motion.section 
          id="blog-teaser-section" 
          className={`${sectionWrapperClasses}`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}} 
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <BlogTeaser />
        </motion.section>
        
        <section className="snap-start">
          <ContactFooter />
        </section>
      </div>
    </>
  );
}; 