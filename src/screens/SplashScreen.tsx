import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface SplashScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { colors } = useApp();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Top Branding Illustration Element */}
        <View style={styles.illustrationContainer}>
          <View
            style={[
              styles.organicShape1,
              { backgroundColor: colors.primaryLight },
            ]}
          />
          <View
            style={[
              styles.organicShape2,
              { backgroundColor: colors.secondaryLight },
            ]}
          />
          <View style={[styles.iconCircle, { backgroundColor: colors.surface }]}>
            <Ionicons name="leaf" size={48} color={colors.primary} />
          </View>
        </View>

        {/* Editorial Title */}
        <View style={styles.textSection}>
          <Text style={[styles.brandName, { color: colors.textPrimary }]}>
            Flowly
          </Text>
          <View style={styles.taglineRow}>
            <Text style={[styles.tagline, { color: colors.primary }]}>Plan</Text>
            <Text style={[styles.bullet, { color: colors.textMuted }]}>+</Text>
            <Text style={[styles.tagline, { color: colors.secondary }]}>Focus</Text>
            <Text style={[styles.bullet, { color: colors.textMuted }]}>+</Text>
            <Text style={[styles.tagline, { color: colors.lavender }]}>Grow</Text>
          </View>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Small steps every day lead to extraordinary progress over time.
          </Text>
        </View>
      </View>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <PrimaryButton
          title="Get Started"
          icon="arrow-forward"
          onPress={() => navigation.replace('Onboarding')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    position: 'relative',
  },
  organicShape1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    top: 0,
    left: 10,
    opacity: 0.8,
  },
  organicShape2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    bottom: 0,
    right: 10,
    opacity: 0.8,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  textSection: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 48,
    fontWeight: Typography.weights.bold,
    letterSpacing: -1,
    marginBottom: Spacing.xs,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.md,
  },
  tagline: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  bullet: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
});
