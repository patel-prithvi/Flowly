import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Goal } from '../types';
import { useApp } from '../context/AppContext';
import { ProgressBar } from './ProgressBar';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const { colors } = useApp();
  const progress = goal.totalTasks > 0 ? goal.completedTasks / goal.totalTasks : 0;
  const percentage = Math.round(progress * 100);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${goal.color}20` },
          ]}
        >
          <Ionicons name={goal.icon as any} size={22} color={goal.color} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {goal.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {goal.completedTasks} of {goal.totalTasks} tasks completed
          </Text>
        </View>

        <View style={[styles.badge, { backgroundColor: `${goal.color}15` }]}>
          <Text style={[styles.badgeText, { color: goal.color }]}>
            {percentage}%
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color={goal.color} height={8} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm + 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm + 4,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm + 4,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: Typography.sizes.xs + 1,
  },
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
  },
  badgeText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  progressContainer: {
    marginTop: 2,
  },
});
