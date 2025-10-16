import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  useFoundationBoundary,
  useFoundationFeature,
  useFoundationMetadata,
  useFoundationPageView,
  useFoundationRuntime,
} from '../../../foundation';
import { useFeaturedBlogArticles } from '../../blog/hooks/useBlogArticles';
import { FluidHero } from '../components/FluidHero';
import { FeatureNebula } from '../components/FeatureNebula';
import { VoicePulseCard } from '../components/VoicePulseCard';
import { ArticleFlow } from '../components/ArticleFlow';

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

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.container}>
      <FluidHero metadata={metadata} runtime={runtime} />
      <View style={styles.sectionSpacing}>
        {cryptoFabricFeature.enabled ? <FeatureNebula feature={cryptoFabricFeature} /> : null}
      </View>
      <VoicePulseCard feature={voiceAssistantFeature} />
      <ArticleFlow articles={featuredArticles} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#030712',
  },
  container: {
    padding: 28,
    gap: 40,
    paddingBottom: 64,
  },
  sectionSpacing: {
    marginVertical: 8,
  },
});
