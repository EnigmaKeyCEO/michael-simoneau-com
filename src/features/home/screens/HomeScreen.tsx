import { Href, Link } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  useFoundationBoundary,
  useFoundationFeature,
  useFoundationMetadata,
  useFoundationPageView,
  useFoundationRuntime,
} from '../../../foundation';
import { useFeaturedBlogArticles } from '../../blog/hooks/useBlogArticles';
import { BlogListItem } from '../../blog/components/BlogListItem';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
      description: 'Entry deck for Michael Simoneau with live runtime signals and featured strategies.',
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

  const [reduceMotion, setReduceMotion] = useState(false);
  const [currentOrbit, setCurrentOrbit] = useState(0);
  
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => setReduceMotion(false));
  }, []);

  // 3D Orbital Animation System
  const orbitalRotation = useRef(new Animated.Value(0)).current;
  const centralHubScale = useRef(new Animated.Value(0.8)).current;
  const centralHubOpacity = useRef(new Animated.Value(0)).current;
  const satelliteAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    if (reduceMotion) {
      centralHubScale.setValue(1);
      centralHubOpacity.setValue(1);
      satelliteAnimations.forEach(anim => anim.setValue(1));
      return;
    }

    // Central hub entrance
    Animated.parallel([
      Animated.spring(centralHubScale, { toValue: 1, useNativeDriver: true, tension: 50, friction: 8 }),
      Animated.timing(centralHubOpacity, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();

    // Staggered satellite entrance
    satelliteAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: 200 + (index * 200),
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();
    });

    // Continuous orbital rotation
    const orbitalLoop = Animated.loop(
      Animated.timing(orbitalRotation, {
        toValue: 1,
        duration: 60000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    orbitalLoop.start();

    return () => orbitalLoop.stop();
  }, [reduceMotion, centralHubScale, centralHubOpacity, satelliteAnimations, orbitalRotation]);

  // 3D Transform calculations
  const orbitalAngle = orbitalRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSatelliteTransform = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radius = screenWidth * 0.35;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    
    return {
      transform: [
        { translateX: x },
        { translateY: y },
        { rotate: orbitalAngle },
        { scale: satelliteAnimations[index] },
        { perspective: 1000 },
        { rotateX: '15deg' },
      ],
    };
  };

  const renderPrimaryButton = (href: Href<string>, label: string) => {
    const pressedScale = useRef(new Animated.Value(1)).current;
    const animateTo = (value: number) => {
      if (reduceMotion) return;
      Animated.spring(pressedScale, { toValue: value, useNativeDriver: true, damping: 14, stiffness: 180, mass: 0.6 }).start();
    };
    return (
      <Link href={href} asChild>
        <Pressable
          onPressIn={() => animateTo(0.97)}
          onPressOut={() => animateTo(1)}
          style={({ pressed }) => [styles.primaryButton, pressed ? styles.primaryButtonActive : undefined]}
        >
          <Animated.View style={{ transform: [{ scale: pressedScale }] }}>
            <Text style={styles.primaryButtonText}>{label}</Text>
          </Animated.View>
        </Pressable>
      </Link>
    );
  };

  const orbitalSatellites = [
    {
      id: 'crypto-fabric',
      enabled: cryptoFabricFeature.enabled,
      title: cryptoFabricFeature.name,
      subtitle: cryptoFabricFeature.highlightLabel,
      content: (
        <View style={styles.satelliteCard}>
          <Text style={styles.satelliteTitle}>{cryptoFabricFeature.name}</Text>
          <Text style={styles.satelliteDescription}>{cryptoFabricFeature.description}</Text>
          <View style={styles.benefitGrid}>
            {cryptoFabricFeature.keyBenefits.map(benefit => (
              <View key={benefit.title} style={styles.benefitChip}>
                <Text style={styles.benefitChipText}>{benefit.title}</Text>
              </View>
            ))}
          </View>
          {renderPrimaryButton(cryptoFabricFeature.cta.href as Href<string>, cryptoFabricFeature.cta.label)}
        </View>
      ),
    },
    {
      id: 'voice-assistant',
      enabled: true,
      title: 'Voice Assistant',
      subtitle: 'Voice of the stack',
      content: (
        <View style={styles.satelliteCard}>
          <Text style={styles.satelliteTitle}>Voice Assistant</Text>
          <Text style={styles.satelliteDescription}>
            {voiceAssistantFeature.messages.join(' • ')}
          </Text>
          <Text style={styles.voiceMeta}>{`Pitch ${voiceAssistantFeature.voice.pitch} • Rate ${voiceAssistantFeature.voice.rate}`}</Text>
        </View>
      ),
    },
    {
      id: 'blog-articles',
      enabled: true,
      title: 'Strategy Briefs',
      subtitle: 'Latest insights',
      content: (
        <View style={styles.satelliteCard}>
          <Text style={styles.satelliteTitle}>Strategy Briefs</Text>
          <View style={styles.articleGrid}>
            {featuredArticles.slice(0, 2).map(article => (
              <BlogListItem key={`home-${article.id}`} article={article} />
            ))}
          </View>
          <Link href="/blog">
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed ? styles.secondaryButtonActive : undefined]}>
              <Text style={styles.secondaryButtonText}>Explore All</Text>
            </Pressable>
          </Link>
        </View>
      ),
    },
    {
      id: 'zero-canon',
      enabled: true,
      title: 'Zero Canon',
      subtitle: 'The living truth',
      content: (
        <View style={styles.satelliteCard}>
          <Text style={styles.satelliteTitle}>Zero Canon</Text>
          <Text style={styles.satelliteDescription}>
            The living truth of Zero, Energy, and the Nature of Existence
          </Text>
          <Link href="/zero">
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed ? styles.secondaryButtonActive : undefined]}>
              <Text style={styles.secondaryButtonText}>Enter the Canon</Text>
            </Pressable>
          </Link>
        </View>
      ),
    },
  ].filter(satellite => satellite.enabled);

  return (
    <View style={styles.container}>
      {/* 3D Orbital System */}
      <View style={styles.orbitalSystem}>
        {/* Central Hub */}
        <Animated.View 
          style={[
            styles.centralHub,
            {
              opacity: centralHubOpacity,
              transform: [
                { scale: centralHubScale },
                { perspective: 1000 },
                { rotateX: '5deg' },
              ],
            }
          ]}
        >
          <View style={styles.energyField} />
          <View style={styles.centralCore}>
            <Text style={styles.centralEyebrow}>Enterprise Architect</Text>
            <Text style={styles.centralTitle}>{metadata.defaultTitle}</Text>
            <Text style={styles.centralSubtitle}>{metadata.description}</Text>
            <Text style={styles.centralMeta}>{`Operating on ${runtime.platform.toUpperCase()} • ${runtime.locale}`}</Text>
          </View>
        </Animated.View>

        {/* Orbital Satellites */}
        {orbitalSatellites.map((satellite, index) => (
          <Animated.View
            key={satellite.id}
            style={[
              styles.satellite,
              getSatelliteTransform(index, orbitalSatellites.length),
            ]}
          >
            <View style={styles.connectionBeam} />
            <View style={styles.satelliteContainer}>
              <Text style={styles.satelliteLabel}>{satellite.subtitle}</Text>
              {satellite.content}
            </View>
          </Animated.View>
        ))}

        {/* Orbital Ring */}
        <Animated.View 
          style={[
            styles.orbitalRing,
            { transform: [{ rotate: orbitalAngle }] }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    overflow: 'hidden',
  },
  orbitalSystem: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: screenHeight,
  },
  centralHub: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 320,
    height: 320,
    marginTop: -160,
    marginLeft: -160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  energyField: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 400,
    backgroundColor: '#0ea5e9',
    opacity: 0.1,
    shadowColor: '#0ea5e9',
    shadowOpacity: 0.3,
    shadowRadius: 60,
    shadowOffset: { width: 0, height: 0 },
  },
  centralCore: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(17,28,61,0.95)',
    borderWidth: 3,
    borderColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.4,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  centralEyebrow: {
    color: '#38BDF8',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  centralTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  centralSubtitle: {
    fontSize: 16,
    color: '#CBD5F5',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
  centralMeta: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    fontWeight: '500',
  },
  satellite: {
    position: 'absolute',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionBeam: {
    position: 'absolute',
    width: 2,
    height: 120,
    backgroundColor: 'rgba(56,189,248,0.4)',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  satelliteContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(2,6,23,0.9)',
    borderWidth: 2,
    borderColor: 'rgba(56,189,248,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
  },
  satelliteLabel: {
    color: '#38BDF8',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  satelliteCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  satelliteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
  },
  satelliteDescription: {
    fontSize: 12,
    color: '#CBD5F5',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 16,
  },
  benefitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 4,
  },
  benefitChip: {
    backgroundColor: 'rgba(56,189,248,0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.4)',
  },
  benefitChipText: {
    fontSize: 10,
    color: '#38BDF8',
    fontWeight: '600',
  },
  articleGrid: {
    gap: 8,
    marginBottom: 12,
  },
  orbitalRing: {
    position: 'absolute',
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: screenWidth * 0.4,
    borderWidth: 1,
    borderColor: 'rgba(56,189,248,0.1)',
    top: '50%',
    left: '50%',
    marginTop: -screenWidth * 0.4,
    marginLeft: -screenWidth * 0.4,
  },
  voiceMeta: {
    fontSize: 10,
    color: '#94A3B8',
    letterSpacing: 1,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#38BDF8',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#67E8F9',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButtonActive: {
    backgroundColor: '#22d3ee',
    borderColor: '#a5f3fc',
    transform: [{ scale: 0.95 }],
  },
  primaryButtonText: {
    fontWeight: '700',
    color: '#0B1120',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#38BDF8',
    alignItems: 'center',
    backgroundColor: 'transparent',
    shadowColor: '#38BDF8',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  secondaryButtonActive: {
    backgroundColor: 'rgba(56,189,248,0.15)',
    borderColor: '#67E8F9',
    transform: [{ scale: 0.95 }],
  },
  secondaryButtonText: {
    color: '#38BDF8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
});
