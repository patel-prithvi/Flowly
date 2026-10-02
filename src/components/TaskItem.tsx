import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';
import { useApp } from '../context/AppContext';
import { CategoryChip } from './CategoryChip';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const { colors } = useApp();

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return colors.secondary;
      case 'medium':
        return colors.amber;
      case 'low':
        return colors.primary;
      default:
        return colors.textMuted;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onToggle(task.id)}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onToggle(task.id)}
        style={[
          styles.checkbox,
          {
            borderColor: task.completed ? colors.primary : colors.textMuted,
            backgroundColor: task.completed ? colors.primary : 'transparent',
          },
        ]}
      >
        {task.completed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: task.completed ? colors.textMuted : colors.textPrimary,
              textDecorationLine: task.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <CategoryChip category={task.category} size="sm" />
          {task.time && (
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              {task.time}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.rightSection}>
        <View
          style={[
            styles.priorityDot,
            { backgroundColor: getPriorityColor() },
          ]}
        />
        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(task.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.deleteBtn}
          >
            <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    marginBottom: Spacing.sm + 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: Typography.sizes.md - 1,
    fontWeight: Typography.weights.semibold,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: Typography.sizes.xs,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    gap: 10,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deleteBtn: {
    padding: 2,
  },
});
