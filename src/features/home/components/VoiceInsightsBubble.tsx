import { StyleSheet, Text, View } from "react-native";
import type { FoundationFeatureConfig } from "../../../foundation";

export type VoiceInsightsBubbleProps = {
  feature: FoundationFeatureConfig["voiceAssistant"];
};

export const VoiceInsightsBubble = ({ feature }: VoiceInsightsBubbleProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Voice of the stack</Text>
      <View style={styles.voiceCard}>
        <Text style={styles.body}>{feature.messages.join(" • ")}</Text>
        <Text
          style={styles.meta}
        >{`Pitch ${feature.voice.pitch} • Rate ${feature.voice.rate}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  eyebrow: {
    color: "#38BDF8",
    fontSize: 12,
    letterSpacing: 3,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  voiceCard: {
    backgroundColor: "#111C3D",
    borderRadius: 28,
    padding: 24,
    gap: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#CBD5F5",
  },
  meta: {
    fontSize: 12,
    color: "#94A3B8",
    letterSpacing: 1,
  },
});
