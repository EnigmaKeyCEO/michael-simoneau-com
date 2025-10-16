import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import type { BlogArticle } from "../../blog/types";
import { BlogListItem } from "../../blog/components/BlogListItem";

export type FeaturedBriefsProps = {
  articles: BlogArticle[];
};

export const FeaturedBriefs = ({ articles }: FeaturedBriefsProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Latest strategy briefs</Text>
      <View style={styles.grid}>
        {articles.map((article) => (
          <BlogListItem key={`home-${article.id}`} article={article} />
        ))}
      </View>
      <Link href="/blog" asChild>
        <View style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>
            Browse the briefing library
          </Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  eyebrow: {
    color: "#38BDF8",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  grid: {
    gap: 16,
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#38BDF8",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#38BDF8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
