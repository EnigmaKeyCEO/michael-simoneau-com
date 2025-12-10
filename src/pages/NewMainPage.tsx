import React, { useEffect, useMemo, useRef } from 'react';
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
import { Seo } from '../components/Seo';
import { SearchOptimizedSummary } from '../components/SearchOptimizedSummary';
import { CryptoFabricHero } from '../components/CryptoFabricHero';

export const NewMainPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { registerMainScrollContainer } = useScrollContext();
  const keywords = useMemo(
    () => [
      'Michael Simoneau',
      'Michael Simoneau technology leader',
      'Michael Simoneau enterprise architect',
      'CTO advisor Michael Simoneau',
      'Michael Simoneau digital transformation',
      'Michael Simoneau AI strategy',
    ],
    [],
  );

  const structuredData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Michael Simoneau | Enterprise Architect & Technology Leader',
        url: 'https://www.michaelsimoneau.com/',
        description:
          'Explore the enterprise architecture, AI strategy, and transformation leadership of Michael Simoneau, a trusted advisor to CTOs and executive teams.',
        inLanguage: 'en-US',
        primaryImageOfPage: 'https://www.michaelsimoneau.com/profile-image.png',
        about: {
          '@type': 'Person',
          name: 'Michael Simoneau',
          jobTitle: 'Enterprise Architect & Technology Leader',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Michael Simoneau',
        url: 'https://www.michaelsimoneau.com/',
        jobTitle: 'Enterprise Architect & Technology Leader',
        description:
          'Michael Simoneau architects resilient systems for highly regulated industries, blending AI innovation, zero-trust security, and pragmatic leadership.',
        image: 'https://www.michaelsimoneau.com/profile-image.png',
        sameAs: [
          'https://www.linkedin.com/in/EnigmaKeyCEO',
          'https://github.com/EnigmaKeyCEO',
          'https://twitter.com/enigmakeyceo',
        ],
        knowsAbout: [
          'enterprise architecture',
          'cloud modernization',
          'AI strategy',
          'digital transformation',
          'zero trust security',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who is Michael Simoneau?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Michael Simoneau is an enterprise architect and CTO advisor who designs resilient platforms for highly regulated sectors, combining engineering leadership with C-suite advisory experience.',
            },
          },
          {
            '@type': 'Question',
            name: 'What industries does Michael Simoneau specialize in?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Michael Simoneau partners with financial services firms, fintech disruptors, and SaaS scale-ups that demand disciplined security, data governance, and rapid product iteration.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does Michael Simoneau approach digital transformation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Michael Simoneau guides transformation with outcome-first roadmaps, collaborative architecture councils, and transparent metrics that align engineering, product, and executive stakeholders.',
            },
          },
        ],
      },
    ],
    [],
  );

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
      <Seo
        title="Michael Simoneau | Enterprise Architect & Technology Leader"
        description="Discover how Michael Simoneau leads enterprise architecture, AI strategy, and large-scale transformations for highly regulated organizations."
        canonicalUrl="https://www.michaelsimoneau.com/"
        keywords={keywords}
        image="https://www.michaelsimoneau.com/profile-image.png"
        structuredData={structuredData}
      />
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

        <SearchOptimizedSummary />

        <CryptoFabricHero />

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