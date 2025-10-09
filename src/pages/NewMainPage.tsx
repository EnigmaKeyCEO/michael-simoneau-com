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

        <motion.section
          id="real-interview-teaser"
          className={`${sectionWrapperClasses} bg-gray-900/40`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <div className="container mx-auto flex flex-col items-center gap-8 text-center">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Want to see me in a real interview?
              </h2>
              <p className="text-lg text-white/80">
                I'm a real person who shows up with honesty, clarity, and the kind of passion
                that keeps teams energized. Watch me field real questions, share how I think
                through tough problems, and stay grounded while doing it.
              </p>
            </div>
            <div className="w-full max-w-4xl">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-cyan-500/20 border border-white/10 aspect-video">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/3QKCe1St6S8"
                  title="Michael Simoneau Interview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.section>

        <section className="snap-start">
          <ContactFooter />
        </section>
      </div>
    </>
  );
}; 