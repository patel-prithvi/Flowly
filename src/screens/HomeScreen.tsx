import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { QuoteCard } from '../components/QuoteCard';
import { ProgressBar } from '../components/ProgressBar';
import { TaskItem } from '../components/TaskItem';
import { StatCard } from '../components/StatCard';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors, tasks, toggleTask, deleteTask, setIsAddTaskModalVisible } = useApp();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AppHeader
          title="Good morning, Prithvi 👋"
          subtitle="Let's make today count"
          showAvatar
          onAvatarPress={() => navigation.navigate('Profile')}
        />

        {/* Motivational Quote */}
        <QuoteCard
          quote="Consistency today creates the life you imagine tomorrow."
          author="Flowly Daily"
        />

        {/* Quick Hub Navigation Cards */}
        <View style={styles.quickHubRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Goals')}
            style={[styles.hubCard, { backgroundColor: colors.categoryStudyBg, borderColor: `${colors.categoryStudy}20` }]}
          >
            <View style={[styles.hubIconCircle, { backgroundColor: colors.categoryStudy }]}>
              <Ionicons name="trophy" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.hubTitle, { color: colors.textPrimary }]}>Goals</Text>
            <Text style={[styles.hubSubtitle, { color: colors.textSecondary }]}>4 active</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Habits')}
            style={[styles.hubCard, { backgroundColor: colors.categoryHealthBg, borderColor: `${colors.categoryHealth}20` }]}
          >
            <View style={[styles.hubIconCircle, { backgroundColor: colors.categoryHealth }]}>
              <Ionicons name="flame" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.hubTitle, { color: colors.textPrimary }]}>Habits</Text>
            <Text style={[styles.hubSubtitle, { color: colors.textSecondary }]}>5 daily</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Calendar')}
            style={[styles.hubCard, { backgroundColor: colors.categoryWorkBg, borderColor: `${colors.categoryWork}20` }]}
          >
            <View style={[styles.hubIconCircle, { backgroundColor: colors.categoryWork }]}>
              <Ionicons name="calendar" size={18} color="#FFFFFF" />
            </View>
            <Text style={[styles.hubTitle, { color: colors.textPrimary }]}>Schedule</Text>
            <Text style={[styles.hubSubtitle, { color: colors.textSecondary }]}>3 events</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Focus Card */}
        <View
          style={[
            styles.focusContainer,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.focusHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                Today's Focus
              </Text>
              <Text style={[styles.focusSubtitle, { color: colors.textSecondary }]}>
                {completedCount} of {totalCount} completed
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsAddTaskModalVisible(true)}
              style={[styles.addInlineBtn, { backgroundColor: colors.primaryLight }]}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
              <Text style={[styles.addInlineText, { color: colors.primary }]}>Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.progressBarWrapper}>
            <ProgressBar progress={progress} showPercentage color={colors.primary} height={10} />
          </View>

          {/* Task List */}
          <View style={styles.taskList}>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
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
  quickHubRow: {
    flexDirection: 'row',
    gap: Spacing.sm + 2,
    marginBottom: Spacing.lg,
  },
  hubCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  hubIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs + 2,
  },
  hubTitle: {
    fontSize: Typography.sizes.sm + 1,
    fontWeight: Typography.weights.bold,
  },
  hubSubtitle: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  focusContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  focusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  focusSubtitle: {
    fontSize: Typography.sizes.xs + 1,
    marginTop: 2,
  },
  addInlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md - 2,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
    gap: 4,
  },
  addInlineText: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
  },
  progressBarWrapper: {
    marginBottom: Spacing.lg,
  },
  taskList: {
    gap: 2,
  },
});
