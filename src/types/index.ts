export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Study' | 'Work' | 'Health' | 'Personal';

export interface Task {
  id: string;
  title: string;
  category: Category;
  date: string;
  priority: Priority;
  completed: boolean;
  time?: string;
  goalId?: string;
}

export interface Goal {
  id: string;
  title: string;
  category: Category;
  completedTasks: number;
  totalTasks: number;
  color: string;
  icon: string;
  description: string;
}

export interface Habit {
  id: string;
  title: string;
  icon: string;
  category: Category;
  color: string;
  days: boolean[]; // 7 days M T W T F S S
  streak: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  category: Category;
  date: string; // e.g. "2026-09-15"
  location?: string;
  color: string;
}

export interface WeeklyInsight {
  day: string;
  tasksCompleted: number;
  target: number;
}

export interface TimeBreakdown {
  category: Category;
  percentage: number;
  hours: number;
  color: string;
}

export type ThemeMode = 'light' | 'dark';
