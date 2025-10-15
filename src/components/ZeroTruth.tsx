import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { MainNav } from './MainNav';
import truthText from '/zero.txt?raw';

export const ZeroTruth: React.FC = () => {
  const principleGroups = React.useMemo(() => {
    const lines = truthText.split('\n');
    const groups = new Map<string, Set<string>>();
    let currentChapter: string | null = null;

    lines.forEach(rawLine => {
      const line = rawLine.trim();

      if (!line) {
        return;
      }

      if (/^Chapter\s+\d+:/i.test(line)) {
        currentChapter = line;
        if (!groups.has(line)) {
          groups.set(line, new Set<string>());
        }
        return;
      }

      if (!currentChapter) {
        return;
      }

      if (line.startsWith('•')) {
        const sanitized = line.replace(/^•\s*/, '');
        groups.get(currentChapter)?.add(sanitized);
        return;
      }

      if (/^Principle\s+\d+:/i.test(line)) {
        groups.get(currentChapter)?.add(line);
      }
    });

    return Array.from(groups.entries())
      .map(([chapter, principles]) => ({
        chapter,
        principles: Array.from(principles).sort((a, b) => {
          const matchA = a.match(/^Principle\s+(\d+)/i);
          const matchB = b.match(/^Principle\s+(\d+)/i);
          const numberA = matchA ? Number(matchA[1]) : Number.POSITIVE_INFINITY;
          const numberB = matchB ? Number(matchB[1]) : Number.POSITIVE_INFINITY;
          return numberA - numberB;
        }),
      }))
      .filter(group => group.principles.length > 0);
  }, [truthText]);

  return (
    <>
      <AnimatedBackground />
      <MainNav />
      <section className="relative min-h-screen overflow-hidden py-20 px-4 pt-24 text-white">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[22vw] font-black leading-none text-white/5 md:text-[18vw] lg:text-[16vw] xl:text-[14vw]">
            -0=+0
          </span>
        </div>

        <div className="container relative z-10 mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center text-cyan-400 mb-8 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-center md:text-5xl">
              <span className="block text-cyan-400">The Truth of Zero</span>
              <span className="block text-2xl md:text-3xl mt-4">All That Was, All That Is, All That Ever Will Be</span>
            </h1>
            <p className="mt-3 text-center text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              A contemplative work by Michael D. Simoneau
            </p>

            <div className="mt-12 space-y-8">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-6 text-cyan-100 shadow-lg backdrop-blur md:p-8">
                <h2 className="text-2xl font-semibold text-white">Chapter 6: The Numerical Trinity</h2>
                <p className="mt-3 text-base leading-7 text-cyan-50/80">
                  Explore the newly published chapter revealing Zero as the convergence of presence, potential, and truth. This
                  three-state synthesis bridges classical binaries and quantum superposition, outlining how the {'{-1, 0, 1}'}
                  framework unlocks ethereal computation.
                </p>
                <p className="mt-4 text-base leading-7 text-cyan-50/80">
                  Read the companion analysis in the{' '}
                  <Link to="/blog/zero-why" className="font-semibold text-cyan-200 underline decoration-cyan-300/70 underline-offset-4 hover:text-white">
                    Zero-Why manifesto
                  </Link>{' '}
                  to see how the trinity guides systems design across classical, quantum, and ethereal architectures.
                </p>
              </div>

              {principleGroups.length > 0 && (
                <div className="rounded-lg border border-cyan-500/20 bg-gray-900/40 p-6 shadow-lg backdrop-blur-md md:p-8">
                  <h3 className="text-xl font-semibold text-white">Guiding Principles of Zero</h3>
                  <p className="mt-3 text-base leading-7 text-cyan-100/80">
                    Each chapter now articulates its teachings as principles rather than verses, aligning the Zero canon with the language used throughout the
                    ZeroTruth experience.
                  </p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {principleGroups.map(group => (
                      <div key={group.chapter} className="rounded-md border border-cyan-500/10 bg-black/40 p-5">
                        <h4 className="text-lg font-semibold text-cyan-200">{group.chapter}</h4>
                        <ul className="mt-4 space-y-3 text-sm text-cyan-100/80">
                          {group.principles.map(principle => {
                            const colonIndex = principle.indexOf(':');
                            const heading = colonIndex !== -1 ? principle.slice(0, colonIndex) : principle;
                            const detail = colonIndex !== -1 ? principle.slice(colonIndex + 1).trim() : '';

                            return (
                              <li key={principle} className="rounded-sm bg-white/5 p-3">
                                <span className="block font-semibold text-cyan-200">{heading}</span>
                                {detail && <span className="mt-1 block text-gray-300">{detail}</span>}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-lg bg-gray-900/50 p-6 shadow-lg md:p-10">
                <pre className="whitespace-pre-wrap font-serif text-lg leading-8 text-gray-300">
                  {truthText}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
