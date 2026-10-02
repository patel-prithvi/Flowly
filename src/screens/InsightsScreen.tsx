import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { mockWeeklyInsights, mockTimeBreakdown } from '../data/mockData';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

export const InsightsScreen: React.FC = () => {
  const { colors } = useApp();
  const [timeframe, setTimeframe] = useState<'week' | 'month'>('week');

  const maxTasks = Math.max(...mockWeeklyInsights.map((d) => d.target));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader
          title="Insights"
          subtitle="Track your momentum and focus efficiency"
          rightElement={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setTimeframe(timeframe === 'week' ? 'month' : 'week')}
              style={[styles.timeframePill, { backgroundColor: colors.surfaceVariant }]}
            >
              <Text style={[styles.timeframeText, { color: colors.textPrimary }]}>
                {timeframe === 'week' ? 'This Week' : 'This Month'}
              </Text>
              <Ionicons name="chevron-down" size={14} color={colors.textSecondary} />
            </TouchableOpacity>
          }
        />

        {/* Metric Cards Row */}
        <View style={styles.statsGridRow}>
          <StatCard
            title="Tasks Completed"
            value="12 tasks"
            badge="↑ 20%"
            icon="checkmark-done-circle-outline"
            color={colors.primary}
          />

          <StatCard
            title="Time Focused"
            value="8h 30m"
            badge="↑ 15%"
            icon="timer-outline"
            color={colors.secondary}
          />
        </View>

        {/* Weekly Productivity Bar Chart (Built with React Native Views) */}
        <View style={[styles.chartCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
                Daily Completion
              </Text>
              <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
                Average 4.2 tasks per day
              </Text>
            </View>
            <View style={[styles.legendPill, { backgroundColor: colors.primaryLight }]}>
              <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
              <Text style={[styles.legendText, { color: colors.primary }]}>Completed</Text>
            </View>
          </View>

          {/* Bar Chart Graphics */}
          <View style={styles.chartArea}>
            {mockWeeklyInsights.map((item, idx) => {
              const heightRatio = item.tasksCompleted / maxTasks;
              const barHeightPercentage = Math.round(heightRatio * 100);
              const isPeak = item.tasksCompleted === Math.max(...mockWeeklyInsights.map(i => i.tasksCompleted));

              return (
                <View key={idx} style={styles.barColumn}>
                  <Text style={[styles.barValText, { color: colors.textMuted }]}>
                    {item.tasksCompleted}
                  </Text>
                  <View style={[styles.barTrack, { backgroundColor: colors.surfaceVariant }]}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${barHeightPercentage}%`,
                          backgroundColor: isPeak ? colors.secondary : colors.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barDayText,
                      {
                        color: isPeak ? colors.textPrimary : colors.textMuted,
                        fontWeight: isPeak ? Typography.weights.bold : Typography.weights.regular,
                      },
                    ]}
                  >
                    {item.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Category Time Breakdown */}
        <View style={[styles.breakdownCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Category Time Allocation
          </Text>

          <View style={styles.categoriesList}>
            {mockTimeBreakdown.map((cat, idx) => (
              <View key={idx} style={styles.categoryItem}>
                <View style={styles.catMetaRow}>
                  <View style={styles.catNameBox}>
                    <View style={[styles.catDot, { backgroundColor: cat.color }]} />
                    <Text style={[styles.catName, { color: colors.textPrimary }]}>
                      {cat.category}
                    </Text>
                  </View>
                  <Text style={[styles.catHours, { color: colors.textSecondary }]}>
                    {cat.hours}h ({cat.percentage}%)
                  </Text>
                </View>

                <ProgressBar
                  progress={cat.percentage / 100}
                  color={cat.color}
                  height={8}
                />
              </View>
            ))}
          </View>
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
  timeframePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  timeframeText: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
  },
  statsGridRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  chartCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  chartTitle: {
    fontSize: Typography.sizes.md + 1,
    fontWeight: Typography.weights.bold,
  },
  chartSubtitle: {
    fontSize: Typography.sizes.xs + 1,
    marginTop: 2,
  },
  legendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: Typography.sizes.xs - 1,
    fontWeight: Typography.weights.bold,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 140,
    paddingTop: Spacing.sm,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValText: {
    fontSize: Typography.sizes.xs - 1,
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 90,
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  barDayText: {
    fontSize: Typography.sizes.xs,
    marginTop: 6,
  },
  breakdownCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md + 1,
    fontWeight: Typography.weights.bold,
    marginBottom: Spacing.md,
  },
  categoriesList: {
    gap: Spacing.md,
  },
  categoryItem: {
    gap: 6,
  },
  catMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catNameBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  catDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  catName: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
  },
  catHours: {
    fontSize: Typography.sizes.xs + 1,
  },
});
