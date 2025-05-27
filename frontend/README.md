# Task Completion Interface

This interface allows users to complete their daily micro-steps, skip steps, or swap for alternative tasks. It tracks progress and provides a satisfying completion experience.

## Features

- Displays current step number and total steps 
- Shows task title, description, and expandable tips
- Complete button with loading state
- Skip button with confirmation dialog
- Swap button to get alternative task
- Success animation on task completion
- Auto-navigates to home screen after completion

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Place the Lottie success animation JSON file at `src/animations/success.json`.

3. Update the `BASE_URL` in `src/services/Api.js` to point to your backend API.

4. Run the app:
   ```
   npm start
   ```

## Usage

- The task data is loaded from Redux state, which is populated by the backend API.
- Clicking "Complete" will call the `completeTask` API endpoint and show a loading state.
- Clicking "Skip" will prompt a confirmation dialog, then call `skipTask` on confirm.
- Clicking "Swap Task" will call `getAlternativeTask` and update the current step.
- On completion, a success animation is played, and the user is navigated to the home screen.

## Code Structure

- `TaskScreen.js`: The main component for the Task Completion Interface.
- `TipAccordion.js`: An expandable accordion component for displaying task tips.  
- `SuccessAnimation.js`: A component that plays a Lottie success animation.
- `goalSlice.js`: The Redux slice that manages goal state and API actions.
- `Api.js`: A service module for making API requests related to tasks and goals.