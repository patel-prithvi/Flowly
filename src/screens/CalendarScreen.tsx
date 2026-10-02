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
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const parseDateStr = (dateStr: string) => {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
      return { year: y, month: m, day: d };
    }
  }
  return { year: 2026, month: 8, day: 15 };
};

const formatDateStr = (year: number, month: number, day: number) => {
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
};

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
  const { colors, selectedDate, setSelectedDate, tasks } = useApp();

  const initial = parseDateStr(selectedDate || '2026-09-15');
  const [currentYear, setCurrentYear] = useState<number>(initial.year);
  const [currentMonth, setCurrentMonth] = useState<number>(initial.month);
  const [selectedDay, setSelectedDay] = useState<number>(initial.day);

  // Real-time calendar calculations
  // Total days in the current month (e.g. 30 for Sep, 31 for Oct, 28/29 for Feb)
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Day of week that the 1st of the month falls on (0: Sun, 1: Mon, ..., 6: Sat)
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Clamp selectedDay if month has fewer days
  const effectiveSelectedDay = Math.min(selectedDay, totalDaysInMonth);
  const daysArray = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);

  // Real today identification
  const realToday = new Date();
  const isRealCurrentMonth =
    realToday.getFullYear() === currentYear && realToday.getMonth() === currentMonth;
  const realTodayDate = realToday.getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (dayNum: number) => {
    setSelectedDay(dayNum);
    const dateFormatted = formatDateStr(currentYear, currentMonth, dayNum);
    setSelectedDate(dateFormatted);
  };

  const selectedDateStr = formatDateStr(currentYear, currentMonth, effectiveSelectedDay);

  // Events & tasks for selected date
  const dayEvents = initialCalendarEvents.filter((evt) => evt.date === selectedDateStr);
  const dayTasks = tasks.filter((t) => t.date === selectedDateStr);
  const totalEventCount = dayEvents.length + dayTasks.length;

  const hasEventsOnDay = (dayNum: number) => {
    const dStr = formatDateStr(currentYear, currentMonth, dayNum);
    return (
      initialCalendarEvents.some((evt) => evt.date === dStr) ||
      tasks.some((t) => t.date === dStr)
    );
  };

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
          <TouchableOpacity
            style={styles.monthNavBtn}
            onPress={handlePrevMonth}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: colors.textPrimary }]}>
            {MONTH_NAMES[currentMonth]} {currentYear}
          </Text>
          <TouchableOpacity
            style={styles.monthNavBtn}
            onPress={handleNextMonth}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
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
            {/* Dynamic empty cells for first day of month offset */}
            {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
              <View key={`empty-start-${idx}`} style={styles.emptyGridCell} />
            ))}

            {daysArray.map((dayNum) => {
              const isSelected = effectiveSelectedDay === dayNum;
              const isToday = isRealCurrentMonth && realTodayDate === dayNum;
              const hasEvents = hasEventsOnDay(dayNum);

              return (
                <TouchableOpacity
                  key={dayNum}
                  activeOpacity={0.7}
                  onPress={() => handleSelectDay(dayNum)}
                  style={[
                    styles.dayCell,
                    isSelected && { backgroundColor: colors.primary },
                    !isSelected && isToday && {
                      borderWidth: 1.5,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayNumText,
                      {
                        color: isSelected ? '#FFFFFF' : isToday ? colors.primary : colors.textPrimary,
                        fontWeight: isSelected || isToday ? Typography.weights.bold : Typography.weights.regular,
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
              Schedule — {MONTH_NAMES[currentMonth].slice(0, 3)} {effectiveSelectedDay}, {currentYear}
            </Text>
            <View style={[styles.eventCountBadge, { backgroundColor: colors.primaryLight }]}>
              <Text style={[styles.eventCountText, { color: colors.primary }]}>
                {totalEventCount === 0
                  ? 'Free Day'
                  : totalEventCount === 1
                  ? '1 Event'
                  : `${totalEventCount} Events`}
              </Text>
            </View>
          </View>

          <View style={styles.eventsList}>
            {totalEventCount > 0 ? (
              <>
                {dayEvents.map((evt) => (
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
                ))}

                {dayTasks.map((task) => (
                  <View
                    key={task.id}
                    style={[
                      styles.eventCard,
                      { backgroundColor: colors.surface, borderColor: colors.border },
                    ]}
                  >
                    <View
                      style={[
                        styles.eventColorStrip,
                        { backgroundColor: task.completed ? colors.success : colors.primary },
                      ]}
                    />
                    <View style={styles.eventContent}>
                      <View style={styles.eventTitleRow}>
                        <Text
                          style={[
                            styles.eventTitle,
                            {
                              color: task.completed ? colors.textMuted : colors.textPrimary,
                              textDecorationLine: task.completed ? 'line-through' : 'none',
                            },
                          ]}
                        >
                          {task.title}
                        </Text>
                        <CategoryChip category={task.category} size="sm" />
                      </View>

                      <View style={styles.eventMetaRow}>
                        {task.time ? (
                          <>
                            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                            <Text style={[styles.eventMetaText, { color: colors.textSecondary }]}>
                              {task.time}
                            </Text>
                            <Text style={{ color: colors.textMuted }}>•</Text>
                          </>
                        ) : null}
                        <Ionicons
                          name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                          size={14}
                          color={task.completed ? colors.success : colors.textSecondary}
                        />
                        <Text
                          style={[
                            styles.eventMetaText,
                            { color: task.completed ? colors.success : colors.textSecondary },
                          ]}
                        >
                          {task.completed
                            ? 'Completed Task'
                            : `${task.priority.toUpperCase()} Priority Task`}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </>
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
