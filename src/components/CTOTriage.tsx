import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Brain, Rocket } from 'lucide-react';

export const CTOTriage: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Voice synthesis effect
  useEffect(() => {
    // Only trigger once when first in view
    if (!isInView) return;
    
    let isMounted = true;
    const synth = window.speechSynthesis;
    const messages = [
      "Quantum vulnerability detected in your infrastructure",
      "Initiating enterprise mesh transformation protocol"
    ];

    // Only speak if speech synthesis is available
    if (synth) {
      const utterances = messages.map(message => {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.8;
        utterance.pitch = 0.5;
        return utterance;
      });

      let currentIndex = 0;
      const speakNext = () => {
        if (!isMounted) return;
        if (currentIndex < utterances.length) {
          synth.speak(utterances[currentIndex]);
          currentIndex++;
        }
      };

      utterances.forEach(utterance => {
        utterance.onend = speakNext;
      });

      speakNext();
    }

    return () => {
      isMounted = false;
      if (synth) {
        synth.cancel();
      }
    };
  }, [isInView]);

  return (
    <motion.section 
      ref={sectionRef}
      id="cto-triage"
      className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative"
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1, transition: { duration: 0.8 } },
        hidden: { opacity: 0 }
      }}
    >
      <motion.div
        className="container mx-auto px-4"
        variants={{
          visible: { opacity: 1, transition: { duration: 0.8 } },
          hidden: { opacity: 0 }
        }}
      >
        <h2 className="text-5xl font-bold mb-16 text-center">
          <span className="block text-cyan-400">QUANTUM CRYPTOGRAPHY PIONEER</span>
          <span className="text-3xl block mt-4">Enterprise War Room</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="bg-black/50 p-8 rounded-lg"
            variants={{
              visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
              hidden: { x: -100, opacity: 0 }
            }}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-cyan-400" />
              Quantum Strategy Analysis
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Post-Quantum Readiness Assessment
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Self-Evolving Architecture Design
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Enterprise Mesh Implementation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Fortune 500 Value Proposition
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-black/50 p-8 rounded-lg"
            variants={{
              visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
              hidden: { x: 100, opacity: 0 }
            }}
          >
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="text-cyan-400" />
              Quantum Transformation Protocol
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                60-Day Quantum Evolution Roadmap
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Quantum-Ready Team Development
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                Self-Healing System Implementation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400">→</span>
                ROI-Driven Success Metrics
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          variants={{
            visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
            hidden: { y: 50, opacity: 0 }
          }}
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
    </motion.section>
  );
};