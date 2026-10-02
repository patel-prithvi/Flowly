import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Habit } from '../types';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface HabitRowProps {
  habit: Habit;
  onToggleDay: (habitId: string, dayIndex: number) => void;
}

const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const HabitRow: React.FC<HabitRowProps> = ({ habit, onToggleDay }) => {
  const { colors } = useApp();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <Text style={styles.emoji}>{habit.icon}</Text>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {habit.title}
          </Text>
        </View>

        <View style={[styles.streakBadge, { backgroundColor: colors.surfaceVariant }]}>
          <Ionicons name="flame" size={14} color={colors.secondary} />
          <Text style={[styles.streakText, { color: colors.textSecondary }]}>
            {habit.streak}d streak
          </Text>
        </View>
      </View>

      <View style={styles.daysRow}>
        {WEEK_DAYS.map((dayLabel, index) => {
          const isDone = habit.days[index];
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => onToggleDay(habit.id, index)}
              style={styles.dayCol}
            >
              <Text style={[styles.dayLabel, { color: colors.textMuted }]}>
                {dayLabel}
              </Text>
              <View
                style={[
                  styles.dayBubble,
                  {
                    backgroundColor: isDone ? habit.color : colors.surfaceVariant,
                    borderColor: isDone ? habit.color : colors.border,
                  },
                ]}
              >
                {isDone && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm + 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md - 2,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.semibold,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  streakText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.medium,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayCol: {
    alignItems: 'center',
    gap: 4,
  },
  dayLabel: {
    fontSize: Typography.sizes.xs - 1,
    fontWeight: Typography.weights.semibold,
  },
  dayBubble: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
