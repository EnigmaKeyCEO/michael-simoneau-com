import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { ThoughtOrbitFocusProvider } from './ThoughtOrbitFocusContext';

type OrbitAlignment = 'left' | 'right' | 'center';

export type ThoughtOrbitSection = {
  id: string;
  content: ReactNode;
  alignment?: OrbitAlignment;
  tone?: 'hero' | 'surface';
};

export type ThoughtOrbitLayoutProps = {
  sections: ThoughtOrbitSection[];
};

export const ThoughtOrbitLayout = ({ sections }: ThoughtOrbitLayoutProps) => {
  const { height } = useWindowDimensions();
  const [centers, setCenters] = useState<number[]>(() => sections.map(() => Number.NaN));
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    setCenters(sections.map(() => Number.NaN));
  }, [sections]);

  useEffect(() => {
    return () => {
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
        scrollFrame.current = null;
      }
    };
  }, []);

  const registerSection = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { y, height: sectionHeight } = event.nativeEvent.layout;
      setCenters((previous) => {
        const next = [...previous];
        next[index] = y + sectionHeight / 2;
        return next;
      });
    },
    [],
  );

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextOffset = event.nativeEvent.contentOffset.y;

    if (scrollFrame.current !== null) {
      cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = requestAnimationFrame(() => {
      setScrollOffset(nextOffset);
      scrollFrame.current = null;
    });
  }, []);

  const viewportCenter = scrollOffset + height / 2;

  const renderedSections = useMemo(
    () =>
      sections.map((section, index) => {
        const center = centers[index];
        const hasLayout = Number.isFinite(center);
        const baseDistance = hasLayout ? center - viewportCenter : Number.POSITIVE_INFINITY;
        const normalized = hasLayout ? baseDistance / Math.max(height * 0.75, 1) : 0;
        const gaussianWeight = hasLayout ? Math.exp(-normalized * normalized) : 0;

        const alignment: OrbitAlignment = section.alignment ?? 'center';
        const directionOffset = alignment === 'left' ? -80 : alignment === 'right' ? 80 : 0;
        const orbitalCurve = 1 - gaussianWeight;
        const translateX = directionOffset * orbitalCurve * 0.6;
        const scale = 0.82 + gaussianWeight * 0.22;
        const zoom = 0.78 + gaussianWeight * 0.32;
        const opacity = 0.45 + gaussianWeight * 0.55;
        const elevation = 1 + gaussianWeight * 8;
        const bubbleRadius = 84 + gaussianWeight * 36;
        const verticalPadding = 22 + gaussianWeight * 16;
        const horizontalPadding = 24 + gaussianWeight * 24;
        const haloSize = 56 * gaussianWeight;
        const blurShadow = 16 + gaussianWeight * 32;
        const rotationDirection = alignment === 'left' ? -1 : alignment === 'right' ? 1 : 0;
        const backgroundColor =
          section.tone === 'hero'
            ? gaussianWeight > 0.6
              ? '#162A5C'
              : '#0F1B3D'
            : gaussianWeight > 0.6
              ? '#07142E'
              : '#010714';
        const borderColorOpacity = 0.18 + gaussianWeight * 0.28;
        const borderColor = `rgba(56, 189, 248, ${borderColorOpacity.toFixed(3)})`;

        const wrapperAlignmentStyle =
          alignment === 'left'
            ? styles.alignStart
            : alignment === 'right'
              ? styles.alignEnd
              : styles.alignCenter;

        const bubbleTone = section.tone === 'hero' ? styles.heroTone : styles.surfaceTone;

        return (
          <View
            key={section.id}
            style={[
              styles.sectionWrapper,
              wrapperAlignmentStyle,
              {
                minHeight: 220 * zoom,
                paddingVertical: 16 + (1 - gaussianWeight) * 10,
              },
            ]}
            onLayout={registerSection(index)}
          >
            <View
              style={[
                styles.sectionHalo,
                {
                  opacity: gaussianWeight,
                  shadowRadius: haloSize,
                  shadowOpacity: 0.6 * gaussianWeight,
                },
              ]}
            />
            <View
              style={[
                styles.sectionBubble,
                bubbleTone,
                {
                  transform: [
                    { perspective: 800 },
                    { translateX },
                    { scale },
                    {
                      rotateZ: `${rotationDirection * orbitalCurve * 0.2}rad`,
                    },
                  ],
                  opacity,
                  paddingVertical: verticalPadding,
                  paddingHorizontal: horizontalPadding,
                  borderRadius: bubbleRadius,
                  backgroundColor,
                  borderColor,
                  shadowOpacity: 0.15 + gaussianWeight * 0.4,
                  shadowRadius: blurShadow,
                  shadowOffset: { width: 0, height: 20 * gaussianWeight },
                  elevation,
                  maxWidth: gaussianWeight > 0.85 ? 960 : 760,
                },
              ]}
            >
              <ThoughtOrbitFocusProvider
                value={{
                  focus: gaussianWeight,
                  distance: Math.abs(normalized),
                }}
              >
                {section.content}
              </ThoughtOrbitFocusProvider>
            </View>
          </View>
        );
      }),
    [centers, height, registerSection, sections, viewportCenter],
  );

  return (
    <View style={styles.backdrop}>
      <View pointerEvents="none" style={styles.backdropGlow} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        {renderedSections}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    width: '100%',
    backgroundColor: '#020617',
  },
  backdropGlow: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.4,
    backgroundColor: '#0B1120',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#0B1120',
    gap: 48,
    rowGap: 48,
  },
  sectionWrapper: {
    width: '100%',
    position: 'relative',
  },
  sectionHalo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 240,
    height: 240,
    marginLeft: -120,
    marginTop: -120,
    borderRadius: 120,
    backgroundColor: 'rgba(14, 116, 224, 0.12)',
    shadowColor: '#38BDF8',
    pointerEvents: 'none',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  sectionBubble: {
    maxWidth: 760,
    width: '100%',
    borderRadius: 36,
    padding: 32,
    borderWidth: 1,
    borderColor: '#1E293B',
    shadowColor: '#0F172A',
    overflow: 'hidden',
  },
  heroTone: {
    backgroundColor: '#111C3D',
  },
  surfaceTone: {
    backgroundColor: '#020617',
  },
});
