import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { GoalCard } from '../components/GoalCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { Goal } from '../types';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface GoalsScreenProps {
  navigation?: any;
}

export const GoalsScreen: React.FC<GoalsScreenProps> = ({ navigation }) => {
  const { colors, goals, addGoal, tasks } = useApp();
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isAddGoalModalVisible, setIsAddGoalModalVisible] = useState<boolean>(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');

  const handleCreateGoal = () => {
    if (!newGoalTitle.trim()) return;
    addGoal({
      title: newGoalTitle,
      description: newGoalDesc || 'Work towards achieving your dream.',
      category: 'Work',
      color: '#508991',
      icon: 'star-outline',
    });
    setNewGoalTitle('');
    setNewGoalDesc('');
    setIsAddGoalModalVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader
          title="My Goals"
          subtitle="Big dreams start with small steps ✨"
          showBack={!!navigation?.canGoBack?.()}
          onBack={() => navigation?.goBack?.()}
          rightElement={
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsAddGoalModalVisible(true)}
              style={[styles.addBtn, { backgroundColor: colors.primaryLight }]}
            >
              <Ionicons name="add" size={22} color={colors.primary} />
            </TouchableOpacity>
          }
        />

        {/* Goals Summary Header Card */}
        <View style={[styles.summaryCard, { backgroundColor: colors.primaryLight, borderColor: `${colors.primary}20` }]}>
          <View style={styles.summaryTextCol}>
            <Text style={[styles.summaryTitle, { color: colors.primary }]}>
              Goal Overview
            </Text>
            <Text style={[styles.summaryBody, { color: colors.textPrimary }]}>
              {goals.length} Active Goals • Total 20 Tasks
            </Text>
          </View>
          <View style={[styles.badgePill, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgePillText}>62% Avg Progress</Text>
          </View>
        </View>

        {/* Goals List */}
        <View style={styles.goalsList}>
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onPress={() => setSelectedGoal(goal)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Goal Details Modal */}
      <Modal
        visible={!!selectedGoal}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedGoal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            {selectedGoal && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIcon, { backgroundColor: `${selectedGoal.color}20` }]}>
                    <Ionicons name={selectedGoal.icon as any} size={28} color={selectedGoal.color} />
                  </View>
                  <TouchableOpacity onPress={() => setSelectedGoal(null)}>
                    <Ionicons name="close" size={24} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                  {selectedGoal.title}
                </Text>
                <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
                  {selectedGoal.description}
                </Text>

                <View style={styles.modalStatsRow}>
                  <View style={[styles.modalStatBox, { backgroundColor: colors.surfaceVariant }]}>
                    <Text style={[styles.modalStatVal, { color: colors.textPrimary }]}>
                      {selectedGoal.completedTasks}/{selectedGoal.totalTasks}
                    </Text>
                    <Text style={[styles.modalStatLbl, { color: colors.textSecondary }]}>
                      Tasks Completed
                    </Text>
                  </View>

                  <View style={[styles.modalStatBox, { backgroundColor: colors.surfaceVariant }]}>
                    <Text style={[styles.modalStatVal, { color: selectedGoal.color }]}>
                      {Math.round((selectedGoal.completedTasks / selectedGoal.totalTasks) * 100)}%
                    </Text>
                    <Text style={[styles.modalStatLbl, { color: colors.textSecondary }]}>
                      Target Progress
                    </Text>
                  </View>
                </View>

                <PrimaryButton
                  title="Close Detail"
                  variant="outline"
                  onPress={() => setSelectedGoal(null)}
                />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Goal Modal */}
      <Modal
        visible={isAddGoalModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddGoalModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                Create New Goal
              </Text>
              <TouchableOpacity onPress={() => setIsAddGoalModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Goal Title</Text>
            <TextInput
              style={[
                styles.textInput,
                { backgroundColor: colors.surfaceVariant, color: colors.textPrimary, borderColor: colors.border },
              ]}
              placeholder="e.g. Master Mobile Architecture"
              placeholderTextColor={colors.textMuted}
              value={newGoalTitle}
              onChangeText={setNewGoalTitle}
            />

            <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Description</Text>
            <TextInput
              style={[
                styles.textInput,
                styles.textArea,
                { backgroundColor: colors.surfaceVariant, color: colors.textPrimary, borderColor: colors.border },
              ]}
              placeholder="Why is this goal important to you?"
              placeholderTextColor={colors.textMuted}
              multiline
              value={newGoalDesc}
              onChangeText={setNewGoalDesc}
            />

            <PrimaryButton
              title="Create Goal"
              onPress={handleCreateGoal}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        </View>
      </Modal>
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  summaryTextCol: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  summaryBody: {
    fontSize: Typography.sizes.xs + 1,
    marginTop: 2,
  },
  badgePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.round,
  },
  badgePillText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
  },
  goalsList: {
    gap: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  modalDesc: {
    fontSize: Typography.sizes.md - 1,
    lineHeight: 22,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginVertical: Spacing.sm,
  },
  modalStatBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  modalStatVal: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  modalStatLbl: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  inputLabel: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.bold,
    marginBottom: -4,
  },
  textInput: {
    height: 48,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.md,
    borderWidth: 1,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
});
