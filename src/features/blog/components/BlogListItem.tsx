import { Link } from 'expo-router';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import type { BlogArticleSummary } from '../types';

interface BlogListItemProps {
  article: BlogArticleSummary;
}

export const BlogListItem = ({ article }: BlogListItemProps) => {
  return (
    <Link href={`/blog/${article.id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          article.featured ? styles.featuredCard : undefined,
          pressed ? styles.cardPressed : undefined,
        ]}
      >
        <View style={styles.metaRow}>
          <Text style={styles.date}>{article.date}</Text>
          <Text style={styles.readTime}>{article.readTime}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.excerpt}>{article.excerpt}</Text>
        <View style={styles.tagRow}>
          {article.tags.map((tag) => (
            <View style={styles.tagPill} key={tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
    ...Platform.select({
      web: {
        boxShadow: '0 12px 24px rgba(15, 23, 42, 0.06)',
      },
      default: {
        shadowColor: '#0F172A',
        shadowOpacity: 0.06,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 12 },
      },
    }),
  },
  featuredCard: {
    borderColor: '#0EA5E9',
    ...Platform.select({
      web: {
        boxShadow: '0 16px 32px rgba(14, 165, 233, 0.18)',
      },
      default: {
        shadowOpacity: 0.12,
        shadowRadius: 32,
      },
    }),
  },
  cardPressed: {
    opacity: 0.9,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 14,
    color: '#0EA5E9',
    fontWeight: '600',
  },
  readTime: {
    fontSize: 14,
    color: '#475569',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  excerpt: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1F2937',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
});
