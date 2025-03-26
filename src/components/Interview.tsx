import React from 'react';
import { motion } from 'framer-motion';
import { MainNav } from './MainNav';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Interview: React.FC = () => {
  return (
    <>
      <MainNav />
      <section className="min-h-screen bg-black text-white py-20 px-4 pt-24">
        <div className="container mx-auto max-w-4xl">
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

            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              <span className="block text-cyan-400">QUANTUM ARCHITECT VISION INTERVIEW</span>
              <span className="block text-2xl md:text-3xl mt-4">FROM HOMELESS TO $200M ARCHITECT</span>
              <span className="block text-xl md:text-2xl mt-2">QUANTUM CRYPTOGRAPHY PIONEER</span>
            </h1>

            <div className="space-y-8">
              <div className="bg-gray-900/50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-cyan-400">Interview Session 1: The Foundation</h2>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-lg font-semibold mb-2">What was your first paid programming job?</p>
                    <p className="text-gray-300">At 16, I secured my first paid programming job building a website for a hairstylist at my local mall. But my journey started much earlier. At 12, I began collecting spare computer parts from friends and family, teaching myself enough to build a "Frankenstein" computer from scratch. This sparked my curiosity about how computers actually worked, leading me to code. With limited resources, I turned to learning JavaScript through the browser console. I was so determined that I printed the entire JavaScript 1.2 Complete Manual at my school library - much to their displeasure - and read it cover to cover.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">How did you teach yourself to build computers at age 12?</p>
                    <p className="text-gray-300">My approach was simple but effective - I literally read the manual cover to cover. But the real breakthrough came when I remembered my mother's wisdom: "Necessity is the Mother of all invention." My mother was by far my best influence and catalyst to my success. This led me to realize I needed a concrete project to drive my learning. I decided my first challenge would be to make a clock - it seemed obvious to me because time is money!</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">Tell me about that first clock project.</p>
                    <p className="text-gray-300">My first program was that clock I mentioned - I created a big digital clock display in the center of the screen. I was so committed to perfection that I watched it for hours to ensure it stayed perfectly synchronized. Even then, precision and reliability were non-negotiable for me.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">What made you spend hours watching that clock?</p>
                    <p className="text-gray-300">I'm a bit obsessive... ha! It took me years to craft that obsessive nature into determination and tenatiousness.</p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mb-2">When did you first realize this obsessive trait could be a superpower?</p>
                    <p className="text-gray-300">EASY! My father alerted me to it! LOL! My dad (THE BEST FATHER EVER)! When I was 16, he asked me "Okay, you're obsessed with this code... but how are you going to make money?!?".. to which I replied, "Hmm.. I don't know... yet.".. So, I went to the local mall, and I went into every SINGLE STORE (even the weird ones) and pitched my talent, and that they needed to embrace the future! Only one woman believed me... That was my first professional website.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}; 