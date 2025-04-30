import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

// FROM HOMELESS TO $200M ARCHITECT
// QUANTUM CRYPTOGRAPHY PIONEER
// #quantumReady #billionDollarProof

interface QAPair {
  question: string;
  answer: string;
}

const interviewData: QAPair[] = [
  {
    question: "What was your first paid programming job?",
    answer: "At 16, I secured my first paid programming job building a website for a hairstylist at my local mall."
  },
  {
    question: "How did you teach yourself to build computers at age 12?",
    answer: "My approach was simple but effective - I literally read the manual cover to cover."
  },
  {
    question: "Tell me about that first clock project.",
    answer: "My first program was that clock I mentioned - I created a big digital clock display in the center of the screen."
  },
  {
    question: "What made you spend hours watching that clock?",
    answer: "I'm a bit obsessive... ha! It took me years to craft that obsessive nature into determination and tenatiousness."
  }
];

export const InterviewButton: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % interviewData.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = interviewData[currentIndex].question;
  const currentAnswer = interviewData[currentIndex].answer;

  return (
    <div className="w-full">
      <Link to="/interview" className="block w-full">
        <div className="relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-lg w-full transform hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
          <div className="relative z-10 flex flex-col p-4 space-y-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="text-white space-y-3"
              >
                <div>
                  <span className="text-cyan-400 font-bold text-sm mr-2">Q:</span>
                  <span className="text-gray-100 text-sm font-medium">
                    <Typewriter
                      words={[currentQuestion]}
                      cursor={false}
                      typeSpeed={30}
                    />
                  </span>
                </div>
                <div>
                  <span className="text-cyan-400 font-bold text-sm mr-2">A:</span>
                  <span className="text-gray-300 text-sm">
                    <Typewriter
                      words={[currentAnswer]}
                      cursor={false}
                      typeSpeed={50}
                      delaySpeed={0}
                    />
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="text-cyan-400/80 text-xs font-medium tracking-wide flex items-center">
              Read Full Interview 
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block ml-1"
              >
                →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}; 