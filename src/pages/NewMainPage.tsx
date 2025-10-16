import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
import { useFoundation, useFoundationFeature, useFoundationMetadata } from '../foundation';

export const NewMainPage: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { registerMainScrollContainer } = useScrollContext();
  const metadata = useFoundationMetadata();
  const cryptoFabricLaunch = useFoundationFeature('cryptoFabricLaunch');
  const { analytics, runtime, registerBoundary } = useFoundation();
  const keywords = metadata.keywords;
  const structuredData = metadata.structuredData;

  useEffect(() => {
    document.title = metadata.defaultTitle;
    if (scrollContainerRef.current) {
      registerMainScrollContainer(scrollContainerRef);
    }
    if (!window.location.hash && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({top: 0, behavior: 'auto'});
    }
  }, [metadata.defaultTitle, registerMainScrollContainer]);

  useEffect(() => {
    registerBoundary({
      id: 'new-main-page',
      label: 'Landing Experience',
      description: 'Primary scroll surface orchestrated through React Foundation.',
      href: '/',
    });

    analytics.track({
      type: 'foundation.page.view',
      payload: {
        path: typeof window !== 'undefined' ? window.location.pathname : '/',
        locale: runtime.locale,
      },
      timestamp: Date.now(),
    });
  }, [analytics, registerBoundary, runtime]);

  const handleCryptoCta = () => {
    analytics.track({
      type: 'foundation.cta',
      payload: {
        feature: 'cryptoFabricLaunch',
        action: 'primary',
      },
      timestamp: Date.now(),
    });
  };

  const handleCryptoContact = () => {
    analytics.track({
      type: 'foundation.cta',
      payload: {
        feature: 'cryptoFabricLaunch',
        action: 'contact',
      },
      timestamp: Date.now(),
    });
  };

  const sectionWrapperClasses = "py-12 md:py-20 px-4 relative snap-start";

  return (
    <>
      <Seo
        title="Michael Simoneau | Enterprise Architect & Technology Leader"
        description="Discover how Michael Simoneau leads enterprise architecture, AI strategy, and large-scale transformations for highly regulated organizations."
        canonicalUrl="https://www.michaelsimoneau.com/"
        keywords={keywords}
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
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
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
          id="crypto-fabric-section"
          className={`${sectionWrapperClasses} bg-cyan-500/10`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-4xl mx-auto text-center">
              {cryptoFabricLaunch.enabled && (
                <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold tracking-[0.35em] uppercase text-cyan-200/80 bg-cyan-500/10 rounded-full border border-cyan-400/60 mb-4">
                  {cryptoFabricLaunch.highlightLabel}
                </span>
              )}
              <h2 className="text-4xl font-bold text-white mb-4">
                {cryptoFabricLaunch.name}
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                {cryptoFabricLaunch.description}
              </p>
            </div>
            {cryptoFabricLaunch.keyBenefits.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 text-left">
                {cryptoFabricLaunch.keyBenefits.map(benefit => (
                  <div
                    key={benefit.title}
                    className="bg-black/40 border border-cyan-400/30 rounded-2xl p-6"
                  >
                    <h3 className="text-xl font-semibold text-cyan-200 mb-2">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm">{benefit.description}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to={cryptoFabricLaunch.cta.href}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-white transition"
                onClick={handleCryptoCta}
              >
                {cryptoFabricLaunch.cta.label}
              </Link>
              <a
                href="mailto:mike@brainycouch.com?subject=Crypto%20Fabric%20Rollout%20Inquiry"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-cyan-300 text-cyan-200 hover:bg-cyan-200 hover:text-black transition"
                onClick={handleCryptoContact}
              >
                Plan your rollout
              </a>
            </div>
          </div>
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