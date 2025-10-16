import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import type { FoundationFeatureConfig } from "../../../foundation";

export type CryptoFabricSpotlightProps = {
  feature: FoundationFeatureConfig["cryptoFabricLaunch"];
};

export const CryptoFabricSpotlight = ({
  feature,
}: CryptoFabricSpotlightProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{feature.highlightLabel}</Text>
      <Text style={styles.title}>{feature.name}</Text>
      <Text style={styles.body}>{feature.description}</Text>
      <View style={styles.benefitList}>
        {feature.keyBenefits.map((benefit) => (
          <View key={benefit.title} style={styles.benefitItem}>
            <Text style={styles.benefitTitle}>{benefit.title}</Text>
            <Text style={styles.benefitCopy}>{benefit.description}</Text>
          </View>
        ))}
      </View>
      <Link href={feature.cta.href} asChild>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{feature.cta.label}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F8FAFC",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#CBD5F5",
  },
  benefitList: {
    gap: 12,
  },
  benefitItem: {
    backgroundColor: "#111C3D",
    borderRadius: 24,
    padding: 16,
    gap: 8,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#38BDF8",
  },
  benefitCopy: {
    fontSize: 14,
    lineHeight: 20,
    color: "#E2E8F0",
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#38BDF8",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontWeight: "700",
    color: "#0B1120",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
