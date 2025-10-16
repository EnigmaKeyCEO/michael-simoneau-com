import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

import { SecurePhoneReveal } from './SecurePhoneReveal';

export const ContactFooter: React.FC = () => {
  const [showPhoneChallenge, setShowPhoneChallenge] = React.useState(false);

  // Quantum-resistant since 2023
  return (
    <motion.footer 
      className="py-12 bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold mb-8">Let's Build <span className="text-cyan-400">Something Revolutionary</span></h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          I'm always open to discussing new challenges, collaborations, or opportunities to leverage technology for impactful solutions.
        </p>
        <div className="flex justify-center items-center space-x-6 mb-8">
          <a href="https://linkedin.com/in/MichaelSimoneau" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
            <Linkedin size={28} />
          </a>
          <a href="https://github.com/EnigmaKeyCEO" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
            <Github size={28} />
          </a>
          <a href="mailto:mike@brainycouch.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
            <Mail size={28} />
          </a>
          <button
            type="button"
            onClick={() => setShowPhoneChallenge((previous) => !previous)}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-expanded={showPhoneChallenge}
            aria-controls="footer-secure-phone"
          >
            <span className="sr-only">
              {showPhoneChallenge ? 'Hide phone challenge' : 'Reveal phone contact'}
            </span>
            <Phone size={28} />
          </button>
        </div>
        {showPhoneChallenge ? (
          <div id="footer-secure-phone" className="mx-auto mt-6 max-w-xl">
            <SecurePhoneReveal
              variant="inline"
              heading="Phone Contact"
              successMessage="Thanks for verifying! Tap the number to start a call."
              revealButtonLabel="Reveal"
            />
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Need a phone number? Tap the phone icon and complete a quick human check.
          </p>
        )}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Michael Simoneau. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}; 