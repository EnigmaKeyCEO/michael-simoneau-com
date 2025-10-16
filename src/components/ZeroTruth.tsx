import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { MainNav } from './MainNav';
import truthText from '/zero.txt?raw';

type SummaryPrinciple = {
  number: number;
  label: string;
  description: string;
  anchorId: string;
};

type SummaryChapter = {
  chapterNumber: number;
  chapterTitle: string;
  anchorId: string;
  principles: SummaryPrinciple[];
};

type IntroBlock =
  | { type: 'title'; text: string }
  | { type: 'subtitle'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string };

type PrincipleContent = {
  number: number;
  heading: string;
  anchorId: string;
  paragraphs: string[];
};

type ChapterContent = {
  chapterNumber: number;
  chapterTitle: string;
  anchorId: string;
  introParagraphs: string[];
  principles: PrincipleContent[];
};

const createAnchorId = (chapterNumber: number | null, principleNumber?: number) => {
  if (chapterNumber === null) {
    return principleNumber !== undefined ? `principle-${principleNumber}` : 'chapter';
  }

  if (principleNumber === undefined) {
    return `chapter-${chapterNumber}`;
  }

  return `chapter-${chapterNumber}-principle-${principleNumber}`;
};

const findNextNonEmptyLineIndex = (lines: string[], startIndex: number) => {
  for (let index = startIndex; index < lines.length; index += 1) {
    if (lines[index].trim()) {
      return index;
    }
  }

  return -1;
};

const parseZeroTruth = (text: string) => {
  const lines = text.split('\n');

  const summaryStartIndex = lines.findIndex((rawLine, index) => {
    const line = rawLine.trim();
    if (!/^Chapter\s+\d+:/i.test(line)) {
      return false;
    }

    const nextIndex = findNextNonEmptyLineIndex(lines, index + 1);
    if (nextIndex === -1) {
      return false;
    }

    return lines[nextIndex].trim().startsWith('•');
  });

  const detailStartIndex = lines.findIndex((rawLine, index) => {
    const line = rawLine.trim();
    if (!/^Chapter\s+\d+:/i.test(line)) {
      return false;
    }

    const nextIndex = findNextNonEmptyLineIndex(lines, index + 1);
    if (nextIndex === -1) {
      return false;
    }

    return /^Principle\s+\d+:/i.test(lines[nextIndex].trim());
  });

  const summaryChapters: SummaryChapter[] = [];
  const headingMap = new Map<string, string>();

  if (summaryStartIndex !== -1) {
    const summaryEndIndex = detailStartIndex === -1 ? lines.length : detailStartIndex;

    let currentSummaryChapter: SummaryChapter | null = null;

    for (let index = summaryStartIndex; index < summaryEndIndex; index += 1) {
      const trimmed = lines[index].trim();

      if (!trimmed) {
        continue;
      }

      const chapterMatch = trimmed.match(/^Chapter\s+(\d+):\s*(.+)$/i);
      if (chapterMatch) {
        const chapterNumber = Number(chapterMatch[1]);
        const chapterTitle = chapterMatch[2].trim();
        currentSummaryChapter = {
          chapterNumber,
          chapterTitle,
          anchorId: createAnchorId(chapterNumber),
          principles: [],
        };
        summaryChapters.push(currentSummaryChapter);
        continue;
      }

      if (!currentSummaryChapter) {
        continue;
      }

      const principleMatch = trimmed.match(/^•\s*Principle\s+(\d+):\s*(.+)$/i);
      if (!principleMatch) {
        continue;
      }

      const principleNumber = Number(principleMatch[1]);
      const description = principleMatch[2].trim();
      const anchorId = createAnchorId(currentSummaryChapter.chapterNumber, principleNumber);
      const headingText = description
        ? `Principle ${principleNumber}: ${description}`
        : `Principle ${principleNumber}`;

      headingMap.set(`${currentSummaryChapter.chapterNumber}-${principleNumber}`, headingText);

      currentSummaryChapter.principles.push({
        number: principleNumber,
        label: `Principle ${principleNumber}`,
        description,
        anchorId,
      });
    }
  }

  const introBlocks: IntroBlock[] = [];
  const introEndIndex = summaryStartIndex !== -1 ? summaryStartIndex : detailStartIndex !== -1 ? detailStartIndex : lines.length;

  let introBuffer: string[] = [];
  let nonEmptyCount = 0;

  const flushIntroBuffer = () => {
    if (introBuffer.length === 0) {
      return;
    }

    introBlocks.push({ type: 'paragraph', text: introBuffer.join(' ') });
    introBuffer = [];
  };

  for (let index = 0; index < introEndIndex; index += 1) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      flushIntroBuffer();
      continue;
    }

    nonEmptyCount += 1;

    if (nonEmptyCount === 1) {
      introBlocks.push({ type: 'title', text: trimmed });
      continue;
    }

    if (nonEmptyCount === 2) {
      introBlocks.push({ type: 'subtitle', text: trimmed });
      continue;
    }

    if (/^Preface$/i.test(trimmed)) {
      flushIntroBuffer();
      introBlocks.push({ type: 'heading', text: trimmed });
      continue;
    }

    introBuffer.push(trimmed);
  }

  flushIntroBuffer();

  const chapters: ChapterContent[] = [];
  const detailProcessingStart = detailStartIndex !== -1 ? detailStartIndex : summaryStartIndex !== -1 ? summaryStartIndex : introEndIndex;

  let currentChapter: ChapterContent | null = null;
  let currentPrinciple: PrincipleContent | null = null;
  let chapterIntroBuffer: string[] = [];
  let principleParagraphBuffer: string[] = [];

  const flushPrincipleParagraphs = () => {
    if (!currentPrinciple || principleParagraphBuffer.length === 0) {
      return;
    }

    currentPrinciple.paragraphs.push(principleParagraphBuffer.join(' '));
    principleParagraphBuffer = [];
  };

  const flushChapterIntroParagraphs = () => {
    if (!currentChapter || chapterIntroBuffer.length === 0) {
      return;
    }

    currentChapter.introParagraphs.push(chapterIntroBuffer.join(' '));
    chapterIntroBuffer = [];
  };

  const finalizePrinciple = () => {
    flushPrincipleParagraphs();
    if (currentChapter && currentPrinciple) {
      currentChapter.principles.push(currentPrinciple);
    }
    currentPrinciple = null;
  };

  for (let index = detailProcessingStart; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      flushPrincipleParagraphs();
      if (!currentPrinciple) {
        flushChapterIntroParagraphs();
      }
      continue;
    }

    const chapterMatch = trimmed.match(/^Chapter\s+(\d+):\s*(.+)$/i);
    if (chapterMatch) {
      finalizePrinciple();
      flushChapterIntroParagraphs();

      const chapterNumber = Number(chapterMatch[1]);
      const chapterTitle = chapterMatch[2].trim();
      currentChapter = {
        chapterNumber,
        chapterTitle,
        anchorId: createAnchorId(chapterNumber),
        introParagraphs: [],
        principles: [],
      };
      chapters.push(currentChapter);
      continue;
    }

    const principleMatch = trimmed.match(/^Principle\s+(\d+):\s*(.*)$/i);
    if (principleMatch) {
      finalizePrinciple();
      const principleNumber = Number(principleMatch[1]);
      const defaultHeading = principleMatch[2].trim();
      const headingKey = currentChapter ? `${currentChapter.chapterNumber}-${principleNumber}` : `principle-${principleNumber}`;
      const headingFromSummary = headingMap.get(headingKey);

      const heading = headingFromSummary ?? (defaultHeading ? `Principle ${principleNumber}: ${defaultHeading}` : `Principle ${principleNumber}`);
      currentPrinciple = {
        number: principleNumber,
        heading,
        anchorId: createAnchorId(currentChapter ? currentChapter.chapterNumber : null, principleNumber),
        paragraphs: [],
      };
      continue;
    }

    if (currentPrinciple) {
      principleParagraphBuffer.push(trimmed);
    } else if (currentChapter) {
      chapterIntroBuffer.push(trimmed);
    } else {
      introBlocks.push({ type: 'paragraph', text: trimmed });
    }
  }

  finalizePrinciple();
  flushChapterIntroParagraphs();

  return {
    summaryChapters,
    introBlocks,
    chapters,
  };
};

export const ZeroTruth: React.FC = () => {
  const location = useLocation();
  const { summaryChapters, introBlocks, chapters } = React.useMemo(() => parseZeroTruth(truthText), [truthText]);
  const principleRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const handlePrincipleClick = React.useCallback((anchorId: string) => {
    const element = principleRefs.current[anchorId] ?? document.getElementById(anchorId);

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}#${anchorId}`);
    }
  }, []);

  React.useEffect(() => {
    if (!location.hash) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const anchorId = location.hash.replace(/^#/, '');
    const element = document.getElementById(anchorId);

    if (!element) {
      return;
    }

    const scroll = () => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const timeout = window.setTimeout(scroll, 100);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [location.hash]);

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

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
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

              {summaryChapters.length > 0 && (
                <div className="rounded-lg border border-cyan-500/20 bg-gray-900/40 p-6 shadow-lg backdrop-blur-md md:p-8">
                  <h3 className="text-xl font-semibold text-white">Guiding Principles of Zero</h3>
                  <p className="mt-3 text-base leading-7 text-cyan-100/80">
                    Each chapter now articulates its teachings as principles rather than verses, aligning the Zero canon with the language used throughout the
                    ZeroTruth experience.
                  </p>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {summaryChapters.map(chapter => (
                      <div key={chapter.anchorId} className="rounded-md border border-cyan-500/10 bg-black/40 p-5">
                        <h4 className="text-lg font-semibold text-cyan-200">{`Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}</h4>
                        <ul className="mt-4 space-y-3 text-sm text-cyan-100/80">
                          {chapter.principles.map(principle => (
                            <li key={principle.anchorId}>
                              <button
                                type="button"
                                onClick={() => handlePrincipleClick(principle.anchorId)}
                                className="w-full rounded-sm border border-cyan-500/20 bg-white/5 p-3 text-left transition-colors hover:border-cyan-400/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
                              >
                                <span className="block font-semibold text-cyan-200">{principle.label}</span>
                                {principle.description && <span className="mt-1 block text-gray-300">{principle.description}</span>}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <article className="mt-12 space-y-10 text-base leading-7 text-cyan-100/80">
              {introBlocks.map((block, index) => {
                if (block.type === 'title') {
                  return (
                    <h2 key={`intro-${index}`} className="text-3xl font-semibold text-white">
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === 'subtitle') {
                  return (
                    <p key={`intro-${index}`} className="text-lg italic text-cyan-200/80">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === 'heading') {
                  return (
                    <h3 key={`intro-${index}`} className="pt-6 text-2xl font-semibold text-cyan-200">
                      {block.text}
                    </h3>
                  );
                }

                return (
                  <p key={`intro-${index}`} className="text-base leading-7 text-cyan-100/80">
                    {block.text}
                  </p>
                );
              })}

              {chapters.map(chapter => (
                <section key={chapter.anchorId} className="space-y-6">
                  <h2 id={chapter.anchorId} className="text-2xl font-semibold text-white">
                    {`Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle}`}
                  </h2>

                  {chapter.introParagraphs.map((paragraph, index) => (
                    <p key={`${chapter.anchorId}-intro-${index}`} className="text-base leading-7 text-cyan-100/80">
                      {paragraph}
                    </p>
                  ))}

                  {chapter.principles.map(principle => (
                    <div key={principle.anchorId} className="space-y-4">
                      <h3
                        id={principle.anchorId}
                        ref={node => {
                          if (node) {
                            principleRefs.current[principle.anchorId] = node;
                          } else {
                            delete principleRefs.current[principle.anchorId];
                          }
                        }}
                        className="text-xl font-semibold text-cyan-200"
                      >
                        {principle.heading}
                      </h3>

                      {principle.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${principle.anchorId}-paragraph-${paragraphIndex}`} className="text-base leading-7 text-cyan-100/80">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ))}
                </section>
              ))}
            </article>
          </motion.div>
        </div>
      </section>
    </>
  );
};
