import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFoundationAnalytics } from '../../../foundation';
import { BlogContentRenderer } from '../components/BlogContentRenderer';
import { useBlogArticle } from '../hooks/useBlogArticles';

export const BlogArticleScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const analytics = useFoundationAnalytics();
  const articleId = useMemo(() => (Array.isArray(id) ? id[0] : id), [id]);
  const article = useBlogArticle(articleId);

  useEffect(() => {
    if (!articleId) {
      return;
    }

    if (!article) {
      analytics.track({ type: 'blog:not-found', payload: { id: articleId }, timestamp: Date.now() });
      router.replace('/blog');
    }
  }, [analytics, article, articleId, router]);

  useEffect(() => {
    if (!article) {
      return;
    }

    analytics.track({ type: 'blog:view', payload: { id: article.id }, timestamp: Date.now() });
  }, [analytics, article]);

  if (!article) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.date}>{article.date}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.excerpt}>{article.excerpt}</Text>
        <Text style={styles.meta}>{`${article.author} • ${article.readTime}`}</Text>
      </View>

      <BlogContentRenderer blocks={article.content} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
    backgroundColor: '#FFFFFF',
  },
  hero: {
    gap: 12,
    backgroundColor: '#0F172A',
    padding: 24,
    borderRadius: 28,
  },
  date: {
    color: '#38BDF8',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 40,
  },
  excerpt: {
    fontSize: 18,
    lineHeight: 26,
    color: '#E2E8F0',
  },
  meta: {
    fontSize: 14,
    color: '#94A3B8',
  },
});
