import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "./HeroSection";
import { SecurityAudit } from "./SecurityAudit";
import { DemoMassacre } from "./DemoMassacre";
import { CTOTriage } from "./CTOTriage";
import { ProfessionalProfile } from "./ProfessionalProfile";
import { useSpeech } from "../contexts/SpeechContext";

const useSectionScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLDivElement>(".section")
    );
    if (sections.length === 0) return;

    const handleScroll = () => {
      if (!container) return;
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      const currentIndex = Math.floor(scrollPosition / windowHeight);

      if (currentIndex !== currentSection) {
        setCurrentSection(currentIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentSection]);

  return { containerRef, currentSection };
};

export const MainPage: React.FC = () => {
  const { containerRef } = useSectionScroll();
  const { play, pause } = useSpeech();
  const hasStartedRef = useRef(false);

  useEffect(() => {
    document.title = "Michael Simoneau | FROM HOMELESS TO $200M ARCHITECT";

    // Only start playing once when the component mounts
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      const timer = setTimeout(() => {
        play();
      }, 3000);

      return () => {
        pause();
        clearTimeout(timer);
      };
    }
  }, [play, pause]);

  return (
    <div
      className="h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory w-full max-w-full"
      ref={containerRef}
    >
      <motion.div
        className="section min-h-screen snap-start snap-always pt-4 pb-8 sm:mt-76 sm:pt-16 sm:pb-16 w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <HeroSection />
      </motion.div>
      <motion.div
        className="section min-h-screen snap-start snap-always pt-4 pb-8 sm:mt-76 sm:pt-16 sm:pb-16 w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <SecurityAudit />
      </motion.div>
      <motion.div
        className="section min-h-screen snap-start snap-always pt-4 pb-8 sm:mt-76 sm:pt-16 sm:pb-16 w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <DemoMassacre />
      </motion.div>
      <motion.div
        className="section min-h-screen snap-start snap-always pt-4 pb-8 sm:mt-76 sm:pt-16 sm:pb-16 w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <CTOTriage />
      </motion.div>
      <motion.div
        className="section min-h-screen snap-start snap-always pt-4 pb-8 sm:mt-76 sm:pt-16 sm:pb-16 w-full max-w-full overflow-x-hidden"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ProfessionalProfile />
      </motion.div>
    </div>
  );
};
