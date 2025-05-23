import React, { createContext, useContext, useState, ReactNode, RefObject, useCallback } from 'react';

interface ScrollContextType {
  mainScrollContainerRef: RefObject<HTMLDivElement | null> | null;
  registerMainScrollContainer: (ref: RefObject<HTMLDivElement | null>) => void;
  // We might not need to pass the ID via context if MainNav gets it via prop and uses it directly
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    // This error might be too aggressive if not all pages use this context
    // For now, let's assume pages that need it will be wrapped in ScrollProvider
    console.warn('useScrollContext must be used within a ScrollProvider for on-page scroll features');
    return { mainScrollContainerRef: null, registerMainScrollContainer: () => {} }; 
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [mainScrollContainerRef, setMainScrollContainerRef] = useState<RefObject<HTMLDivElement | null> | null>(null);

  const registerMainScrollContainer = useCallback((ref: RefObject<HTMLDivElement | null>) => {
    setMainScrollContainerRef(ref);
  }, []);

  return (
    <ScrollContext.Provider value={{ mainScrollContainerRef, registerMainScrollContainer }}>
      {children}
    </ScrollContext.Provider>
  );
}; 