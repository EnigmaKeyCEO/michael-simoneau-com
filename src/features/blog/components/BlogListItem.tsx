import { Link } from 'expo-router';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { AmebaSurface } from '../../../ui/surfaces/AmebaSurface';
import { useInteractiveScale } from '../../../ui/animation/useInteractiveScale';
import type { BlogArticleSummary } from '../types';

interface BlogListItemProps {
  article: BlogArticleSummary;
}

export const BlogListItem = ({ article }: BlogListItemProps) => {
  const { animatedStyle, handlePressIn, handlePressOut } = useInteractiveScale({
    pressedScale: 0.96,
  });

  return (
    <Link href={`/blog/${article.id}`} asChild>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.pressable}>
        <Animated.View style={[styles.motion, animatedStyle]}>
          <AmebaSurface
            tone={article.featured ? 'secondary' : 'primary'}
            contentStyle={styles.cardContent}
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
          </AmebaSurface>
        </Animated.View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
  },
  motion: {
    width: '100%',
  },
  cardContent: {
    gap: 12,
    paddingVertical: 20,
    paddingHorizontal: 22,
    backgroundColor: 'transparent',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#38BDF8',
  },
  readTime: {
    fontSize: 13,
    color: '#94A3B8',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 26,
  },
  excerpt: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CBD5F5',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagPill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(56, 189, 248, 0.16)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E0F2FE',
  },
});
