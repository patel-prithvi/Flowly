import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface StatCardProps {
  title: string;
  value: string;
  badge?: string;
  icon: string;
  color: string;
  bgColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  badge,
  icon,
  color,
  bgColor,
}) => {
  const { colors } = useApp();
  const cardBg = bgColor || colors.surface;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardBg,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon as any} size={20} color={color} />
        </View>
        {badge && (
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {badge}
            </Text>
          </View>
        )}
      </View>

      <Text style={[styles.value, { color: colors.textPrimary }]}>
        {value}
      </Text>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
  },
  badgeText: {
    fontSize: Typography.sizes.xs - 1,
    fontWeight: Typography.weights.bold,
  },
  value: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
    marginBottom: 2,
  },
  title: {
    fontSize: Typography.sizes.xs + 1,
    fontWeight: Typography.weights.medium,
  },
});
