import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { HabitRow } from '../components/HabitRow';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface HabitTrackerScreenProps {
  navigation?: any;
}

export const HabitTrackerScreen: React.FC<HabitTrackerScreenProps> = ({ navigation }) => {
  const { colors, habits, toggleHabitDay } = useApp();

  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader
          title="Habit Tracker"
          subtitle="Small daily actions build lifelong habits 🌿"
          showBack={!!navigation?.canGoBack?.()}
          onBack={() => navigation?.goBack?.()}
        />

        {/* Streak Hero Card */}
        <View style={[styles.heroCard, { backgroundColor: colors.secondaryLight, borderColor: `${colors.secondary}20` }]}>
          <View style={styles.heroTextCol}>
            <Text style={[styles.heroTitle, { color: colors.secondary }]}>
              Consistency Streak
            </Text>
            <Text style={[styles.heroVal, { color: colors.textPrimary }]}>
              {totalStreak} Total Days Active
            </Text>
            <Text style={[styles.heroDesc, { color: colors.textSecondary }]}>
              Keep tapping your daily check-ins to build momentum!
            </Text>
          </View>
          <View style={[styles.flameCircle, { backgroundColor: colors.secondary }]}>
            <Ionicons name="flame" size={32} color="#FFFFFF" />
          </View>
        </View>

        {/* Habits List */}
        <View style={styles.habitsHeaderRow}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            This Week's Habits
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            {habits.length} Habits Tracked
          </Text>
        </View>

        <View style={styles.habitsList}>
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              onToggleDay={toggleHabitDay}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl + 20,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  heroTextCol: {
    flex: 1,
  },
  heroTitle: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroVal: {
    fontSize: Typography.sizes.xl - 2,
    fontWeight: Typography.weights.bold,
    marginVertical: 2,
  },
  heroDesc: {
    fontSize: Typography.sizes.xs + 1,
  },
  flameCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.md,
  },
  habitsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  sectionSubtitle: {
    fontSize: Typography.sizes.xs + 1,
  },
  habitsList: {
    gap: 2,
  },
});
