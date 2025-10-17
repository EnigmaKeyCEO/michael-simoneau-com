import { StyleSheet, Text, View } from 'react-native';
import type {
  FoundationFeatureConfig,
  FoundationMetadata,
  FoundationRuntime,
} from '../../../foundation';
import { AmebaSurface } from '../../../ui/surfaces/AmebaSurface';
import { useThoughtOrbitFocus } from './ThoughtOrbitFocusContext';

type NeuralTelemetryPanelProps = {
  metadata: FoundationMetadata;
  runtime: FoundationRuntime;
  voiceFeature: FoundationFeatureConfig['voiceAssistant'];
  cryptoFeature: FoundationFeatureConfig['cryptoFabricLaunch'];
};

export const NeuralTelemetryPanel = ({
  metadata,
  runtime,
  voiceFeature,
  cryptoFeature,
}: NeuralTelemetryPanelProps) => {
  const { focus } = useThoughtOrbitFocus();
  const haloOpacity = 0.2 + focus * 0.5;

  const voiceState = voiceFeature.enabled ? 'LISTENING' : 'STANDBY';
  const voiceHint = voiceFeature.messages[0]
    ? voiceFeature.messages[0]
    : 'Voice assistant spins up when enabled.';

  const cryptoState = cryptoFeature.enabled ? cryptoFeature.highlightLabel : 'RESEARCH MODE';
  const cryptoHint = cryptoFeature.description;

  return (
    <AmebaSurface tone="secondary" style={styles.surface} contentStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Neural telemetry</Text>
        <Text style={styles.identity}>{metadata.defaultTitle}</Text>
        <Text style={styles.title}>Operating system of the future</Text>
        <Text style={styles.subtitle}>An exploration through a digitized human mind.</Text>
      </View>
      <View style={styles.metricsGrid}>
        <View style={[styles.metric, styles.metricPrimary]}>
          <Text style={styles.metricLabel}>Focus level</Text>
          <Text style={styles.metricValue}>{(focus * 100).toFixed(0)}%</Text>
          <Text style={styles.metricHint}>Adaptive attention across the command deck.</Text>
        </View>
        <View style={[styles.metric, styles.metricSecondary]}>
          <Text style={styles.metricLabel}>Surface</Text>
          <Text style={styles.metricValue}>{runtime.platform.toUpperCase()}</Text>
          <Text style={styles.metricHint}>{`Locale ${runtime.locale} • ${runtime.timezone}`}</Text>
        </View>
        <View style={[styles.metric, styles.metricTertiary]}>
          <Text style={styles.metricLabel}>Voice link</Text>
          <Text style={styles.metricValue}>{voiceState}</Text>
          <Text style={styles.metricHint}>{voiceHint}</Text>
        </View>
        <View style={[styles.metric, styles.metricQuaternary]}>
          <Text style={styles.metricLabel}>Crypto fabric</Text>
          <Text style={styles.metricValue}>{cryptoState}</Text>
          <Text style={styles.metricHint}>{cryptoHint}</Text>
        </View>
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.halo,
          {
            opacity: haloOpacity,
          },
        ]}
      />
      <View pointerEvents="none" style={styles.gridOverlay} />
      <View pointerEvents="none" style={styles.cornerAccent} />
    </AmebaSurface>
  );
};

const styles = StyleSheet.create({
  surface: {
    overflow: 'hidden',
  },
  content: {
    gap: 24,
    position: 'relative',
  },
  header: {
    gap: 8,
  },
  eyebrow: {
    color: '#22D3EE',
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  identity: {
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(148, 163, 184, 0.85)',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: '#CBD5F5',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metric: {
    flexGrow: 1,
    minWidth: 160,
    borderRadius: 28,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    gap: 8,
    borderColor: 'rgba(148, 163, 184, 0.28)',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  metricPrimary: {
    borderColor: 'rgba(56, 189, 248, 0.32)',
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
  },
  metricSecondary: {
    borderColor: 'rgba(45, 212, 191, 0.28)',
    backgroundColor: 'rgba(15, 118, 110, 0.18)',
  },
  metricTertiary: {
    borderColor: 'rgba(244, 114, 182, 0.28)',
    backgroundColor: 'rgba(131, 24, 67, 0.18)',
  },
  metricQuaternary: {
    borderColor: 'rgba(165, 180, 252, 0.28)',
    backgroundColor: 'rgba(67, 56, 202, 0.2)',
  },
  metricLabel: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#E0F2FE',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  metricHint: {
    fontSize: 13,
    lineHeight: 18,
    color: '#94A3B8',
  },
  halo: {
    position: 'absolute',
    top: -160,
    right: -140,
    width: 360,
    height: 360,
    borderRadius: 220,
    backgroundColor: 'rgba(56, 189, 248, 0.26)',
  },
  gridOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.14)',
    opacity: 0.5,
  },
  cornerAccent: {
    position: 'absolute',
    left: 24,
    bottom: 24,
    height: 8,
    width: 72,
    borderRadius: 999,
    backgroundColor: 'rgba(56, 189, 248, 0.6)',
  },
});
