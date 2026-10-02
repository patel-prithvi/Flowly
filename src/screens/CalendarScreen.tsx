import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { CategoryChip } from '../components/CategoryChip';
import { initialCalendarEvents } from '../data/mockData';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface CalendarScreenProps {
  navigation?: any;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const { colors, selectedDate, setSelectedDate } = useApp();
  const [selectedDayNum, setSelectedDayNum] = useState<number>(15); // Sep 15

  // Generate 30 days of September 2026
  const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader
          title="Calendar"
          subtitle="Plan your productivity schedule"
          showBack={!!navigation?.canGoBack?.()}
          onBack={() => navigation?.goBack?.()}
        />

        {/* Month Selector Bar */}
        <View style={[styles.monthHeader, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.monthNavBtn}>
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>
            September 2026
          </Text>
          <TouchableOpacity style={styles.monthNavBtn}>
            <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid Card */}
        <View style={[styles.calendarCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Weekday Labels */}
          <View style={styles.weekDaysRow}>
            {DAYS_OF_WEEK.map((day, idx) => (
              <Text key={idx} style={[styles.weekDayText, { color: colors.textMuted }]}>
                {day}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {/* September 1, 2026 starts on Tuesday (offset 2 days) */}
            <View style={styles.emptyGridCell} />
            <View style={styles.emptyGridCell} />

            {daysArray.map((dayNum) => {
              const isSelected = selectedDayNum === dayNum;
              const hasEvents = dayNum === 15 || dayNum === 16;
              return (
                <TouchableOpacity
                  key={dayNum}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDayNum(dayNum)}
                  style={[
                    styles.dayCell,
                    {
                      backgroundColor: isSelected ? colors.primary : 'transparent',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumText,
                      {
                        color: isSelected ? '#FFFFFF' : colors.textPrimary,
                        fontWeight: isSelected ? Typography.weights.bold : Typography.weights.regular,
                      },
                    ]}
                  >
                    {dayNum}
                  </Text>
                  {hasEvents && !isSelected && (
                    <View style={[styles.eventDot, { backgroundColor: colors.secondary }]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Schedule for Selected Date */}
        <View style={styles.scheduleSection}>
          <View style={styles.scheduleHeaderRow}>
            <Text style={[styles.scheduleSectionTitle, { color: colors.textPrimary }]}>
              Schedule — Sep {selectedDayNum}, 2026
            </Text>
            <View style={[styles.eventCountBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.eventCountText, { color: colors.primary }]}>
                {selectedDayNum === 15 ? '3 Events' : selectedDayNum === 16 ? '1 Event' : 'Free Day'}
              </Text>
            </View>
          </View>

          <View style={styles.eventsList}>
            {selectedDayNum === 15 ? (
              initialCalendarEvents.map((evt) => (
                <View
                  key={evt.id}
                  style={[
                    styles.eventCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                  ]}
                >
                  <View style={[styles.eventColorStrip, { backgroundColor: evt.color }]} />
                  <View style={styles.eventContent}>
                    <View style={styles.eventTitleRow}>
                      <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>
                        {evt.title}
                      </Text>
                      <CategoryChip category={evt.category} size="sm" />
                    </View>

                    <View style={styles.eventMetaRow}>
                      <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                      <Text style={[styles.eventMetaText, { color: colors.textSecondary }]}>
                        {evt.time}
                      </Text>

                      {evt.location && (
                        <>
                          <Text style={{ color: colors.textMuted }}>•</Text>
                          <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                          <Text style={[styles.eventMetaText, { color: colors.textSecondary }]}>
                            {evt.location}
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.emptyScheduleBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Ionicons name="sparkles-outline" size={32} color={colors.primary} />
                <Text style={[styles.emptyScheduleText, { color: colors.textSecondary }]}>
                  No events scheduled for this date. Time to focus or relax!
                </Text>
              </View>
            )}
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
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
  },
  monthNavBtn: {
    padding: 4,
  },
  monthTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  calendarCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  weekDayText: {
    width: 36,
    textAlign: 'center',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emptyGridCell: {
    width: '14.28%',
    height: 40,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 4,
    position: 'relative',
  },
  dayNumText: {
    fontSize: Typography.sizes.sm,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    bottom: 4,
  },
  scheduleSection: {
    gap: Spacing.md,
  },
  scheduleHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleSectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  eventCountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.round,
  },
  eventCountText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  eventsList: {
    gap: Spacing.sm + 2,
  },
  eventCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  eventColorStrip: {
    width: 6,
  },
  eventContent: {
    flex: 1,
    padding: Spacing.md,
  },
  eventTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetaText: {
    fontSize: Typography.sizes.xs + 1,
  },
  emptyScheduleBox: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  emptyScheduleText: {
    fontSize: Typography.sizes.sm,
    textAlign: 'center',
  },
});
