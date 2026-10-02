import React, { createContext, useContext, useState } from 'react';
import { Task, Goal, Habit, ThemeMode } from '../types';
import { Colors } from '../theme/theme';
import { initialTasks, initialGoals, initialHabits } from '../data/mockData';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof Colors.light;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  
  // Tasks state
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  deleteTask: (id: string) => void;

  // Goals state
  goals: Goal[];
  addGoal: (goal: Partial<Goal>) => void;

  // Habits state
  habits: Habit[];
  toggleHabitDay: (habitId: string, dayIndex: number) => void;

  // UI state
  isAddTaskModalVisible: boolean;
  setIsAddTaskModalVisible: (visible: boolean) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isAddTaskModalVisible, setIsAddTaskModalVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-15');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: `t_${Date.now()}`,
      completed: false,
    };
    setTasks((prev) => [task, ...prev]);

    // Update goal count if goalId present
    if (newTask.goalId) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === newTask.goalId ? { ...g, totalTasks: g.totalTasks + 1 } : g
        )
      );
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addGoal = (newGoal: Partial<Goal>) => {
    const goal: Goal = {
      id: `g_${Date.now()}`,
      title: newGoal.title || 'New Goal',
      category: newGoal.category || 'Personal',
      completedTasks: 0,
      totalTasks: 4,
      color: newGoal.color || '#5B8266',
      icon: newGoal.icon || 'trophy-outline',
      description: newGoal.description || 'Achieve progress step by step.',
    };
    setGoals((prev) => [...prev, goal]);
  };

  const toggleHabitDay = (habitId: string, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === habitId) {
          const updatedDays = [...habit.days];
          updatedDays[dayIndex] = !updatedDays[dayIndex];
          const newStreak = updatedDays.filter(Boolean).length;
          return { ...habit, days: updatedDays, streak: newStreak };
        }
        return habit;
      })
    );
  };

  const colors = Colors[theme];

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        colors,
        notificationsEnabled,
        toggleNotifications,
        tasks,
        toggleTask,
        addTask,
        deleteTask,
        goals,
        addGoal,
        habits,
        toggleHabitDay,
        isAddTaskModalVisible,
        setIsAddTaskModalVisible,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
