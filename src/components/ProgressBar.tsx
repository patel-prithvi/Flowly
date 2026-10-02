import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography } from '../theme/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  height = 8,
  showPercentage = false,
}) => {
  const { colors } = useApp();
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentageString = `${Math.round(clampedProgress * 100)}%`;
  const activeColor = color || colors.primary;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: colors.surfaceVariant,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress * 100}%`,
              backgroundColor: activeColor,
              height,
            },
          ]}
        />
      </View>
      {showPercentage && (
        <Text style={[styles.percentageText, { color: colors.textSecondary }]}>
          {percentageString}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    flex: 1,
    borderRadius: BorderRadius.round,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.round,
  },
  percentageText: {
    marginLeft: 8,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
  },
});
