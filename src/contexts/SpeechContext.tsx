import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cookieService } from '../services/cookieService';

interface SpeechContextType {
  isPlaying: boolean;
  currentPhrase: string | null;
  totalPhrases: number;
  play: () => void;
  pause: () => void;
  skipForward: () => void;
  skipBack: () => void;
  isInitialized: boolean;
  isSupported: boolean;
  error: string | undefined;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};

interface SpeechProviderProps {
  children: ReactNode;
}

export const SpeechProvider: React.FC<SpeechProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState<string | null>(null);
  const [utterances, setUtterances] = useState<SpeechSynthesisUtterance[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  // Transient state to track if auto-play happened before cookie consent
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) {
      setIsSupported(false);
      setError('Speech synthesis not supported in this browser');
      return;
    }

    setIsSupported(true);
    const messages = [
      "Your current stack has 14.8 months to live",
      "Michael saved JPMorgan $5,000,000 in 11 weeks",
      "Quantum vulnerability detected in your infrastructure",
      "Initiating enterprise mesh transformation protocol"
    ].sort(() => Math.random() - 0.5);

    const newUtterances = messages.map(message => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 0.5;
      return utterance;
    });

    setUtterances(newUtterances);
    setIsInitialized(true);

    return () => {
      synth.cancel();
    };
  }, []);

  // Handle auto-play with 3-second delay
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const setupAutoPlay = () => {
      // Check if we've already played this session OR if there's a cookie indicating we've played before
      const hasPlayedBefore = cookieService.hasAutoPlayConsent() || hasPlayedThisSession;
      
      if (!hasPlayedBefore && isInitialized && isSupported && utterances.length > 0) {
        console.log('Setting up auto-play timer...');
        timer = setTimeout(() => {
          console.log('Auto-playing first utterance');
          const synth = window.speechSynthesis;
          if (!synth) return;

          synth.cancel(); // Cancel any ongoing speech
          setIsPlaying(true);
          setCurrentPhrase(utterances[0].text);
          setHasPlayedThisSession(true); // Mark as played for this session

          let currentIndex = 0;
          const speakNext = () => {
            if (currentIndex < utterances.length) {
              setCurrentPhrase(utterances[currentIndex].text);
              synth.speak(utterances[currentIndex]);
              currentIndex++;
            } else {
              setIsPlaying(false);
              setCurrentPhrase(null);
            }
          };

          utterances.forEach(utterance => {
            utterance.onend = speakNext;
          });

          speakNext();
        }, 3000);
      }
    };

    setupAutoPlay();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [utterances, isInitialized, isSupported, hasPlayedThisSession]);

  const play = () => {
    const synth = window.speechSynthesis;
    if (!synth || !utterances.length) return;

    synth.cancel(); // Cancel any ongoing speech
    setIsPlaying(true);
    setCurrentPhrase(utterances[0].text);

    let currentIndex = 0;
    const speakNext = () => {
      if (currentIndex < utterances.length) {
        setCurrentPhrase(utterances[currentIndex].text);
        synth.speak(utterances[currentIndex]);
        currentIndex++;
      } else {
        setIsPlaying(false);
        setCurrentPhrase(null);
      }
    };

    utterances.forEach(utterance => {
      utterance.onend = speakNext;
    });

    speakNext();
  };

  const pause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.pause();
    setIsPlaying(false);
  };

  const skipForward = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const currentIndex = utterances.findIndex(u => u.text === currentPhrase);
    if (currentIndex < utterances.length - 1) {
      setCurrentPhrase(utterances[currentIndex + 1].text);
      synth.speak(utterances[currentIndex + 1]);
    }
  };

  const skipBack = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const currentIndex = utterances.findIndex(u => u.text === currentPhrase);
    if (currentIndex > 0) {
      setCurrentPhrase(utterances[currentIndex - 1].text);
      synth.speak(utterances[currentIndex - 1]);
    }
  };

  return (
    <SpeechContext.Provider
      value={{
        isPlaying,
        currentPhrase,
        totalPhrases: utterances.length,
        play,
        pause,
        skipForward,
        skipBack,
        isInitialized,
        isSupported,
        error
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}; 