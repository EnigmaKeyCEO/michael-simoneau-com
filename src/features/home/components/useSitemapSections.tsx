import { useMemo } from 'react';
import type { ThoughtOrbitSection, ThoughtOrbitSubsection } from './ThoughtOrbitLayout';
import type { ScrapedContent } from '../data/sitemapContent';
import { SCRAPED_CONTENT } from '../data/sitemapContent';
import { parseSitemapContentBlocks } from './sitemapContentParsing';
import { SitemapSubsectionCard } from './SitemapSubsectionCard';

type SitemapGroup = {
  base: ScrapedContent;
  fragments: ScrapedContent[];
};

const alignments: ThoughtOrbitSection['alignment'][] = ['left', 'center', 'right'];

const chunkBlocks = <T,>(items: T[], chunkSize: number): T[][] => {
  if (chunkSize <= 0) {
    return [items];
  }

  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
};

const createBaseSubsections = (
  group: SitemapGroup,
  sectionTone: ThoughtOrbitSection['tone'],
): ThoughtOrbitSubsection[] => {
  const baseBlocks = parseSitemapContentBlocks(group.base.content);
  const chunks = chunkBlocks(baseBlocks, baseBlocks.length > 6 ? 3 : 2);

  return chunks.map((blocks, index) => {
    const accent = index === 0 ? 'primary' : 'secondary';
    const tone = index === 0 ? sectionTone : 'surface';
    const subtitle = index === 0 ? group.base.url : `Continuum ${index + 1}`;

    return {
      id: `${group.base.url}::base-${index}`,
      tone,
      content: (
        <SitemapSubsectionCard
          title={group.base.title}
          subtitle={subtitle}
          accent={accent}
          blocks={blocks}
        />
      ),
    };
  });
};

const createFragmentSubsections = (group: SitemapGroup): ThoughtOrbitSubsection[] =>
  group.fragments.map((fragment, index) => {
    const fragmentBlocks = parseSitemapContentBlocks(fragment.content).slice(0, 4);
    const subtitle = fragment.fragment ? `${fragment.baseUrl}${fragment.fragment}` : fragment.url;

    return {
      id: `${fragment.url}::fragment-${index}`,
      tone: 'surface',
      content: (
        <SitemapSubsectionCard
          title={fragment.title}
          subtitle={subtitle}
          accent="fragment"
          blocks={fragmentBlocks}
        />
      ),
    };
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
