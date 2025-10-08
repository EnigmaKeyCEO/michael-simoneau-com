import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { MainNav } from './MainNav';
import treatiseText from '../data/zero-treatise.txt?raw';

export const ZeroTreatise: React.FC = () => {
  return (
    <>
      <AnimatedBackground />
      <MainNav />
      <section className="min-h-screen text-white py-20 px-4 pt-24 relative z-10">
        <div className="container mx-auto max-w-5xl">
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

            <h1 className="text-4xl md:text-5xl font-bold text-center">
              <span className="block text-cyan-400">The Treatise of Zero</span>
              <span className="block text-2xl md:text-3xl mt-4">All That Was, All That Is, All That Ever Will Be</span>
            </h1>
            <p className="mt-3 text-center text-sm uppercase tracking-[0.3em] text-cyan-200/70">
              A contemplative work by Michael D. Simoneau
            </p>

            <div className="mt-12 bg-gray-900/50 p-6 md:p-10 rounded-lg shadow-lg">
              <pre className="whitespace-pre-wrap text-gray-300 text-lg leading-8 font-serif">
                {treatiseText}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
