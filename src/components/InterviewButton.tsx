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
    <div className="w-full max-w-4xl mx-auto mb-8">
      <Link to="/interview">
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-10" />
          <div className="relative z-10 flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-white flex-grow"
              >
                <div className="mb-4">
                  <span className="text-cyan-400 font-bold">Q: </span>
                  <Typewriter
                    words={[currentQuestion]}
                    cursor={false}
                    typeSpeed={30}
                  />
                </div>
                <div className="mt-4">
                  <span className="text-cyan-400 font-bold">A: </span>
                  <Typewriter
                    words={[currentAnswer]}
                    cursor={false}
                    typeSpeed={50}
                    delaySpeed={0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="text-gray-500 text-sm font-light tracking-wide mt-auto pt-4">
              Read Full Interview →
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}; 