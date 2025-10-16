import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signal lost</Text>
      <Text style={styles.copy}>The control center could not locate that module. Return to the briefing deck.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Navigate home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  copy: {
    fontSize: 16,
    lineHeight: 22,
    color: '#94A3B8',
    textAlign: 'center',
  },
  link: {
    borderRadius: 999,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#38BDF8',
  },
  linkText: {
    color: '#0F172A',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
