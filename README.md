# MicroWins Progress & Analytics

This module implements the progress tracking and analytics feature for the MicroWins app. It allows users to view their goal completion history, streaks, and statistics.

## Installation

1. Navigate to the `frontend` directory
2. Run `npm install` to install the required dependencies

## Usage

1. Import the `ProgressScreen` component into your app's navigation flow
2. Ensure the Redux store is set up and the `progressReducer` is included
3. Navigate to the Progress screen to view the analytics

## Components

### ProgressScreen

The main screen component that displays the user's progress analytics, including:
- Line chart of daily goal completions over time
- Calendar heat map of completions
- Current and longest streak statistics 
- Completion rate percentage
- Option to share progress screenshot

### progressSlice

The Redux slice that manages the progress state, including:
- `completedTasks` array to store task completion history
- `currentStreak` and `longestStreak` to track streak data
- Reducers to add completed tasks and update streak counts

## Dependencies

- `@reduxjs/toolkit` and `react-redux` for state management
- `victory-native` for chart rendering
- `react-native-calendar-heatmap` for calendar heat map
- `react-native-view-shot` for capturing progress screenshot
- `date-fns` for date manipulation utilities

## Customization

- Modify the `styles` object in `ProgressScreen` to adjust the look and feel
- Update the chart configuration in the `renderChart` method to change chart style and behavior
- Adjust the heatmap and streak logic in `progressSlice` to match your app's needs