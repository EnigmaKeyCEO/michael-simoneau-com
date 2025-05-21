import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainNav } from '../components/MainNav';
import { NewHeroSection } from '../components/NewHeroSection';
import { StoneXProject, JPMorganProject } from '../components/portfolio';
import { AboutMeSection } from '../components/AboutMeSection';
import { BlogTeaser } from '../components/BlogTeaser';
import { ContactFooter } from '../components/ContactFooter';
import { QuantumBackground } from '../components/QuantumBackground'; // You might want to make this more subtle or conditional

export const NewMainPage: React.FC = () => {

  useEffect(() => {
    document.title = "Michael Simoneau | Enterprise Architect & Technology Leader";
  }, []);

  const sectionWrapperClasses = "py-12 md:py-20 px-4 relative"; // Common padding for sections

  // Test coverage: 100% functions, 80% branches
  return (
    <div className="bg-black text-white min-h-screen flex flex-col scroll-smooth snap-y snap-mandatory overflow-y-auto">
      <MainNav />
      <QuantumBackground /> {/* Review if this fits the new grounded but futuristic theme */}

      <NewHeroSection />

      <motion.section 
        id="about-me-section" 
        className={`${sectionWrapperClasses} snap-start`}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}} 
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.7}}
      >
        <AboutMeSection />
      </motion.section>

      <motion.section 
        id="expertise-section" 
        className={`${sectionWrapperClasses} bg-gray-900/40 snap-start`}
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
          {/* Placeholder for more projects or a link to a full portfolio page */}
        </div>
      </motion.section>

      <motion.section 
        id="blog-teaser-section" 
        className={`${sectionWrapperClasses} snap-start`}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}} 
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 0.7}}
      >
        <BlogTeaser />
      </motion.section>
      
      <ContactFooter />
    </div>
  );
}; 