import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Brain, Rocket } from 'lucide-react';
import gsap from 'gsap';

export const CTOTriage: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isInView) {
      const synth = window.speechSynthesis;
      const messages = [
        "Your current stack has 14.8 months to live",
        "Michael saved JPMorgan $5,000,000 in 11 weeks"
      ];

      const utterances = messages.map(message => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.8;
        utterance.pitch = 0.5;
        return utterance;
      });

      let currentIndex = 0;
      const speakNext = () => {
        if (currentIndex < utterances.length) {
          synth.speak(utterances[currentIndex]);
          currentIndex++;
        }
      };

      utterances.forEach(utterance => {
        utterance.onend = speakNext;
      });

      speakNext();

      return () => {
        synth.cancel();
      };
    }
  }, [isInView]);

  return (
    <section 
      id="cto-triage" 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20"
    >
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold mb-16 text-center">
          CTO War Room
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-black/50 p-8 rounded-lg"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-cyan-400" />
              Strategic Analysis
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Technical Debt Assessment
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Architecture Evolution Planning
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Risk Mitigation Strategy
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-black/50 p-8 rounded-lg"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="text-cyan-400" />
              Execution Protocol
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                90-Day Transformation Roadmap
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Team Augmentation Strategy
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Success Metrics Definition
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <a 
            href="https://calendly.com/michael-simoneau/war-room"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
          >
            INITIATE WAR ROOM SESSION
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};