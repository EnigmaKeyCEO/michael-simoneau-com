import { useMemo } from "react";
import {
  useFoundationBoundary,
  useFoundationFeature,
  useFoundationMetadata,
  useFoundationPageView,
  useFoundationRuntime,
} from "../../../foundation";
import { useFeaturedBlogArticles } from "../../blog/hooks/useBlogArticles";
import { CryptoFabricSpotlight } from "../components/CryptoFabricSpotlight";
import { FeaturedBriefs } from "../components/FeaturedBriefs";
import { HomeHero } from "../components/HomeHero";
import { ThoughtOrbitLayout } from "../components/ThoughtOrbitLayout";
import type { ThoughtOrbitSection } from "../components/ThoughtOrbitLayout";
import { VoiceInsightsBubble } from "../components/VoiceInsightsBubble";

export const HomeScreen = () => {
  const metadata = useFoundationMetadata();
  const runtime = useFoundationRuntime();
  const cryptoFabricFeature = useFoundationFeature("cryptoFabricLaunch");
  const voiceAssistantFeature = useFoundationFeature("voiceAssistant");
  const featuredArticles = useFeaturedBlogArticles();
  const boundary = useMemo(
    () => ({
      id: "home",
      label: "Mission Control",
      description:
        "Entry deck for Michael Simoneau with live runtime signals and featured strategies.",
      href: "/",
    }),
    [],
  );

  useFoundationBoundary(boundary);
  useFoundationPageView(
    "page:view:home",
    {
      featuredArticleCount: featuredArticles.length,
      cryptoFabricEnabled: cryptoFabricFeature.enabled,
      voiceAssistantEnabled: voiceAssistantFeature.enabled,
    },
    {
      deps: [
        featuredArticles.length,
        cryptoFabricFeature.enabled,
        voiceAssistantFeature.enabled,
      ],
    },
  );

  const sections = useMemo<ThoughtOrbitSection[]>(() => {
    const orbitSections: ThoughtOrbitSection[] = [
      {
        id: "hero",
        content: <HomeHero metadata={metadata} runtime={runtime} />,
        alignment: "center" as const,
        tone: "hero" as const,
      },
    ];

    if (cryptoFabricFeature.enabled) {
      orbitSections.push({
        id: "crypto-fabric",
        content: <CryptoFabricSpotlight feature={cryptoFabricFeature} />,
        alignment: "left" as const,
        tone: "surface" as const,
      });
    }

    orbitSections.push({
      id: "voice-assistant",
      content: <VoiceInsightsBubble feature={voiceAssistantFeature} />,
      alignment: "right" as const,
      tone: "surface" as const,
    });

    orbitSections.push({
      id: "featured-briefs",
      content: <FeaturedBriefs articles={featuredArticles} />,
      alignment: "left" as const,
      tone: "surface" as const,
    });

    return orbitSections;
  }, [
    cryptoFabricFeature,
    featuredArticles,
    metadata,
    runtime,
    voiceAssistantFeature,
  ]);

  return <ThoughtOrbitLayout sections={sections} />;
};
