import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const MODE_CONFIGS = {
  pomodoro: { name: 'Pomodoro', durationSeconds: 25 * 60, color: '#5B8266', bgColor: '#E8F0EA' },
  shortBreak: { name: 'Short Break', durationSeconds: 5 * 60, color: '#E07A5F', bgColor: '#FCECE7' },
  longBreak: { name: 'Long Break', durationSeconds: 15 * 60, color: '#8B7BB8', bgColor: '#F0ECF7' },
};

export const FocusScreen: React.FC = () => {
  const { colors, tasks } = useApp();
  const [activeMode, setActiveMode] = useState<TimerMode>('pomodoro');
  const [secondsLeft, setSecondsLeft] = useState<number>(MODE_CONFIGS.pomodoro.durationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);

  const activeConfig = MODE_CONFIGS[activeMode];
  const activeTask = tasks[selectedTaskIndex] || { title: 'Build React Native UI', category: 'Work' };

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft]);

  const handleModeChange = (mode: TimerMode) => {
    setActiveMode(mode);
    setIsRunning(false);
    setSecondsLeft(MODE_CONFIGS[mode].durationSeconds);
  };

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(activeConfig.durationSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - secondsLeft / activeConfig.durationSeconds;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader
          title="Focus Mode"
          subtitle="Let's get it done ✨"
        />

        {/* Mode Selector Tabs */}
        <View style={[styles.tabContainer, { backgroundColor: colors.surfaceVariant }]}>
          {(['pomodoro', 'shortBreak', 'longBreak'] as TimerMode[]).map((modeKey) => {
            const config = MODE_CONFIGS[modeKey];
            const isSelected = activeMode === modeKey;
            return (
              <TouchableOpacity
                key={modeKey}
                activeOpacity={0.8}
                onPress={() => handleModeChange(modeKey)}
                style={[
                  styles.tabButton,
                  {
                    backgroundColor: isSelected ? colors.surface : 'transparent',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isSelected ? config.color : colors.textMuted,
                      fontWeight: isSelected ? Typography.weights.bold : Typography.weights.medium,
                    },
                  ]}
                >
                  {config.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Big Circular Timer */}
        <View style={styles.timerCircleWrapper}>
          <View
            style={[
              styles.outerRing,
              {
                borderColor: `${activeConfig.color}25`,
                backgroundColor: colors.surface,
              },
            ]}
          >
            <View
              style={[
                styles.innerRing,
                {
                  backgroundColor: activeConfig.bgColor,
                },
              ]}
            >
              <Text style={[styles.timerDisplay, { color: colors.textPrimary }]}>
                {formatTime(secondsLeft)}
              </Text>
              <Text style={[styles.timerStatus, { color: activeConfig.color }]}>
                {isRunning ? 'Session Active' : 'Paused'}
              </Text>
            </View>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleResetTimer}
            style={[styles.smallControlBtn, { backgroundColor: colors.surfaceVariant }]}
          >
            <Ionicons name="refresh-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleToggleTimer}
            style={[
              styles.playBtn,
              {
                backgroundColor: activeConfig.color,
                shadowColor: activeConfig.color,
              },
            ]}
          >
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={32}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // Cycle tasks
              setSelectedTaskIndex((prev) => (prev + 1) % Math.max(tasks.length, 1));
            }}
            style={[styles.smallControlBtn, { backgroundColor: colors.surfaceVariant }]}
          >
            <Ionicons name="swap-horizontal-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Currently Working On Card */}
        <View
          style={[
            styles.workingCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.workingHeader}>
            <Ionicons name="bookmark-outline" size={18} color={colors.primary} />
            <Text style={[styles.workingLabel, { color: colors.textSecondary }]}>
              Currently Working On
            </Text>
          </View>

          <View style={styles.taskTitleRow}>
            <Text style={[styles.taskTitle, { color: colors.textPrimary }]}>
              {activeTask.title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedTaskIndex((prev) => (prev + 1) % Math.max(tasks.length, 1));
              }}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: BorderRadius.round,
    padding: 4,
    marginBottom: Spacing.xl,
    width: '100%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
  },
  tabText: {
    fontSize: Typography.sizes.xs + 1,
  },
  timerCircleWrapper: {
    marginVertical: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerRing: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  innerRing: {
    width: 210,
    height: 210,
    borderRadius: 105,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: Typography.weights.bold,
    letterSpacing: -1,
  },
  timerStatus: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginVertical: Spacing.xl,
  },
  smallControlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  workingCard: {
    width: '100%',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginTop: Spacing.sm,
  },
  workingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  workingLabel: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: Typography.sizes.md + 1,
    fontWeight: Typography.weights.bold,
  },
});
