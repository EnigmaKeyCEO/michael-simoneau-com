import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { cookieService } from '../services/cookieService';
import { useFoundation, useFoundationFeature } from '../foundation';

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
  const [hasPlayedThisSession, setHasPlayedThisSession] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const voiceAssistant = useFoundationFeature('voiceAssistant');
  const { analytics } = useFoundation();

  const initializeSpeech = useCallback(() => {
    if (isInitializing || isInitialized) return;

    if (!voiceAssistant.enabled) {
      setIsSupported(false);
      setError('Voice assistant disabled by React Foundation');
      return;
    }

    setIsInitializing(true);
    const synth = window.speechSynthesis;
    if (!synth) {
      setIsSupported(false);
      setError('Speech synthesis not supported in this browser');
      setIsInitializing(false);
      return;
    }

    setIsSupported(true);
    const messages = (voiceAssistant.messages.length > 0
      ? [...voiceAssistant.messages]
      : [
          'Your current stack has 14.8 months to live',
          'Michael saved JPMorgan $5,000,000 in 11 weeks',
          'Quantum vulnerability detected in your infrastructure',
          'Initiating enterprise mesh transformation protocol',
        ]).sort(() => Math.random() - 0.5);

    const newUtterances = messages.map(message => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = voiceAssistant.voice.rate;
      utterance.pitch = voiceAssistant.voice.pitch;
      return utterance;
    });

    setUtterances(newUtterances);
    setIsInitialized(true);
    setIsInitializing(false);
  }, [isInitialized, isInitializing, voiceAssistant]);

  // Handle auto-play with 3-second delay
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const setupAutoPlay = () => {
      const hasPlayedBefore = cookieService.hasAutoPlayConsent() || hasPlayedThisSession;
      
      if (!hasPlayedBefore && isInitialized && isSupported && utterances.length > 0 && voiceAssistant.enabled) {
        timer = setTimeout(() => {
          const synth = window.speechSynthesis;
          if (!synth) return;

          synth.cancel();
          setIsPlaying(true);
          setCurrentPhrase(utterances[0].text);
          setHasPlayedThisSession(true);

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
          analytics.track({
            type: 'foundation.voice-assistant.autoplay',
            payload: { totalPhrases: utterances.length },
            timestamp: Date.now(),
          });
        }, Math.max(0, voiceAssistant.autoPlayDelayMs));
      }
    };

    setupAutoPlay();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [analytics, utterances, isInitialized, isSupported, hasPlayedThisSession, voiceAssistant]);

  const play = useCallback(() => {
    if (!isInitialized) {
      initializeSpeech();
    }

    const synth = window.speechSynthesis;
    if (!synth || !utterances.length) return;

    synth.cancel();
    setIsPlaying(true);
    setCurrentPhrase(utterances[0].text);

    analytics.track({
      type: 'foundation.voice-assistant.play',
      payload: { totalPhrases: utterances.length },
      timestamp: Date.now(),
    });

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
  }, [analytics, utterances, isInitialized, initializeSpeech]);

  const pause = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.pause();
    setIsPlaying(false);
    analytics.track({
      type: 'foundation.voice-assistant.pause',
      payload: { phrase: currentPhrase },
      timestamp: Date.now(),
    });
  }, [analytics, currentPhrase]);

  const skipForward = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const currentIndex = utterances.findIndex(u => u.text === currentPhrase);
    if (currentIndex < utterances.length - 1) {
      setCurrentPhrase(utterances[currentIndex + 1].text);
      synth.speak(utterances[currentIndex + 1]);
      analytics.track({
        type: 'foundation.voice-assistant.skip',
        payload: { direction: 'forward', to: utterances[currentIndex + 1].text },
        timestamp: Date.now(),
      });
    }
  }, [analytics, utterances, currentPhrase]);

  const skipBack = useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const currentIndex = utterances.findIndex(u => u.text === currentPhrase);
    if (currentIndex > 0) {
      setCurrentPhrase(utterances[currentIndex - 1].text);
      synth.speak(utterances[currentIndex - 1]);
      analytics.track({
        type: 'foundation.voice-assistant.skip',
        payload: { direction: 'backward', to: utterances[currentIndex - 1].text },
        timestamp: Date.now(),
      });
    }
  }, [analytics, utterances, currentPhrase]);

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