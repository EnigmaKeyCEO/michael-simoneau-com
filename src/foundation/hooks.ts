import { useMemo } from 'react';
import type { FoundationFeatureConfig } from './types';
import { useFoundation } from './context';

export const useFoundationFeature = <T extends keyof FoundationFeatureConfig>(feature: T) => {
  const { features } = useFoundation();
  return useMemo(() => features[feature], [features, feature]);
};

export const useFoundationMetadata = () => {
  const { metadata } = useFoundation();
  return metadata;
};
