import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useApp } from '../context/AppContext';
import { CustomTabBar } from '../components/CustomTabBar';

import { SplashScreen } from '../screens/SplashScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { FocusScreen } from '../screens/FocusScreen';
import { GoalsScreen } from '../screens/GoalsScreen';
import { CalendarScreen } from '../screens/CalendarScreen';
import { HabitTrackerScreen } from '../screens/HabitTrackerScreen';
import { AddTaskModal } from '../screens/AddTaskScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Dummy component for the center '+' tab item slot
const DummyComponent = () => null;

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Focus" component={FocusScreen} options={{ tabBarLabel: 'Focus' }} />
      <Tab.Screen name="AddTaskTab" component={DummyComponent} options={{ tabBarLabel: '' }} />
      <Tab.Screen name="Insights" component={InsightsScreen} options={{ tabBarLabel: 'Insights' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { theme } = useApp();

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name="Goals" component={GoalsScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Habits" component={HabitTrackerScreen} />
        </Stack.Navigator>

        {/* Global Add Task Modal */}
        <AddTaskModal />
      </View>
    </NavigationContainer>
  );
};
