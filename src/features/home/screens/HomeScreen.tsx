import { useMemo } from 'react';
import {
  useFoundationBoundary,
  useFoundationFeature,
  useFoundationMetadata,
  useFoundationPageView,
  useFoundationRuntime,
} from '../../../foundation';
import { useFeaturedBlogArticles } from '../../blog/hooks/useBlogArticles';
import { FeaturedBriefs } from '../components/FeaturedBriefs';
import { NeuralHero } from '../components/NeuralHero';
import { NeuralOperatingCanvas } from '../components/NeuralOperatingCanvas';
import { ThoughtOrbitLayout } from '../components/ThoughtOrbitLayout';
import type { ThoughtOrbitSection } from '../components/ThoughtOrbitLayout';

export const HomeScreen = () => {
  const metadata = useFoundationMetadata();
  const runtime = useFoundationRuntime();
  const cryptoFabricFeature = useFoundationFeature('cryptoFabricLaunch');
  const voiceAssistantFeature = useFoundationFeature('voiceAssistant');
  const featuredArticles = useFeaturedBlogArticles();
  const boundary = useMemo(
    () => ({
      id: 'home',
      label: 'Mission Control',
      description:
        'Entry deck for Michael Simoneau with live runtime signals and featured strategies.',
      href: '/',
    }),
    [],
  );

  useFoundationBoundary(boundary);
  useFoundationPageView(
    'page:view:home',
    {
      featuredArticleCount: featuredArticles.length,
      cryptoFabricEnabled: cryptoFabricFeature.enabled,
      voiceAssistantEnabled: voiceAssistantFeature.enabled,
    },
    {
      deps: [featuredArticles.length, cryptoFabricFeature.enabled, voiceAssistantFeature.enabled],
    },
  );

  const sections = useMemo<ThoughtOrbitSection[]>(() => {
    const orbitSections: ThoughtOrbitSection[] = [
      {
        id: 'neural-hero',
        content: <NeuralHero metadata={metadata} runtime={runtime} />,
        alignment: 'center' as const,
        tone: 'hero' as const,
      },
      {
        id: 'operating-canvas',
        content: (
          <NeuralOperatingCanvas
            metadata={metadata}
            runtime={runtime}
            cryptoFeature={cryptoFabricFeature}
            voiceFeature={voiceAssistantFeature}
            featuredArticles={featuredArticles}
          />
        ),
        alignment: 'center' as const,
        tone: 'surface' as const,
      },
      {
        id: 'featured-briefs',
        content: <FeaturedBriefs articles={featuredArticles} />,
        alignment: 'center' as const,
        tone: 'surface' as const,
      },
    ];

    return orbitSections;
  }, [cryptoFabricFeature, featuredArticles, metadata, runtime, voiceAssistantFeature]);

  return <ThoughtOrbitLayout sections={sections} />;
};
