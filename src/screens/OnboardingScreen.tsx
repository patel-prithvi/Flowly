import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface OnboardingScreenProps {
  navigation: any;
}

const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Small Steps\nBig Progress',
    subtitle: 'Build better habits, get things done, and track your growth every day.',
    icon: 'checkmark-circle-outline',
    color: '#5B8266',
    bgColor: '#E8F0EA',
  },
  {
    id: 2,
    title: 'Focus On What\nMatters Most',
    subtitle: 'Deep focus sessions with custom Pomodoro timers to boost your productivity.',
    icon: 'timer-outline',
    color: '#E07A5F',
    bgColor: '#FCECE7',
  },
  {
    id: 3,
    title: 'Achieve Your\nLife Goals',
    subtitle: 'Break big dreams into actionable daily tasks and watch your progress unfold.',
    icon: 'trophy-outline',
    color: '#8B7BB8',
    bgColor: '#F0ECF7',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const { colors } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('MainApp');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainApp');
  };

  const slide = ONBOARDING_SLIDES[currentSlide];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slide Content */}
      <View style={styles.slideContainer}>
        <View style={styles.visualWrapper}>
          <View style={[styles.blobBackground, { backgroundColor: slide.bgColor }]} />
          <View style={[styles.iconCard, { backgroundColor: colors.surface }]}>
            <Ionicons name={slide.icon as any} size={56} color={slide.color} />
          </View>
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {slide.title}
        </Text>

        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {slide.subtitle}
        </Text>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* Progress Dots */}
        <View style={styles.dotsContainer}>
          {ONBOARDING_SLIDES.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentSlide(index)}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentSlide ? colors.primary : colors.border,
                  width: index === currentSlide ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <PrimaryButton
          title={currentSlide === ONBOARDING_SLIDES.length - 1 ? "Get Started" : "Continue"}
          icon="arrow-forward"
          onPress={handleNext}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  blobBackground: {
    width: 180,
    height: 180,
    borderRadius: 60,
    transform: [{ rotate: '12deg' }],
    position: 'absolute',
  },
  iconCard: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  title: {
    fontSize: Typography.sizes.hero - 4,
    fontWeight: Typography.weights.bold,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: Spacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: Typography.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.sm,
  },
  bottomControls: {
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
