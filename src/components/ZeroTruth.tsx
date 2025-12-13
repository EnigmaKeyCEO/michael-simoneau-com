import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { NebulaStormBackground } from './NebulaStormBackground';
import { MainNav } from './MainNav';
import { Seo } from './Seo';
import { parseZeroContent, ZeroContent, Chapter, Principle } from '../utils/zeroParser';
// @ts-ignore
import truthText from '/zero.txt?raw';

export const ZeroTruth: React.FC = () => {
  const [content, setContent] = useState<ZeroContent | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [activePrincipleId, setActivePrincipleId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Flattened principles for easy navigation
  const allPrinciples = useMemo(() => {
    if (!content) return [];
    return content.chapters.flatMap(c => c.principles.map(p => ({ ...p, chapterTitle: c.title })));
  }, [content]);

  useEffect(() => {
    const parsed = parseZeroContent(truthText);
    setContent(parsed);
    // Set initial active state
    if (parsed.chapters.length > 0) {
      setActiveChapterId(parsed.chapters[0].id);
      if (parsed.chapters[0].principles.length > 0) {
        setActivePrincipleId(parsed.chapters[0].principles[0].id);
      }
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync mobile index with active principle
  useEffect(() => {
    if (activePrincipleId && allPrinciples.length > 0) {
      const index = allPrinciples.findIndex(p => p.id === activePrincipleId);
      if (index !== -1 && index !== mobileIndex) {
        setMobileIndex(index);
      }
    }
  }, [activePrincipleId, allPrinciples]);

  const handlePrev = () => {
    if (allPrinciples.length === 0) return;

    const currentIndex = allPrinciples.findIndex(p => p.id === activePrincipleId);
    if (currentIndex > 0) {
      const prev = allPrinciples[currentIndex - 1];
      setActivePrincipleId(prev.id);
      
      // Update active chapter if previous principle is in a different chapter
      if (content) {
        const chap = content.chapters.find(c => c.principles.some(p => p.id === prev.id));
        if (chap) setActiveChapterId(chap.id);
      }
      
      if (isMobile) {
        // Mobile scroll is handled by effect or manual scroll, 
        // but if we click prev, we might want to scroll to it.
        // The MobileView component handles scrolling based on index?
        // Actually, MobileView scroll updates state. If we update state here,
        // MobileView needs to scroll to the new index.
        setMobileIndex(currentIndex - 1);
      }
    }
  };

  const handleTop = () => {
    if (isMobile) {
      // For mobile, scroll the container to top
      const container = document.getElementById('mobile-scroll-container');
      if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (content && content.chapters.length > 0) {
       setActiveChapterId(content.chapters[0].id);
       if (content.chapters[0].principles.length > 0) {
         setActivePrincipleId(content.chapters[0].principles[0].id);
         setMobileIndex(0);
       }
    }
  };

  if (!content) return null;

  return (
    <>
      <Seo
        title="Zero: The Truth of Zero, Energy, and the Nature of Existence | Michael Simoneau"
        description="All That Was, All That Is, All That Ever Will Be - The Living Truth of Zero. A quantum-philosophical exploration."
        canonicalUrl="https://www.michaelsimoneau.com/zero"
        keywords={["Zero", "Philosophy", "Quantum", "Existence", "Truth", "Michael Simoneau"]}
      />
      <NebulaStormBackground />
      <MainNav />
      
      <div className="relative min-h-screen text-white pt-24 pb-10 px-4 md:px-8 max-w-7xl mx-auto flex flex-col h-screen">
        {/* Header / Title Area */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 text-center flex-shrink-0"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2 md:mb-4 tracking-tighter">
            ZERO
          </h1>
          <p className="text-cyan-200/60 uppercase tracking-[0.5em] text-xs md:text-sm">
            The Numerical Trinity
          </p>
        </motion.div>

        {isMobile ? (
          <MobileView 
            content={content}
            allPrinciples={allPrinciples}
            activeIndex={mobileIndex}
            setActiveIndex={(idx) => {
              setMobileIndex(idx);
              const p = allPrinciples[idx];
              setActivePrincipleId(p.id);
               const chap = content?.chapters.find(c => c.principles.some(princ => princ.id === p.id));
               if (chap) setActiveChapterId(chap.id);
            }}
          />
        ) : (
          <div className="flex-grow overflow-auto">
            <DesktopView 
              content={content}
              activeChapterId={activeChapterId}
              setActiveChapterId={setActiveChapterId}
              activePrincipleId={activePrincipleId}
              setActivePrincipleId={setActivePrincipleId}
            />
          </div>
        )}
      </div>
    </>
  );
};

// Sub-components

const MobileView: React.FC<{
  content: ZeroContent;
  allPrinciples: (Principle & { chapterTitle: string })[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}> = ({ allPrinciples, activeIndex, setActiveIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync scroll position when activeIndex changes programmatically (e.g. from nav buttons)
  useEffect(() => {
    if (containerRef.current) {
       const { clientHeight } = containerRef.current;
       const targetScroll = activeIndex * clientHeight;
       // Only scroll if significantly different to avoid fighting user scroll
       if (Math.abs(containerRef.current.scrollTop - targetScroll) > 10) {
         containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
       }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    // Calculate index based on center of viewport
    const index = Math.round(scrollTop / clientHeight);
    if (index !== activeIndex && index >= 0 && index < allPrinciples.length) {
       setActiveIndex(index);
    }
  };

  return (
    <div 
      id="mobile-scroll-container"
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-grow overflow-y-auto snap-y snap-mandatory scroll-smooth no-scrollbar"
      style={{ scrollBehavior: 'smooth', height: 'calc(100vh - 200px)' }} // Adjust for header + nav
    >
      {allPrinciples.map((principle, idx) => (
        <div 
          key={principle.id} 
          className="h-full snap-start flex flex-col justify-center p-2"
          style={{ height: 'calc(100vh - 200px)' }}
        >
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ 
               opacity: idx === activeIndex ? 1 : 0.3,
               scale: idx === activeIndex ? 1 : 0.95
             }}
             transition={{ duration: 0.5 }}
             className={`bg-black/40 backdrop-blur-md border border-cyan-500/20 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,136,0.1)] flex flex-col h-full ${idx === activeIndex ? 'border-cyan-500/50' : ''}`}
           >
             <div className="mb-4 flex-shrink-0">
                <span className="text-xs font-mono text-cyan-400/80 mb-1 block">
                  {principle.chapterTitle}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  Principle {principle.number}
                </h3>
                <h4 className="text-lg text-cyan-200 font-light italic mb-2 leading-tight">
                  {principle.title}
                </h4>
             </div>
             <div className="text-gray-300 leading-relaxed text-sm flex-grow overflow-y-auto pr-2 custom-scrollbar">
               {principle.content.split('\n').map((para, i) => para.trim() && (
                 <p key={i} className="mb-4">{para}</p>
               ))}
             </div>
           </motion.div>
        </div>
      ))}
      <div className="snap-start flex items-center justify-center text-cyan-500/50 italic pb-20" style={{ height: '200px' }}>
        <div className="text-center">
          <p className="mb-2">... to be continued ...</p>
          <p className="text-xs opacity-50">Drag up to glimpse the void</p>
        </div>
      </div>
    </div>
  );
};

const DesktopView: React.FC<{
  content: ZeroContent;
  activeChapterId: string | null;
  setActiveChapterId: (id: string | null) => void;
  activePrincipleId: string | null;
  setActivePrincipleId: (id: string | null) => void;
}> = ({ content, activeChapterId, setActiveChapterId, activePrincipleId, setActivePrincipleId }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      {/* Left Column: Bubbly TOC */}
      <div className="lg:col-span-4 space-y-4 overflow-y-auto custom-scrollbar pr-2 max-h-[70vh]">
        {content.chapters.map((chapter) => (
          <div key={chapter.id} className="relative">
             <motion.button
               onClick={() => {
                 setActiveChapterId(activeChapterId === chapter.id ? null : chapter.id);
               }}
               className={`w-full text-left p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                 activeChapterId === chapter.id 
                   ? 'bg-cyan-900/40 border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,136,0.2)]' 
                   : 'bg-black/40 border-white/10 hover:border-cyan-500/30'
               }`}
             >
               <div className="flex justify-between items-center">
                 <span className={`font-bold ${activeChapterId === chapter.id ? 'text-cyan-400' : 'text-gray-300'}`}>
                   Chapter {chapter.number}
                 </span>
                 {activeChapterId === chapter.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
               </div>
               <div className="text-sm text-gray-400 mt-1 truncate">{chapter.title}</div>
             </motion.button>

             <AnimatePresence>
               {activeChapterId === chapter.id && (
                 <motion.div
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                   className="overflow-hidden ml-4 mt-2 space-y-2 border-l-2 border-cyan-900/50 pl-4"
                 >
                   {chapter.principles.map((principle) => (
                     <button
                       key={principle.id}
                       onClick={() => setActivePrincipleId(principle.id)}
                       className={`block w-full text-left py-2 px-4 rounded-xl text-sm transition-all ${
                         activePrincipleId === principle.id
                           ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                           : 'text-gray-400 hover:text-cyan-200 hover:bg-white/5'
                       }`}
                     >
                       <span className="font-mono text-xs opacity-50 mr-2">P.{principle.number}</span>
                       {principle.title.substring(0, 40)}...
                     </button>
                   ))}
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Right Column: Content */}
      <div className="lg:col-span-8 h-full overflow-hidden">
         <AnimatePresence mode="wait">
           {activePrincipleId ? (
             <motion.div
               key={activePrincipleId}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.4 }}
               className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative h-full flex flex-col"
             >
                {/* Decorative quantum elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                
                {(() => {
                  let activePrinciple: Principle | undefined;
                  let activeChapter: Chapter | undefined;
                  
                  for (const c of content.chapters) {
                    const p = c.principles.find(p => p.id === activePrincipleId);
                    if (p) {
                      activePrinciple = p;
                      activeChapter = c;
                      break;
                    }
                  }

                  if (!activePrinciple || !activeChapter) return <div>Select a principle</div>;

                  return (
                    <>
                      <div className="flex items-center space-x-2 text-cyan-500/60 font-mono text-sm mb-6 uppercase tracking-widest flex-shrink-0">
                        <span>Principle {activePrinciple.number}</span>
                        <span>/</span>
                        <span>Chapter {activeChapter.number}</span>
                      </div>
                      
                      <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-loose overflow-y-auto custom-scrollbar pr-4 flex-grow min-h-0">
                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
                           {activePrinciple.title}
                         </h2>
                         {activePrinciple.content.split('\n').map((paragraph, i) => (
                           paragraph.trim() && <p key={i} className="mb-6">{paragraph}</p>
                         ))}
                      </div>
                    </>
                  );
                })()}
             </motion.div>
           ) : (
             <div className="flex items-center justify-center h-full text-gray-500 italic">
               Select a principle to begin transmission...
             </div>
           )}
         </AnimatePresence>
      </div>
    </div>
  );
};
