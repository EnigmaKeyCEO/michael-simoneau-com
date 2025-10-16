import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

type OrbitAlignment = "left" | "right" | "center";

export type ThoughtOrbitSection = {
  id: string;
  content: ReactNode;
  alignment?: OrbitAlignment;
  tone?: "hero" | "surface";
};

export type ThoughtOrbitLayoutProps = {
  sections: ThoughtOrbitSection[];
};

export const ThoughtOrbitLayout = ({ sections }: ThoughtOrbitLayoutProps) => {
  const { height } = useWindowDimensions();
  const [centers, setCenters] = useState<number[]>(() =>
    sections.map(() => Number.NaN),
  );
  const [scrollOffset, setScrollOffset] = useState(0);

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
      setScrollOffset(event.nativeEvent.contentOffset.y);
    },
    [],
  );

  const viewportCenter = scrollOffset + height / 2;

  const renderedSections = useMemo(
    () =>
      sections.map((section, index) => {
        const center = centers[index];
        const hasLayout = Number.isFinite(center);
        const baseDistance = hasLayout
          ? center - viewportCenter
          : Number.POSITIVE_INFINITY;
        const normalized = hasLayout
          ? baseDistance / Math.max(height * 0.75, 1)
          : 0;
        const gaussianWeight = hasLayout
          ? Math.exp(-normalized * normalized)
          : 0;

        const alignment: OrbitAlignment = section.alignment ?? "center";
        const directionOffset =
          alignment === "left" ? -48 : alignment === "right" ? 48 : 0;
        const translateX = directionOffset * (1 - gaussianWeight);
        const scale = 0.92 + gaussianWeight * 0.08;
        const opacity = 0.72 + gaussianWeight * 0.28;
        const elevation = 1 + gaussianWeight * 5;

        const wrapperAlignmentStyle =
          alignment === "left"
            ? styles.alignStart
            : alignment === "right"
              ? styles.alignEnd
              : styles.alignCenter;

        const bubbleTone =
          section.tone === "hero" ? styles.heroTone : styles.surfaceTone;

        return (
          <View
            key={section.id}
            style={[styles.sectionWrapper, wrapperAlignmentStyle]}
            onLayout={registerSection(index)}
          >
            <View
              style={[
                styles.sectionBubble,
                bubbleTone,
                {
                  transform: [{ translateX }, { scale }],
                  opacity,
                  shadowOpacity: 0.25 * gaussianWeight,
                  shadowRadius: 24,
                  shadowOffset: { width: 0, height: 12 * gaussianWeight },
                  elevation,
                },
              ]}
            >
              {section.content}
            </View>
          </View>
        );
      }),
    [centers, height, registerSection, sections, viewportCenter],
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
    paddingVertical: 40,
    backgroundColor: "#0B1120",
    gap: 48,
    rowGap: 48,
  },
  sectionWrapper: {
    width: "100%",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  alignCenter: {
    alignItems: "center",
  },
  sectionBubble: {
    maxWidth: 760,
    width: "100%",
    borderRadius: 36,
    padding: 32,
    borderWidth: 1,
    borderColor: "#1E293B",
    shadowColor: "#0F172A",
  },
  heroTone: {
    backgroundColor: "#111C3D",
  },
  surfaceTone: {
    backgroundColor: "#020617",
  },
});
