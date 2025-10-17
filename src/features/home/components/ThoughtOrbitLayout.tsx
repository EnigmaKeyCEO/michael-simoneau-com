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
import { useReducedMotion } from '../../../ui/animation/useReducedMotion';

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
  const reduceMotion = useReducedMotion();
  const scrollRaf = useRef<number | null>(null);

  useEffect(() => {
    setCenters(sections.map(() => Number.NaN));
  }, [sections]);

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

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextOffset = event.nativeEvent.contentOffset.y;

      if (reduceMotion) {
        setScrollOffset(nextOffset);
        return;
      }

      if (scrollRaf.current !== null) {
        cancelAnimationFrame(scrollRaf.current);
      }

      scrollRaf.current = requestAnimationFrame(() => {
        setScrollOffset(nextOffset);
      });
    },
    [reduceMotion],
  );

  useEffect(() => {
    return () => {
      if (scrollRaf.current !== null) {
        cancelAnimationFrame(scrollRaf.current);
      }
    };
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
        const focus = reduceMotion ? Math.min(1, gaussianWeight + 0.2) : gaussianWeight;
        const directionOffset = alignment === 'left' ? -128 : alignment === 'right' ? 128 : 0;
        const orbitalCurve = reduceMotion ? 0 : (1 - gaussianWeight) ** 2.2;
        const translateX = reduceMotion ? 0 : directionOffset * orbitalCurve;
        const scale = reduceMotion ? 1 : 0.86 + gaussianWeight * 0.22;
        const zoom = reduceMotion ? 1 : 0.72 + gaussianWeight * 0.32;
        const opacity = reduceMotion ? 0.96 : 0.35 + gaussianWeight * 0.65;
        const elevation = reduceMotion ? 6 : 4 + gaussianWeight * 12;
        const bubbleRadius = 96 + focus * 36;
        const verticalPadding = 24 + focus * 18;
        const horizontalPadding = 28 + focus * 26;
        const haloSize = reduceMotion ? 24 : 56 * gaussianWeight;
        const blurShadow = reduceMotion ? 28 : 22 + gaussianWeight * 28;
        const rotationDirection = alignment === 'left' ? -1 : alignment === 'right' ? 1 : 0;
        const backgroundColor =
          section.tone === 'hero'
            ? focus > 0.6
              ? '#152C5C'
              : '#101F3F'
            : focus > 0.7
              ? '#071529'
              : '#020617';
        const borderColorOpacity = 0.16 + focus * 0.28;
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
                paddingVertical: 16 + (1 - focus) * 10,
              },
            ]}
            onLayout={registerSection(index)}
          >
            <View
              style={[
                styles.sectionHalo,
                {
                  opacity: focus,
                  shadowRadius: haloSize,
                  shadowOpacity: 0.45 * focus,
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
                      rotateZ: `${rotationDirection * orbitalCurve * 0.35}rad`,
                    },
                  ],
                  opacity,
                  paddingVertical: verticalPadding,
                  paddingHorizontal: horizontalPadding,
                  borderRadius: bubbleRadius,
                  backgroundColor,
                  borderColor,
                  shadowOpacity: 0.18 + focus * 0.35,
                  shadowRadius: blurShadow,
                  shadowOffset: { width: 0, height: 16 + focus * 12 },
                  elevation,
                  maxWidth: focus > 0.82 ? 960 : 820,
                },
              ]}
            >
              <ThoughtOrbitFocusProvider
                value={{
                  focus,
                  distance: Math.abs(normalized),
                }}
              >
                {section.content}
              </ThoughtOrbitFocusProvider>
            </View>
          </View>
        );
      }),
    [centers, height, reduceMotion, registerSection, sections, viewportCenter],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEventThrottle={16}
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
    >
      {renderedSections}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 52,
    paddingBottom: 120,
    backgroundColor: '#020617',
    gap: 56,
    rowGap: 56,
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
    backgroundColor: 'rgba(99, 102, 241, 0.16)',
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
