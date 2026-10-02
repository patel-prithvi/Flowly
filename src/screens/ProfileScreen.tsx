import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { AppHeader } from '../components/AppHeader';
import { Typography, Spacing, BorderRadius } from '../theme/theme';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors, theme, toggleTheme, notificationsEnabled, toggleNotifications, tasks, goals } = useApp();

  const completedCount = tasks.filter((t) => t.completed).length;

  const handleLogout = () => {
    Alert.alert(
      'Logout (Simulated)',
      'You have been logged out of Flowly session locally.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <AppHeader title="Profile & Settings" />

        {/* Profile Header Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.avatarRow}>
            <View style={[styles.largeAvatar, { backgroundColor: colors.secondary }]}>
              <Text style={styles.largeAvatarText}>PP</Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
                Prithvi Patel
              </Text>
              <Text style={[styles.userTagline, { color: colors.textSecondary }]}>
                Keep going ✨
              </Text>
              <View style={[styles.badgePill, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="sparkles" size={12} color={colors.primary} />
                <Text style={[styles.badgeText, { color: colors.primary }]}>
                  Pro Productivity Champion
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats Grid */}
          <View style={[styles.statsDivider, { backgroundColor: colors.borderLight }]} />
          <View style={styles.quickStatsRow}>
            <View style={styles.quickStatCol}>
              <Text style={[styles.quickStatVal, { color: colors.textPrimary }]}>
                {completedCount}
              </Text>
              <Text style={[styles.quickStatLbl, { color: colors.textSecondary }]}>
                Tasks Done
              </Text>
            </View>
            <View style={styles.quickStatCol}>
              <Text style={[styles.quickStatVal, { color: colors.textPrimary }]}>
                {goals.length}
              </Text>
              <Text style={[styles.quickStatLbl, { color: colors.textSecondary }]}>
                Active Goals
              </Text>
            </View>
            <View style={styles.quickStatCol}>
              <Text style={[styles.quickStatVal, { color: colors.textPrimary }]}>
                12d
              </Text>
              <Text style={[styles.quickStatLbl, { color: colors.textSecondary }]}>
                Best Streak
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Shortcut Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            HUB NAVIGATION
          </Text>

          <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Goals')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.categoryStudyBg }]}>
                  <Ionicons name="trophy-outline" size={18} color={colors.categoryStudy} />
                </View>
                <Text style={[styles.menuText, { color: colors.textPrimary }]}>My Goals</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={[styles.itemDivider, { backgroundColor: colors.borderLight }]} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Habits')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.categoryHealthBg }]}>
                  <Ionicons name="flame-outline" size={18} color={colors.categoryHealth} />
                </View>
                <Text style={[styles.menuText, { color: colors.textPrimary }]}>Habit Tracker</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <View style={[styles.itemDivider, { backgroundColor: colors.borderLight }]} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Calendar')}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.categoryWorkBg }]}>
                  <Ionicons name="calendar-outline" size={18} color={colors.categoryWork} />
                </View>
                <Text style={[styles.menuText, { color: colors.textPrimary }]}>Calendar Schedule</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings & Preferences Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            PREFERENCES
          </Text>

          <View style={[styles.menuCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {/* Dark/Light Theme Toggle */}
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.lavenderLight }]}>
                  <Ionicons
                    name={theme === 'dark' ? 'moon-outline' : 'sunny-outline'}
                    size={18}
                    color={colors.lavender}
                  />
                </View>
                <View>
                  <Text style={[styles.menuText, { color: colors.textPrimary }]}>Appearance</Text>
                  <Text style={[styles.menuSubtext, { color: colors.textSecondary }]}>
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </Text>
                </View>
              </View>
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.itemDivider, { backgroundColor: colors.borderLight }]} />

            {/* Notifications Toggle */}
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: colors.amberLight }]}>
                  <Ionicons name="notifications-outline" size={18} color={colors.amber} />
                </View>
                <View>
                  <Text style={[styles.menuText, { color: colors.textPrimary }]}>Notifications</Text>
                  <Text style={[styles.menuSubtext, { color: colors.textSecondary }]}>
                    {notificationsEnabled ? 'Enabled' : 'Disabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={[styles.itemDivider, { backgroundColor: colors.borderLight }]} />

            {/* Logout Item */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              style={styles.menuItem}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${colors.danger}15` }]}>
                  <Ionicons name="log-out-outline" size={18} color={colors.danger} />
                </View>
                <Text style={[styles.menuText, { color: colors.danger }]}>Logout Session</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer info */}
        <Text style={[styles.footerText, { color: colors.textMuted }]}>
          Flowly v1.0.0 • Mobile UI Portfolio Showcase
        </Text>
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
  profileCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.lg,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  largeAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeAvatarText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.weights.bold,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Typography.sizes.xl - 2,
    fontWeight: Typography.weights.bold,
  },
  userTagline: {
    fontSize: Typography.sizes.xs + 1,
    marginTop: 2,
    marginBottom: 6,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.round,
    alignSelf: 'flex-start',
    gap: 4,
  },
  badgeText: {
    fontSize: Typography.sizes.xs - 1,
    fontWeight: Typography.weights.bold,
  },
  statsDivider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  quickStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStatCol: {
    alignItems: 'center',
  },
  quickStatVal: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.weights.bold,
  },
  quickStatLbl: {
    fontSize: Typography.sizes.xs,
    marginTop: 2,
  },
  sectionContainer: {
    marginBottom: Spacing.lg,
    gap: Spacing.xs + 2,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 0.8,
    marginLeft: 4,
  },
  menuCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md - 2,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: Typography.sizes.md - 1,
    fontWeight: Typography.weights.semibold,
  },
  menuSubtext: {
    fontSize: Typography.sizes.xs,
    marginTop: 1,
  },
  itemDivider: {
    height: 1,
    marginLeft: 56,
  },
  footerText: {
    textAlign: 'center',
    fontSize: Typography.sizes.xs,
    marginTop: Spacing.md,
  },
});
