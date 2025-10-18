import {
  type ElementRef,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ThoughtOrbitField } from './ThoughtOrbitField';
import { ThoughtOrbitFocusProvider } from './ThoughtOrbitFocusContext';
import type {
  OrbitAlignment,
  ThoughtOrbitSectionDynamic,
  ThoughtOrbitSubsectionDynamic,
  ThoughtOrbitTone,
} from './ThoughtOrbitTypes';
import { useReducedMotion } from '../../../ui/animation/useReducedMotion';

export type ThoughtOrbitSubsection = {
  id: string;
  content: ReactNode;
  alignment?: OrbitAlignment;
  tone?: ThoughtOrbitTone;
};

export type ThoughtOrbitSection = {
  id: string;
  title?: string;
  subtitle?: string;
  subsections: ThoughtOrbitSubsection[];
  alignment?: OrbitAlignment;
  tone?: ThoughtOrbitTone;
};

type SectionVisualState = {
  alignment: OrbitAlignment;
  focus: number;
  gaussianWeight: number;
  normalized: number;
  tone: ThoughtOrbitTone;
};

type SubsectionVisualState = {
  focus: number;
  normalized: number;
  gaussianWeight: number;
  tone: ThoughtOrbitTone;
  alignment: OrbitAlignment;
};

type LayoutMetrics = {
  cardWidth: number;
  itemWidth: number;
  trackGap: number;
  trackPadding: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export const ThoughtOrbitLayout = ({ sections }: { sections: ThoughtOrbitSection[] }) => {
  const { height, width } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const scrollRaf = useRef<number | null>(null);
  const horizontalRafs = useRef<Array<number | null>>([]);
  type ScrollViewHandle = ElementRef<typeof ScrollView>;
  const verticalScrollRef = useRef<ScrollViewHandle | null>(null);
  const horizontalRefs = useRef<Array<ScrollViewHandle | null>>([]);

  const layoutMetrics = useMemo<LayoutMetrics>(() => {
    const safeWidth = Math.max(width, 1);
    const cardWidth = Math.min(safeWidth - 80, 860);
    const trackGap = safeWidth > 1200 ? 44 : safeWidth > 900 ? 36 : safeWidth > 640 ? 28 : 22;
    const itemWidth = Math.max(cardWidth + trackGap, cardWidth + 16);
    const trackPadding = Math.max((safeWidth - cardWidth) / 2 - trackGap / 2, 18);

    return { cardWidth, itemWidth, trackGap, trackPadding };
  }, [width]);

  const [sectionCenters, setSectionCenters] = useState<number[]>(() =>
    sections.map(() => Number.NaN),
  );
  const [scrollOffset, setScrollOffset] = useState(0);
  const [subsectionOffsets, setSubsectionOffsets] = useState<number[]>(() =>
    sections.map(() => layoutMetrics.trackPadding),
  );
  const [sectionSubIndices, setSectionSubIndices] = useState<number[]>(() => sections.map(() => 0));
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    setSectionCenters(sections.map(() => Number.NaN));
    setActiveSectionIndex(0);
    setSectionSubIndices(sections.map(() => 0));
    setSubsectionOffsets(sections.map(() => layoutMetrics.trackPadding));
    horizontalRefs.current = [];
    horizontalRafs.current = sections.map(() => null);
  }, [layoutMetrics.trackPadding, sections]);

  useEffect(() => {
    return () => {
      if (scrollRaf.current !== null) {
        cancelAnimationFrame(scrollRaf.current);
      }
      horizontalRafs.current.forEach((raf) => {
        if (raf !== null) {
          cancelAnimationFrame(raf);
        }
      });
    };
  }, []);

  const registerSection = useCallback(
    (index: number) => (event: LayoutChangeEvent) => {
      const { y, height: sectionHeight } = event.nativeEvent.layout;
      setSectionCenters((previous) => {
        const next = [...previous];
        next[index] = y + sectionHeight / 2;
        return next;
      });
    },
    [],
  );

  const handleVerticalScroll = useCallback(
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

  const handleHorizontalScroll = useCallback(
    (sectionIndex: number) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextOffset = event.nativeEvent.contentOffset.x;

      if (reduceMotion) {
        setSubsectionOffsets((previous) => {
          const next = [...previous];
          next[sectionIndex] = nextOffset;
          return next;
        });
        return;
      }

      const rafs = horizontalRafs.current;
      if (rafs[sectionIndex] !== null) {
        cancelAnimationFrame(rafs[sectionIndex]!);
      }

      rafs[sectionIndex] = requestAnimationFrame(() => {
        setSubsectionOffsets((previous) => {
          const next = [...previous];
          next[sectionIndex] = nextOffset;
          return next;
        });
      });
    },
    [reduceMotion],
  );

  const viewportCenter = scrollOffset + height / 2;

  const sectionVisualStates = useMemo<SectionVisualState[]>(
    () =>
      sections.map((section, index) => {
        const center = sectionCenters[index];
        const hasLayout = Number.isFinite(center);
        const baseDistance = hasLayout ? center - viewportCenter : Number.POSITIVE_INFINITY;
        const normalized = hasLayout ? baseDistance / Math.max(height * 0.75, 1) : 0;
        const gaussianWeight = hasLayout ? Math.exp(-normalized * normalized) : 0;
        const alignment: OrbitAlignment = section.alignment ?? 'center';
        const tone: ThoughtOrbitTone = section.tone ?? 'surface';
        const focus = reduceMotion
          ? hasLayout
            ? Math.max(0.4, 1 - Math.min(1, Math.abs(normalized)))
            : 0
          : Math.min(1, gaussianWeight * 1.12);

        return {
          alignment,
          focus,
          gaussianWeight,
          normalized,
          tone,
        };
      }),
    [height, reduceMotion, sectionCenters, sections, viewportCenter],
  );

  const subsectionVisualStates = useMemo<SubsectionVisualState[][]>(
    () =>
      sections.map((section, sectionIndex) => {
        const sectionVisual = sectionVisualStates[sectionIndex];
        if (!sectionVisual) {
          return [];
        }

        const offset = subsectionOffsets[sectionIndex] ?? layoutMetrics.trackPadding;
        const paddedOffset = Math.max(0, offset - layoutMetrics.trackPadding);
        const normalizedOffset = paddedOffset / Math.max(layoutMetrics.itemWidth, 1);
        const activeIndex = sectionSubIndices[sectionIndex] ?? 0;

        return section.subsections.map((subsection, subsectionIndex) => {
          const relative = normalizedOffset - subsectionIndex;
          const gaussian = reduceMotion
            ? subsectionIndex === activeIndex
              ? 1
              : 0.35
            : Math.exp(-(relative * relative) * 1.45);
          const focus = Math.min(1, sectionVisual.focus * gaussian);
          const tone: ThoughtOrbitTone = subsection.tone ?? sectionVisual.tone;
          const alignment: OrbitAlignment = subsection.alignment ?? sectionVisual.alignment;
          return {
            focus,
            normalized: relative,
            gaussianWeight: gaussian,
            tone,
            alignment,
          };
        });
      }),
    [
      layoutMetrics.itemWidth,
      layoutMetrics.trackPadding,
      reduceMotion,
      sectionSubIndices,
      sectionVisualStates,
      sections,
      subsectionOffsets,
    ],
  );

  const fieldDynamics = useMemo<ThoughtOrbitSectionDynamic[]>(() => {
    return sections.map<ThoughtOrbitSectionDynamic>((section, sectionIndex) => {
      const sectionVisual = sectionVisualStates[sectionIndex];
      const subsectionStates = subsectionVisualStates[sectionIndex] ?? [];
      const alignment: OrbitAlignment = sectionVisual?.alignment ?? section.alignment ?? 'center';
      const tone: ThoughtOrbitTone = sectionVisual?.tone ?? section.tone ?? 'surface';

      return {
        id: section.id,
        focus: sectionVisual?.focus ?? 0,
        distance: Math.abs(sectionVisual?.normalized ?? 0),
        alignment,
        tone,
        subsections: section.subsections.map<ThoughtOrbitSubsectionDynamic>(
          (subsection, subsectionIndex) => {
            const state = subsectionStates[subsectionIndex];
            return {
              id: subsection.id,
              focus: state?.focus ?? 0,
              offset: state?.normalized ?? 0,
              spread: state?.gaussianWeight ?? 0,
              tone: state?.tone ?? tone,
            };
          },
        ),
      };
    });
  }, [sectionVisualStates, sections, subsectionVisualStates]);

  const scrollToSection = useCallback(
    (sectionIndex: number, options?: { animated?: boolean }) => {
      if (!verticalScrollRef.current) {
        return;
      }

      const animated = options?.animated ?? !reduceMotion;
      const targetOffset = clamp(sectionIndex, 0, sections.length - 1) * height;
      verticalScrollRef.current.scrollTo({ y: targetOffset, animated });
    },
    [height, reduceMotion, sections.length],
  );

  const updateHorizontalIndex = useCallback(
    (sectionIndex: number, subsectionIndex: number, options?: { animated?: boolean }) => {
      const section = sections[sectionIndex];
      if (!section) {
        return;
      }

      const maxIndex = Math.max(section.subsections.length - 1, 0);
      const clampedIndex = clamp(subsectionIndex, 0, maxIndex);
      const animated = options?.animated ?? !reduceMotion;
      const targetOffset = clampedIndex * layoutMetrics.itemWidth;

      setSectionSubIndices((previous) => {
        const next = [...previous];
        next[sectionIndex] = clampedIndex;
        return next;
      });
      setSubsectionOffsets((previous) => {
        const next = [...previous];
        next[sectionIndex] = targetOffset;
        return next;
      });

      const scrollView = horizontalRefs.current[sectionIndex];
      if (scrollView) {
        scrollView.scrollTo({ x: targetOffset, animated });
      }
    },
    [layoutMetrics.itemWidth, reduceMotion, sections],
  );

  const handleHorizontalMomentumEnd = useCallback(
    (sectionIndex: number) => (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offset = event.nativeEvent.contentOffset.x;
      const paddedOffset = Math.max(0, offset - layoutMetrics.trackPadding);
      const rawIndex = paddedOffset / Math.max(layoutMetrics.itemWidth, 1);
      const clampedIndex = Math.round(rawIndex);

      updateHorizontalIndex(sectionIndex, clampedIndex);
    },
    [layoutMetrics.itemWidth, layoutMetrics.trackPadding, updateHorizontalIndex],
  );

  const handleVerticalMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const rawIndex = Math.round(offsetY / Math.max(height, 1));
      const clampedIndex = clamp(rawIndex, 0, sections.length - 1);
      const currentIndex = activeSectionIndex;

      if (clampedIndex > currentIndex) {
        const subIndex = sectionSubIndices[currentIndex] ?? 0;
        const subsectionCount = sections[currentIndex]?.subsections.length ?? 1;
        const lastIndex = Math.max(subsectionCount - 1, 0);

        if (subIndex < lastIndex) {
          scrollToSection(currentIndex, { animated: false });
          updateHorizontalIndex(currentIndex, subIndex + 1);
          return;
        }
      }

      if (clampedIndex < currentIndex) {
        const subIndex = sectionSubIndices[currentIndex] ?? 0;
        if (subIndex > 0) {
          scrollToSection(currentIndex, { animated: false });
          updateHorizontalIndex(currentIndex, subIndex - 1);
          return;
        }
      }

      setActiveSectionIndex(clampedIndex);

      if (clampedIndex > currentIndex) {
        updateHorizontalIndex(clampedIndex, 0, { animated: false });
      } else if (clampedIndex < currentIndex) {
        const targetSection = sections[clampedIndex];
        const lastSubIndex = Math.max(targetSection?.subsections.length ?? 1, 1) - 1;
        updateHorizontalIndex(clampedIndex, lastSubIndex, { animated: false });
      }
    },
    [
      activeSectionIndex,
      height,
      scrollToSection,
      sectionSubIndices,
      sections,
      updateHorizontalIndex,
    ],
  );

  const renderedSections = useMemo(() => {
    return sections.map((section, sectionIndex) => {
      const sectionVisual = sectionVisualStates[sectionIndex];
      const horizontalStates = subsectionVisualStates[sectionIndex] ?? [];
      const activeSubIndex = sectionSubIndices[sectionIndex] ?? 0;

      return (
        <View
          key={section.id}
          style={[styles.sectionPage, { height }]}
          onLayout={registerSection(sectionIndex)}
        >
          <View style={styles.sectionHeader}>
            {section.title ? (
              <Text style={styles.sectionTitle} numberOfLines={2}>
                {section.title}
              </Text>
            ) : null}
            {section.subtitle ? (
              <Text style={styles.sectionSubtitle} numberOfLines={1}>
                {section.subtitle}
              </Text>
            ) : null}
          </View>
          <ScrollView
            horizontal
            ref={(ref: ScrollViewHandle | null) => {
              horizontalRefs.current[sectionIndex] = ref;
            }}
            scrollEventThrottle={16}
            onScroll={handleHorizontalScroll(sectionIndex)}
            onMomentumScrollEnd={handleHorizontalMomentumEnd(sectionIndex)}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={layoutMetrics.itemWidth}
            contentContainerStyle={{
              paddingHorizontal: layoutMetrics.trackPadding,
            }}
          >
            {section.subsections.map((subsection, subsectionIndex) => {
              const visual = horizontalStates[subsectionIndex];
              const focus = visual?.focus ?? 0;
              const normalized = visual?.normalized ?? 1;
              const isActive = activeSubIndex === subsectionIndex;
              const baseScale = reduceMotion ? 1 : 0.84 + focus * 0.28;
              const translateY = reduceMotion ? 0 : (1 - focus) * 36;
              const opacity = reduceMotion
                ? Math.max(0.55, sectionVisual ? sectionVisual.focus : 0.5)
                : 0.34 + focus * 0.62;
              const shadowOpacity = reduceMotion ? 0.24 + focus * 0.2 : 0.18 + focus * 0.32;

              return (
                <View
                  key={subsection.id}
                  style={[styles.subsectionSlot, { width: layoutMetrics.itemWidth }]}
                >
                  <View
                    style={[
                      styles.subsectionCard,
                      {
                        width: layoutMetrics.cardWidth,
                        opacity,
                        shadowOpacity,
                        shadowRadius: 18 + focus * 28,
                        elevation: 4 + focus * 8,
                        transform: [{ translateY }, { scale: baseScale }],
                        borderColor: isActive
                          ? 'rgba(59, 130, 246, 0.44)'
                          : 'rgba(59, 130, 246, 0.2)',
                      },
                    ]}
                  >
                    <ThoughtOrbitFocusProvider
                      value={{
                        focus,
                        distance: Math.abs(normalized),
                      }}
                    >
                      {subsection.content}
                    </ThoughtOrbitFocusProvider>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.sectionIndicators}>
            {section.subsections.map((_, indicatorIndex) => {
              const visual = horizontalStates[indicatorIndex];
              const focus = visual?.focus ?? 0;
              const active = indicatorIndex === activeSubIndex;
              const indicatorScale = reduceMotion ? (active ? 1 : 0.7) : 0.6 + focus * 0.6;
              const indicatorOpacity = reduceMotion ? (active ? 0.9 : 0.4) : 0.22 + focus * 0.7;

              return (
                <View
                  key={`${section.id}-indicator-${indicatorIndex}`}
                  style={[
                    styles.indicatorDot,
                    {
                      opacity: indicatorOpacity,
                      transform: [{ scale: indicatorScale }],
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      );
    });
  }, [
    handleHorizontalMomentumEnd,
    handleHorizontalScroll,
    height,
    layoutMetrics.cardWidth,
    layoutMetrics.itemWidth,
    layoutMetrics.trackPadding,
    reduceMotion,
    registerSection,
    sectionSubIndices,
    sectionVisualStates,
    sections,
    subsectionVisualStates,
  ]);

  return (
    <View style={styles.scene}>
      {!reduceMotion ? <ThoughtOrbitField dynamics={fieldDynamics} /> : null}
      <ScrollView
        ref={verticalScrollRef}
        style={styles.scrollOverlay}
        pagingEnabled
        decelerationRate="fast"
        snapToInterval={Math.max(height, 1)}
        snapToAlignment="start"
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={handleVerticalScroll}
        onMomentumScrollEnd={handleVerticalMomentumEnd}
        showsVerticalScrollIndicator={false}
      >
        {renderedSections}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#00040F',
  },
  scrollOverlay: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  sectionPage: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 96,
    paddingBottom: 72,
    gap: 32,
  },
  sectionHeader: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#A5F3FC',
  },
  subsectionSlot: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subsectionCard: {
    borderWidth: 1,
    borderRadius: 32,
    shadowColor: '#2563EB',
    backgroundColor: 'rgba(4, 12, 28, 0.86)',
    overflow: 'hidden',
  },
  sectionIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: 8,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(59, 130, 246, 0.86)',
  },
});
