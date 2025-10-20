import { useMemo } from 'react';
import type { ThoughtOrbitSection, ThoughtOrbitSubsection } from './ThoughtOrbitLayout';
import type { ScrapedContent } from '../data/sitemapContent';
import { SCRAPED_CONTENT } from '../data/sitemapContent';
import { parseSitemapContentBlocks } from './sitemapContentParsing';
import type { SitemapContentBlock } from './sitemapContentParsing';
import { SitemapSubsectionCard } from './SitemapSubsectionCard';

type SitemapGroup = {
  base: ScrapedContent;
  fragments: ScrapedContent[];
};

const alignments: ThoughtOrbitSection['alignment'][] = ['left', 'center', 'right'];

type BlockCluster = {
  id: string;
  title?: string;
  blocks: SitemapContentBlock[];
};

const formatSegmentLabel = (segment: string) => {
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const getUrlSegments = (url: string) => {
  try {
    const { pathname } = new URL(url);
    return pathname
      .split('/')
      .map((segment) => segment.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
};

const createBreadcrumb = (url: string, fallback: string) => {
  const segments = getUrlSegments(url).map(formatSegmentLabel);

  if (segments.length === 0) {
    return fallback;
  }

  return segments.join(' / ');
};

const clusterBlocksByHeading = (blocks: SitemapContentBlock[], baseId: string): BlockCluster[] => {
  if (blocks.length === 0) {
    return [];
  }

  const clusters: BlockCluster[] = [];
  let current: SitemapContentBlock[] = [];
  let currentTitle: string | undefined;
  let clusterIndex = 0;

  blocks.forEach((block) => {
    if (block.type === 'heading' && block.level <= 2) {
      if (current.length > 0) {
        clusters.push({
          id: `${baseId}::cluster-${clusterIndex}`,
          title: currentTitle,
          blocks: current,
        });
        clusterIndex += 1;
        current = [];
      }

      currentTitle = block.text;
    }

    current.push(block);
  });

  if (current.length > 0) {
    clusters.push({
      id: `${baseId}::cluster-${clusterIndex}`,
      title: currentTitle,
      blocks: current,
    });
  }

  if (clusters.length === 0) {
    return [
      {
        id: `${baseId}::cluster-fallback`,
        title: undefined,
        blocks,
      },
    ];
  }

  return clusters;
};

const createBaseSubsections = (
  group: SitemapGroup,
  sectionTone: ThoughtOrbitSection['tone'],
): ThoughtOrbitSubsection[] => {
  const baseBlocks = parseSitemapContentBlocks(group.base.content);
  const clusters = clusterBlocksByHeading(baseBlocks, group.base.url);
  const breadcrumb = createBreadcrumb(group.base.url, 'Root Surface');

  return clusters.map((cluster, index) => {
    const accent = index === 0 ? 'primary' : 'secondary';
    const tone = index === 0 ? sectionTone : 'surface';
    const subtitle = cluster.title ? `${breadcrumb} • ${cluster.title}` : breadcrumb;

    return {
      id: cluster.id,
      tone,
      content: (
        <SitemapSubsectionCard
          title={group.base.title}
          subtitle={subtitle}
          accent={accent}
          blocks={cluster.blocks}
        />
      ),
    };
  });
};

const createFragmentSubsections = (group: SitemapGroup): ThoughtOrbitSubsection[] =>
  group.fragments.flatMap((fragment, index) => {
    const fragmentBlocks = parseSitemapContentBlocks(fragment.content);
    const clusters = clusterBlocksByHeading(fragmentBlocks, `${fragment.url}::fragment-${index}`);
    const fragmentLabel = fragment.fragment
      ? `${fragment.baseUrl}${fragment.fragment}`
      : fragment.url;

    return clusters.map((cluster, clusterIndex) => ({
      id: `${cluster.id}-${clusterIndex}`,
      tone: 'surface',
      content: (
        <SitemapSubsectionCard
          title={fragment.title}
          subtitle={cluster.title ? `${fragmentLabel} • ${cluster.title}` : fragmentLabel}
          accent="fragment"
          blocks={cluster.blocks}
        />
      ),
    }));
  });

export const useSitemapSections = (): ThoughtOrbitSection[] => {
  return useMemo(() => {
    const groups = new Map<string, SitemapGroup>();

    SCRAPED_CONTENT.forEach((record) => {
      const group = groups.get(record.baseUrl) ?? { base: record, fragments: [] };
      if (!groups.has(record.baseUrl)) {
        groups.set(record.baseUrl, group);
      }

      if (record.fragment) {
        group.fragments.push(record);
      } else {
        group.base = record;
      }
    });

    const orderedGroups = Array.from(groups.values()).sort((a, b) =>
      a.base.url.localeCompare(b.base.url),
    );

    return orderedGroups.map<ThoughtOrbitSection>((group, index) => {
      const sectionTone: ThoughtOrbitSection['tone'] = index % 5 === 0 ? 'hero' : 'surface';
      const baseSubsections = createBaseSubsections(group, sectionTone);
      const fragmentSubsections = createFragmentSubsections(group);

      return {
        id: group.base.url,
        title: group.base.title,
        subtitle: group.base.url,
        alignment: alignments[index % alignments.length],
        tone: sectionTone,
        subsections: [...baseSubsections, ...fragmentSubsections],
      };
    });
  }, []);
};
