import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { Typography, BorderRadius, Spacing } from '../theme/theme';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors, setIsAddTaskModalVisible } = useApp();
  const insets = useSafeAreaInsets();

  const getIconName = (routeName: string, isFocused: boolean) => {
    switch (routeName) {
      case 'Home':
        return isFocused ? 'home' : 'home-outline';
      case 'Focus':
        return isFocused ? 'timer' : 'timer-outline';
      case 'Insights':
        return isFocused ? 'bar-chart' : 'bar-chart-outline';
      case 'Profile':
        return isFocused ? 'person' : 'person-outline';
      default:
        return 'square-outline';
    }
  };

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const isFocused = state.index === index;

        // Middle button is the "+" Add Task button
        if (route.name === 'AddTaskTab') {
          return (
            <TouchableOpacity
              key={route.key}
              activeOpacity={0.85}
              onPress={() => setIsAddTaskModalVisible(true)}
              style={styles.centerButtonContainer}
            >
              <View
                style={[
                  styles.centerButton,
                  {
                    backgroundColor: colors.primary,
                    shadowColor: colors.primary,
                  },
                ]}
              >
                <Ionicons name="add" size={28} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          );
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = getIconName(route.name, isFocused);

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Ionicons
              name={iconName as any}
              size={22}
              color={isFocused ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? colors.primary : colors.textMuted,
                  fontWeight: isFocused
                    ? Typography.weights.bold
                    : Typography.weights.medium,
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 10,
    elevation: 8,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: Typography.sizes.xs - 1,
    marginTop: 4,
  },
  centerButtonContainer: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
});
