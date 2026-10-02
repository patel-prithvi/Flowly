import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { CategoryChip } from '../components/CategoryChip';
import { PrimaryButton } from '../components/PrimaryButton';
import { Category, Priority } from '../types';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

export const AddTaskModal: React.FC = () => {
  const { colors, isAddTaskModalVisible, setIsAddTaskModalVisible, addTask, goals } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Work');
  const [priority, setPriority] = useState<Priority>('medium');
  const [selectedGoalId, setSelectedGoalId] = useState<string | undefined>(undefined);

  const categories: Category[] = ['Study', 'Work', 'Health', 'Personal'];
  const priorities: Priority[] = ['low', 'medium', 'high'];

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      category,
      priority,
      date: '2026-09-15',
      time: '08:00 PM',
      goalId: selectedGoalId,
    });

    // Reset form
    setTitle('');
    setCategory('Work');
    setPriority('medium');
    setSelectedGoalId(undefined);
    setIsAddTaskModalVisible(false);
  };

  return (
    <Modal
      visible={isAddTaskModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setIsAddTaskModalVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={[styles.sheetContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.sheetHeader}>
            <View style={styles.titleRow}>
              <View style={[styles.headerIconCircle, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
              </View>
              <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                Add New Task
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setIsAddTaskModalVisible(false)}
              style={styles.closeBtn}
            >
              <Ionicons name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
            {/* Task Title Input */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                TASK TITLE
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surfaceVariant,
                    color: colors.textPrimary,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="What do you want to accomplish?"
                placeholderTextColor={colors.textMuted}
                value={title}
                onChangeText={setTitle}
                autoFocus
              />
            </View>

            {/* Category Selector */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                CATEGORY
              </Text>
              <View style={styles.chipsRow}>
                {categories.map((cat) => (
                  <CategoryChip
                    key={cat}
                    category={cat}
                    selected={category === cat}
                    onPress={() => setCategory(cat)}
                  />
                ))}
              </View>
            </View>

            {/* Priority Selector */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                PRIORITY
              </Text>
              <View style={styles.priorityRow}>
                {priorities.map((p) => {
                  const isSelected = priority === p;
                  return (
                    <TouchableOpacity
                      key={p}
                      activeOpacity={0.8}
                      onPress={() => setPriority(p)}
                      style={[
                        styles.priorityChip,
                        {
                          backgroundColor: isSelected
                            ? p === 'high'
                              ? colors.secondary
                              : p === 'medium'
                              ? colors.amber
                              : colors.primary
                            : colors.surfaceVariant,
                          borderColor: isSelected ? 'transparent' : colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          {
                            color: isSelected ? '#FFFFFF' : colors.textPrimary,
                            fontWeight: isSelected
                              ? Typography.weights.bold
                              : Typography.weights.medium,
                          },
                        ]}
                      >
                        {p.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Optional Goal Association */}
            <View style={styles.fieldGroup}>
              <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
                LINK TO GOAL (OPTIONAL)
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.goalsScroll}>
                <TouchableOpacity
                  onPress={() => setSelectedGoalId(undefined)}
                  style={[
                    styles.goalPill,
                    {
                      backgroundColor: !selectedGoalId ? colors.primary : colors.surfaceVariant,
                    },
                  ]}
                >
                  <Text style={{ color: !selectedGoalId ? '#FFFFFF' : colors.textPrimary, fontSize: Typography.sizes.xs }}>
                    None
                  </Text>
                </TouchableOpacity>

                {goals.map((g) => {
                  const isSel = selectedGoalId === g.id;
                  return (
                    <TouchableOpacity
                      key={g.id}
                      onPress={() => setSelectedGoalId(g.id)}
                      style={[
                        styles.goalPill,
                        {
                          backgroundColor: isSel ? g.color : colors.surfaceVariant,
                        },
                      ]}
                    >
                      <Text style={{ color: isSel ? '#FFFFFF' : colors.textPrimary, fontSize: Typography.sizes.xs }}>
                        {g.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Create Task Button */}
            <PrimaryButton
              title="Create Task"
              onPress={handleSubmit}
              icon="checkmark"
              style={{ marginTop: Spacing.md }}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    maxHeight: '85%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetTitle: {
    fontSize: Typography.sizes.xl - 2,
    fontWeight: Typography.weights.bold,
  },
  closeBtn: {
    padding: 4,
  },
  scrollBody: {
    gap: Spacing.lg,
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.8,
  },
  input: {
    height: 52,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.sizes.md,
    borderWidth: 1,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityChip: {
    flex: 1,
    height: 42,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  priorityText: {
    fontSize: Typography.sizes.xs + 1,
  },
  goalsScroll: {
    gap: 8,
  },
  goalPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.round,
  },
});
