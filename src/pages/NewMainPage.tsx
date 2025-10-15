import React, { useEffect, useMemo, useRef } from 'react';
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
          id="crypto-fabric-section"
          className={`${sectionWrapperClasses} bg-cyan-500/10`}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true, amount: 0.2}}
          transition={{duration: 0.7}}
        >
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold tracking-[0.35em] uppercase text-cyan-200/80 bg-cyan-500/10 rounded-full border border-cyan-400/60 mb-4">
                New launch
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Crypto Fabric — Modular GCP Architecture &amp; Control Center
              </h2>
              <p className="text-lg text-gray-200 mb-6">
                A profitability-first automation platform built by Michael Simoneau for digital-asset operators that need Cloud Run guardrails, Firebase-native mobile distribution, and real-time profit telemetry.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 text-left">
              <div className="bg-black/40 border border-cyan-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-cyan-200 mb-2">Unified control plane</h3>
                <p className="text-gray-300 text-sm">Guide staking, trading, and infrastructure workloads through the same onboarding guardrails and profitability policies.</p>
              </div>
              <div className="bg-black/40 border border-cyan-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-cyan-200 mb-2">Zero-cost developer mode</h3>
                <p className="text-gray-300 text-sm">Prototype locally with DEV_NO_COST=true, then promote to Cloud Run when the margins and guardrail checks pass.</p>
              </div>
              <div className="bg-black/40 border border-cyan-400/30 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-cyan-200 mb-2">Mobile-first telemetry</h3>
                <p className="text-gray-300 text-sm">Ship white-labeled Expo apps that mirror profitability dashboards so field teams and investors stay aligned.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/crypto-fabric"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-white transition"
              >
                Explore Crypto Fabric
              </Link>
              <a
                href="mailto:mike@brainycouch.com?subject=Crypto%20Fabric%20Rollout%20Inquiry"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-cyan-300 text-cyan-200 hover:bg-cyan-200 hover:text-black transition"
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