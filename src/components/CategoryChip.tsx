import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category } from '../types';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface CategoryChipProps {
  category: Category;
  selected?: boolean;
  onPress?: () => void;
  size?: 'sm' | 'md';
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  category,
  selected = false,
  onPress,
  size = 'md',
}) => {
  const { colors } = useApp();

  const getCategoryStyles = (cat: Category) => {
    switch (cat) {
      case 'Study':
        return { color: colors.categoryStudy, bg: colors.categoryStudyBg };
      case 'Work':
        return { color: colors.categoryWork, bg: colors.categoryWorkBg };
      case 'Health':
        return { color: colors.categoryHealth, bg: colors.categoryHealthBg };
      case 'Personal':
        return { color: colors.categoryPersonal, bg: colors.categoryPersonalBg };
      default:
        return { color: colors.primary, bg: colors.primaryLight };
    }
  };

  const catStyle = getCategoryStyles(category);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={!onPress}
      onPress={onPress}
      style={[
        styles.chip,
        size === 'sm' ? styles.chipSm : styles.chipMd,
        {
          backgroundColor: selected ? catStyle.color : catStyle.bg,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          size === 'sm' ? styles.textSm : styles.textMd,
          {
            color: selected ? '#FFFFFF' : catStyle.color,
          },
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: BorderRadius.round,
    alignSelf: 'flex-start',
  },
  chipSm: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
  },
  chipMd: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  text: {
    fontWeight: Typography.weights.semibold,
  },
  textSm: {
    fontSize: Typography.sizes.xs - 1,
  },
  textMd: {
    fontSize: Typography.sizes.xs + 1,
  },
});
