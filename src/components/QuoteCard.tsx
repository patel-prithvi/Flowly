import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface QuoteCardProps {
  quote?: string;
  author?: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote = 'Consistency today creates the life you imagine tomorrow.',
  author = 'Flowly Daily Daily Wisdom',
}) => {
  const { colors } = useApp();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.primaryLight,
          borderColor: `${colors.primary}20`,
        },
      ]}
    >
      <Ionicons
        name="chatbox-ellipses-outline"
        size={24}
        color={colors.primary}
        style={styles.icon}
      />
      <Text style={[styles.quoteText, { color: colors.textPrimary }]}>
        "{quote}"
      </Text>
      <Text style={[styles.authorText, { color: colors.primary }]}>
        — {author}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  icon: {
    marginBottom: Spacing.xs,
    opacity: 0.8,
  },
  quoteText: {
    fontSize: Typography.sizes.md,
    fontStyle: 'italic',
    fontWeight: Typography.weights.medium,
    lineHeight: 24,
    marginBottom: Spacing.xs + 2,
  },
  authorText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
