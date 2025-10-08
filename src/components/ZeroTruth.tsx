import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { MainNav } from './MainNav';
import truthText from '../data/zero-truth.txt?raw';

export const ZeroTruth: React.FC = () => {
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

            <div className="mt-12 rounded-lg bg-gray-900/50 p-6 shadow-lg md:p-10">
              <pre className="whitespace-pre-wrap font-serif text-lg leading-8 text-gray-300">
                {truthText}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
