import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { defaultFoundationConfig } from './defaultConfig';
import type { Foundation, FoundationBoundary, FoundationProviderProps } from './types';
import { deepMerge } from './utils';

const FoundationContext = createContext<Foundation>(defaultFoundationConfig);

export const FoundationProvider = ({ config, children }: FoundationProviderProps) => {
  const [boundaries, setBoundaries] = useState<FoundationBoundary[]>([]);

  const mergedConfig = useMemo(() => {
    return deepMerge(defaultFoundationConfig, config ?? {});
  }, [config]);

  const registerBoundary = useCallback<Foundation['registerBoundary']>(boundary => {
    setBoundaries(current => {
      const existingIndex = current.findIndex(item => item.id === boundary.id);
      if (existingIndex >= 0) {
        const next = [...current];
        next[existingIndex] = { ...next[existingIndex], ...boundary };
        return next;
      }
      return [...current, boundary];
    });
  }, []);

  const value = useMemo<Foundation>(() => ({
    ...mergedConfig,
    boundaries,
    registerBoundary,
  }), [mergedConfig, boundaries, registerBoundary]);

  return <FoundationContext.Provider value={value}>{children}</FoundationContext.Provider>;
};

export const useFoundation = () => {
  const context = useContext(FoundationContext);
  if (!context) {
    throw new Error('useFoundation must be used inside a FoundationProvider');
  }
  return context;
};
