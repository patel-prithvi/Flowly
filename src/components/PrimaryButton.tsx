import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { BorderRadius, Typography, Spacing } from '../theme/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  style,
  textStyle,
  fullWidth = true,
}) => {
  const { colors } = useApp();

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          bg: colors.secondaryLight,
          border: 'transparent',
          text: colors.secondary,
        };
      case 'outline':
        return {
          bg: 'transparent',
          border: colors.border,
          text: colors.textPrimary,
        };
      default:
        return {
          bg: colors.primary,
          border: 'transparent',
          text: '#FFFFFF',
        };
    }
  };

  const vStyle = getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: vStyle.bg,
          borderColor: vStyle.border,
          borderWidth: variant === 'outline' ? 1 : 0,
          width: fullWidth ? '100%' : 'auto',
        },
        style,
      ]}
    >
      {icon && iconPosition === 'left' && (
        <Ionicons
          name={icon as any}
          size={18}
          color={vStyle.text}
          style={styles.leftIcon}
        />
      )}
      <Text style={[styles.text, { color: vStyle.text }, textStyle]}>
        {title}
      </Text>
      {icon && iconPosition === 'right' && (
        <Ionicons
          name={icon as any}
          size={18}
          color={vStyle.text}
          style={styles.rightIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  text: {
    fontSize: Typography.sizes.md,
    fontWeight: Typography.weights.bold,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
