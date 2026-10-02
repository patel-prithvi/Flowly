# Flowly — Project Task Plan

## Module 1 — Project Setup
- [x] Initialize Expo TypeScript project in `c:\Projects\Flowly`
- [x] Install dependencies (`@react-navigation/native`, `@react-navigation/bottom-tabs`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`, `@expo/vector-icons`, `expo-status-bar`)
- [x] Configure TypeScript and folder architecture (`src/`)

## Module 2 — Design System & Theme
- [x] Define color tokens (cream/warm white background, pastel accents: sage, peach, lavender, muted orange, soft blue, warm yellow)
- [x] Define light/dark mode color palettes
- [x] Define typography scale & editorial hierarchy
- [x] Define spacing, shadows, border radii
- [x] Create Theme Context for runtime theme switching (Light/Dark)

## Module 3 — State Management & Mock Data
- [x] Create mock initial data for tasks, goals, habits, calendar events, insights
- [x] Implement `AppContext` (Tasks, Goals, Habits, Theme, Notifications) for live interactive state changes

## Module 4 — Reusable Components
- [x] `AppHeader` — editorial title + avatar/actions
- [x] `BottomNav` — custom floating tab bar with prominent center `+` button
- [x] `TaskItem` — smooth checkbox toggle, category badge, priority indicator
- [x] `GoalCard` — progress bar, task count, subtle pastel background
- [x] `HabitRow` — weekday completion bubbles with interactive toggle
- [x] `ProgressBar` — rounded pastel progress indicator
- [x] `CategoryChip` — styled filters/tags
- [x] `PrimaryButton` — tactile pressable state with subtle scale animation
- [x] `QuoteCard` — warm motivational editorial card
- [x] `StatCard` — clean metric card with percentage trends

## Module 5 — Screens Implementation
- [x] `SplashScreen` — editorial branding, tagline, CTA to onboarding
- [x] `OnboardingScreen` — 3-step carousel with organic pastel visual shapes, progress dots, skip/next buttons
- [x] `HomeScreen` — "Good morning, Prithvi 👋", quote card, focus progress bar, interactive task list, quick stats
- [x] `FocusScreen` — Pomodoro / Short Break / Long Break timer with working play, pause, reset, countdown, target task card
- [x] `GoalsScreen` — goal list, category progress, modal preview for creating/viewing goals
- [x] `CalendarScreen` — month view (`September 2026`), selectable dates, today's schedule items
- [x] `HabitTrackerScreen` — weekly habit completion matrix (`M T W T F S S`) with interactive toggles & streak counter
- [x] `AddTaskScreen` / Modal — form with title, category chips (Study, Work, Health, Personal), date, priority selector, instant task creation
- [x] `InsightsScreen` — weekly productivity bar visualization, time breakdown chart (View-based), task completion metrics
- [x] `ProfileScreen` — avatar, streak badge, settings list, interactive Light/Dark theme toggle, Notification toggle

## Module 6 — Navigation & Final Polish
- [x] Configure `AppNavigator` with Stack + Custom Bottom Tab Bar
- [x] Interactive press states on buttons & cards
- [x] Safe area insets handling across iOS & Android
- [x] Verify TypeScript & build check with zero errors
