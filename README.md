# MicroWins - Small Goal Tracking App

*AI Agent Development Guidelines - This README serves as the primary reference for automated code generation*

## 🤖 Agent Instructions

**CRITICAL: All code generated must strictly follow these guidelines. This document defines the project's DNA.**

---

## 📋 Project Overview

### Project Type
- **Application Type**: Mobile App (React Native) with Backend API
- **Architecture Pattern**: Client-Server with Microservices Backend
- **Primary Languages**: JavaScript/TypeScript (Frontend), Node.js/Python (Backend)
- **Frontend Framework**: React Native with Expo
- **Backend Framework**: Node.js + Express.js (Primary) / FastAPI (Alternative)
- **Database**: PostgreSQL (Primary), Redis (Caching)

### Core Mission
Transform overwhelming goals into 100 micro-actions, each representing 1% progress toward the ultimate objective. Help users achieve their dreams through manageable daily steps.

### Core Principles
1. **Simplicity First** - One primary action per screen
2. **Celebration** - Make completing tasks feel rewarding
3. **Progress Visibility** - Always show how far users have come
4. **Gentle Nudges** - Encouraging, not demanding
5. **Accessibility** - High contrast, clear typography, inclusive design

---

## 🏗️ Architecture Guidelines

### Frontend Architecture (React Native)
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Generic components (Button, Card, etc.)
│   │   ├── forms/          # Form-specific components
│   │   └── animations/     # Lottie and custom animations
│   ├── screens/            # Screen-level components
│   │   ├── auth/          # Authentication screens
│   │   ├── goals/         # Goal-related screens
│   │   ├── dashboard/     # Main dashboard
│   │   └── profile/       # User profile screens
│   ├── navigation/         # Navigation configuration
│   ├── store/             # Redux Toolkit store
│   │   ├── slices/        # Redux slices (goals, user, tasks)
│   │   └── api/           # RTK Query API slices
│   ├── services/          # API services and external integrations
│   │   ├── api/           # Backend API calls
│   │   ├── ai/            # AI integration (OpenAI/Claude)
│   │   ├── auth/          # Firebase Auth integration
│   │   └── notifications/ # Push notification handling
│   ├── utils/             # Helper functions and utilities
│   ├── hooks/             # Custom React hooks
│   ├── constants/         # App constants and configuration
│   ├── types/             # TypeScript type definitions
│   └── assets/            # Images, fonts, animations
├── __tests__/             # Test files
└── docs/                  # Component documentation
```

### Backend Architecture (Node.js + Express)
```
backend/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── goalController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── services/          # Business logic layer
│   │   ├── goalService.js
│   │   ├── aiService.js
│   │   ├── notificationService.js
│   │   └── analyticsService.js
│   ├── models/            # Database models (Sequelize/Prisma)
│   │   ├── User.js
│   │   ├── Goal.js
│   │   ├── MicroStep.js
│   │   └── UserProgress.js
│   ├── middleware/        # Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── routes/            # API route definitions
│   │   ├── auth.js
│   │   ├── goals.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration files
│   │   ├── database.js
│   │   ├── redis.js
│   │   └── env.js
│   └── validators/        # Input validation schemas
├── tests/                 # Test files
├── migrations/            # Database migrations
└── docs/                  # API documentation
```

### File Naming Conventions
- **React Components**: `PascalCase.tsx` (e.g., `GoalCard.tsx`)
- **Screens**: `PascalCase.tsx` (e.g., `CreateGoalScreen.tsx`)
- **Services**: `camelCase.ts` (e.g., `goalService.ts`)
- **Hooks**: `use + PascalCase.ts` (e.g., `useGoalProgress.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Types**: `PascalCase.ts` (e.g., `GoalTypes.ts`)
- **Backend Controllers**: `camelCase + Controller.js` (e.g., `goalController.js`)
- **Backend Models**: `PascalCase.js` (e.g., `Goal.js`)

---

## 💻 Frontend Coding Standards

### React Native Component Patterns

#### Component Structure
```tsx
// ✅ Standard React Native component structure
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { GoalType, MicroStepType } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';

interface GoalCardProps {
  goal: GoalType;
  onPress: (goalId: string) => void;
  onComplete: (stepId: string) => void;
  style?: ViewStyle;
}

export default function GoalCard({ 
  goal, 
  onPress, 
  onComplete, 
  style 
}: GoalCardProps) {
  // 1. Hooks and state
  const [isCompleting, setIsCompleting] = useState(false);
  const dispatch = useDispatch();
  const progress = useSelector(state => state.goals.progress[goal.id]);
  
  // 2. Effects
  useEffect(() => {
    // Load progress data if needed
  }, [goal.id]);
  
  // 3. Event handlers
  const handleComplete = useCallback(async () => {
    try {
      setIsCompleting(true);
      await onComplete(goal.currentStep.id);
      // Show celebration animation
    } catch (error) {
      console.error('Failed to complete step:', error);
    } finally {
      setIsCompleting(false);
    }
  }, [goal.currentStep.id, onComplete]);
  
  // 4. Render helpers
  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View 
        style={[
          styles.progressBar, 
          { width: `${progress}%` }
        ]} 
      />
    </View>
  );
  
  // 5. Main render
  return (
    <Card containerStyle={[styles.container, style]}>
      <Text style={styles.title}>{goal.title}</Text>
      {renderProgressBar()}
      <Text style={styles.currentStep}>
        Today's 1%: {goal.currentStep.title}
      </Text>
      <Button
        title={isCompleting ? "Completing..." : "Mark Complete"}
        onPress={handleComplete}
        disabled={isCompleting}
        buttonStyle={styles.completeButton}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  currentStep: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
  },
});
```

#### Redux Toolkit Patterns
```tsx
// ✅ Redux slice structure
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { goalService } from '@/services/api/goalService';
import { GoalType, CreateGoalRequest } from '@/types';

interface GoalState {
  goals: GoalType[];
  currentGoal: GoalType | null;
  loading: boolean;
  error: string | null;
  progress: Record<string, number>;
}

const initialState: GoalState = {
  goals: [],
  currentGoal: null,
  loading: false,
  error: null,
  progress: {},
};

// ✅ Async thunks for API calls
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData: CreateGoalRequest, { rejectWithValue }) => {
    try {
      const response = await goalService.createGoal(goalData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create goal');
    }
  }
);

export const completeStep = createAsyncThunk(
  'goals/completeStep',
  async (stepId: string, { rejectWithValue, getState }) => {
    try {
      const response = await goalService.completeStep(stepId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete step');
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setCurrentGoal: (state, action: PayloadAction<GoalType>) => {
      state.currentGoal = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateProgress: (state, action: PayloadAction<{ goalId: string; progress: number }>) => {
      state.progress[action.payload.goalId] = action.payload.progress;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(completeStep.fulfilled, (state, action) => {
        const { goalId, progress } = action.payload;
        state.progress[goalId] = progress;
        // Update current goal if needed
        if (state.currentGoal?.id === goalId) {
          state.currentGoal = action.payload.goal;
        }
      });
  },
});

export const { setCurrentGoal, clearError, updateProgress } = goalSlice.actions;
export default goalSlice.reducer;
```

#### Custom Hooks Patterns
```tsx
// ✅ Custom hook for goal management
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { createGoal, completeStep } from '@/store/slices/goalSlice';
import { GoalType, CreateGoalRequest } from '@/types';

export const useGoalManagement = () => {
  const dispatch = useDispatch();
  const { goals, currentGoal, loading, error } = useSelector(
    (state: RootState) => state.goals
  );

  const [celebrationVisible, setCelebrationVisible] = useState(false);

  const createNewGoal = useCallback(async (goalData: CreateGoalRequest) => {
    try {
      const result = await dispatch(createGoal(goalData)).unwrap();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch]);

  const completeCurrentStep = useCallback(async (stepId: string) => {
    try {
      const result = await dispatch(completeStep(stepId)).unwrap();
      setCelebrationVisible(true);
      
      // Hide celebration after 3 seconds
      setTimeout(() => setCelebrationVisible(false), 3000);
      
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }, [dispatch]);

  const getTodaysTask = useCallback(() => {
    if (!currentGoal) return null;
    return currentGoal.microSteps.find(step => !step.completed_at);
  }, [currentGoal]);

  return {
    goals,
    currentGoal,
    loading,
    error,
    celebrationVisible,
    createNewGoal,
    completeCurrentStep,
    getTodaysTask,
  };
};
```

---

## 🔧 Backend Coding Standards

### Express.js API Patterns

#### Controller Structure
```javascript
// ✅ Standard controller structure
const goalService = require('../services/goalService');
const aiService = require('../services/aiService');
const { validationResult } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');

class GoalController {
  // ✅ Create new goal with AI decomposition
  createGoal = asyncHandler(async (req, res) => {
    // 1. Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    const { title, category, targetDays, difficultyPreference } = req.body;
    const userId = req.user.id;

    try {
      // 2. Generate micro-steps using AI
      const microSteps = await aiService.generateMicroSteps({
        goalTitle: title,
        category,
        targetDays,
        difficulty: difficultyPreference
      });

      // 3. Create goal in database
      const goal = await goalService.createGoal({
        userId,
        title,
        category,
        targetDays,
        microSteps
      });

      // 4. Return success response
      res.status(201).json({
        success: true,
        message: 'Goal created successfully',
        data: goal
      });

    } catch (error) {
      console.error('Goal creation failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create goal',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  });

  // ✅ Complete a micro-step
  completeStep = asyncHandler(async (req, res) => {
    const { stepId } = req.params;
    const userId = req.user.id;

    try {
      // 1. Verify step belongs to user
      const step = await goalService.getStepById(stepId);
      if (!step || step.goal.userId !== userId) {
        return res.status(404).json({
          success: false,
          message: 'Step not found'
        });
      }

      // 2. Mark step as completed
      const result = await goalService.completeStep(stepId);

      // 3. Calculate updated progress
      const progress = await goalService.calculateProgress(step.goalId);

      // 4. Trigger celebration if milestone reached
      if (progress % 10 === 0) {
        await goalService.createMilestone(step.goalId, progress);
      }

      res.json({
        success: true,
        message: 'Step completed successfully',
        data: {
          step: result,
          progress,
          goal: step.goal
        }
      });

    } catch (error) {
      console.error('Step completion failed:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to complete step'
      });
    }
  });

  // ✅ Get user's active goals
  getUserGoals = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { status = 'active' } = req.query;

    try {
      const goals = await goalService.getUserGoals(userId, { status });
      
      res.json({
        success: true,
        data: goals,
        meta: {
          count: goals.length,
          status
        }
      });

    } catch (error) {
      console.error('Failed to fetch goals:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch goals'
      });
    }
  });
}

module.exports = new GoalController();
```

#### Service Layer Patterns
```javascript
// ✅ Service layer for business logic
const { Goal, MicroStep, User } = require('../models');
const { Op } = require('sequelize');
const notificationService = require('./notificationService');

class GoalService {
  // ✅ Create goal with transaction
  async createGoal({ userId, title, category, targetDays, microSteps }) {
    const transaction = await Goal.sequelize.transaction();

    try {
      // 1. Create the goal
      const goal = await Goal.create({
        userId,
        title,
        category,
        targetDays,
        status: 'active',
        createdAt: new Date()
      }, { transaction });

      // 2. Create micro-steps
      const stepsData = microSteps.map((step, index) => ({
        goalId: goal.id,
        order: index + 1,
        title: step.title,
        description: step.description,
        tips: step.tips || []
      }));

      await MicroStep.bulkCreate(stepsData, { transaction });

      // 3. Commit transaction
      await transaction.commit();

      // 4. Schedule first notification
      await notificationService.scheduleGoalReminder(userId, goal.id);

      // 5. Return goal with steps
      return await this.getGoalById(goal.id);

    } catch (error) {
      await transaction.rollback();
      throw new Error(`Failed to create goal: ${error.message}`);
    }
  }

  // ✅ Complete step with validation
  async completeStep(stepId) {
    try {
      const step = await MicroStep.findByPk(stepId, {
        include: [{ model: Goal, include: [User] }]
      });

      if (!step) {
        throw new Error('Step not found');
      }

      if (step.completedAt) {
        throw new Error('Step already completed');
      }

      // Mark as completed
      step.completedAt = new Date();
      await step.save();

      // Update user stats
      await this.updateUserStats(step.goal.userId);

      return step;

    } catch (error) {
      throw new Error(`Failed to complete step: ${error.message}`);
    }
  }

  // ✅ Calculate progress percentage
  async calculateProgress(goalId) {
    const totalSteps = await MicroStep.count({
      where: { goalId }
    });

    const completedSteps = await MicroStep.count({
      where: { 
        goalId,
        completedAt: { [Op.not]: null }
      }
    });

    return Math.round((completedSteps / totalSteps) * 100);
  }

  // ✅ Get user's goals with filtering
  async getUserGoals(userId, options = {}) {
    const whereClause = { userId };
    
    if (options.status) {
      whereClause.status = options.status;
    }

    return await Goal.findAll({
      where: whereClause,
      include: [
        {
          model: MicroStep,
          where: { completedAt: null },
          required: false,
          limit: 1,
          order: [['order', 'ASC']]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }
}

module.exports = new GoalService();
```

#### AI Integration Service
```javascript
// ✅ AI service for goal decomposition
const OpenAI = require('openai');
const config = require('../config/env');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: config.OPENAI_API_KEY
    });
  }

  // ✅ Generate 100 micro-steps for a goal
  async generateMicroSteps({ goalTitle, category, targetDays, difficulty }) {
    const prompt = this.buildMicroStepsPrompt(goalTitle, category, targetDays, difficulty);

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert life coach who breaks down big goals into 100 manageable micro-steps.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 3000
      });

      const microSteps = this.parseMicroStepsResponse(response.choices[0].message.content);
      
      if (microSteps.length !== 100) {
        throw new Error(`Expected 100 steps, got ${microSteps.length}`);
      }

      return microSteps;

    } catch (error) {
      console.error('AI generation failed:', error);
      throw new Error('Failed to generate micro-steps');
    }
  }

  // ✅ Build AI prompt
  buildMicroStepsPrompt(goalTitle, category, targetDays, difficulty) {
    return `
Generate exactly 100 micro-steps to achieve this goal: "${goalTitle}"

Requirements:
- Category: ${category}
- Timeline: ${targetDays} days
- Difficulty: ${difficulty}
- Each step should be completable in 15-30 minutes
- Steps should build upon each other logically
- Include variety to maintain engagement
- Make steps specific and actionable

Format each step as JSON:
{
  "title": "Brief, actionable title",
  "description": "Detailed instructions",
  "tips": ["helpful tip 1", "helpful tip 2"]
}

Return as a JSON array of exactly 100 steps.
`;
  }

  // ✅ Parse AI response
  parseMicroStepsResponse(response) {
    try {
      // Clean and parse JSON response
      const cleanedResponse = response.replace(/```json\n?|\n?```/g, '').trim();
      const steps = JSON.parse(cleanedResponse);
      
      // Validate structure
      if (!Array.isArray(steps)) {
        throw new Error('Response is not an array');
      }

      return steps.map((step, index) => ({
        order: index + 1,
        title: step.title || `Step ${index + 1}`,
        description: step.description || step.title,
        tips: Array.isArray(step.tips) ? step.tips : []
      }));

    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid AI response format');
    }
  }
}

module.exports = new AIService();
```

---

## 🎨 UI/UX Guidelines

### Design System
```tsx
// ✅ Theme constants
export const colors = {
  primary: '#6C63FF',
  secondary: '#FF6584',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    card: '#FFFFFF'
  },
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF'
  },
  border: '#E5E7EB'
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24
  },
  caption: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20
  }
};
```

### Animation Guidelines
```tsx
// ✅ Celebration animation component
import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface CelebrationModalProps {
  visible: boolean;
  onComplete: () => void;
  type?: 'step' | 'milestone' | 'goal';
}

export default function CelebrationModal({ 
  visible, 
  onComplete, 
  type = 'step' 
}: CelebrationModalProps) {
  const getAnimationSource = () => {
    switch (type) {
      case 'milestone':
        return require('@/assets/animations/milestone-celebration.json');
      case 'goal':
        return require('@/assets/animations/goal-completion.json');
      default:
        return require('@/assets/animations/step-complete.json');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <LottieView
          source={getAnimationSource()}
          autoPlay
          loop={false}
          onAnimationFinish={onComplete}
          style={styles.animation}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
```

---

## 🔒 Security Guidelines

### Authentication Patterns
```tsx
// ✅ Firebase Auth integration
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

class AuthService {
  // ✅ Initialize authentication
  async initialize() {
    GoogleSignin.configure({
      webClientId: 'your-web-client-id',
    });
  }

  // ✅ Email/password login
  async loginWithEmail(email: string, password: string) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const token = await userCredential.user.getIdToken();
      
      // Store token securely
      await this.storeToken(token);
      
      return userCredential.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ✅ Google Sign-In
  async loginWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      const token = await userCredential.user.getIdToken();
      await this.storeToken(token);
      
      return userCredential.user;
    } catch (error) {
      console.error('Google login failed:', error);
      throw this.handleAuthError(error);
    }
  }

  // ✅ Secure token storage
  private async storeToken(token: string) {
    try {
      await Keychain.setInternetCredentials(
        'microwins_auth',
        'auth_token',
        token
      );
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  // ✅ Error handling
  private handleAuthError(error: any) {
    const errorCode = error.code;
    
    switch (errorCode) {
      case 'auth/user-not-found':
        return new Error('No account found with this email');
      case 'auth/wrong-password':
        return new Error('Incorrect password');
      case 'auth/invalid-email':
        return new Error('Invalid email address');
      default:
        return new Error('Authentication failed');
    }
  }
}
```

---

## 📊 Data Models

### TypeScript Interfaces
```tsx
// ✅ Core data types
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notificationTime: string; // "09:00"
  difficultyPreference: 'easy' | 'medium' | 'hard';
  celebrationStyle: 'minimal' | 'full';
  theme: 'light' | 'dark' | 'auto';
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: GoalCategory;
  createdAt: string;
  targetDays: number;
  status: 'active' | 'paused' | 'completed';
  currentStep?: MicroStep;
  progress: number;
}

export interface MicroStep {
  id: string;
  goalId: string;
  order: number;
  title: string;
  description: string;
  tips: string[];
  completedAt: string | null;
  skippedAt: string | null;
}

export interface UserProgress {
  id: string;
  userId: string;
  goalId: string;
  stepId: string;
  completedAt: string;
  timeSpent?: number; // in minutes
  notes?: string;
}

export type GoalCategory = 
  | 'health' 
  | 'career' 
  | 'relationships' 
  | 'learning' 
  | 'creativity' 
  | 'finance' 
  | 'personal';

// ✅ API request/response types
export interface CreateGoalRequest {
  title: string;
  category: GoalCategory;
  targetDays: number;
  difficultyPreference: 'easy' | 'medium' | 'hard';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: Record<string, any>;
}
```

---

## 🧪 Testing Guidelines

### React Native Testing Patterns
```tsx
// ✅ Component testing with React Native Testing Library
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '@/store';
import GoalCard from '@/components/GoalCard';
import { mockGoal } from '@/tests/mocks';

describe('GoalCard', () => {
  const defaultProps = {
    goal: mockGoal,
    onPress: jest.fn(),
    onComplete: jest.fn(),
  };

  const renderComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <GoalCard {...defaultProps} {...props} />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render goal title and current step', () => {
    const { getByText } = renderComponent();
    
    expect(getByText(mockGoal.title)).toBeTruthy();
    expect(getByText(`Today's 1%: ${mockGoal.currentStep.title}`)).toBeTruthy();
  });

  it('should call onComplete when complete button is pressed', async () => {
    const onComplete = jest.fn();
    const { getByText } = renderComponent({ onComplete });
    
    fireEvent.press(getByText('Mark Complete'));
    
    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith(mockGoal.currentStep.id);
    });
  });

  it('should show loading state when completing step', async () => {
    const { getByText } = renderComponent();
    
    fireEvent.press(getByText('Mark Complete'));
    
    expect(getByText('Completing...')).toBeTruthy();
  });
});
```

### Backend Testing Patterns
```javascript
// ✅ API endpoint testing
const request = require('supertest');
const app = require('../src/app');
const { Goal, MicroStep, User } = require('../src/models');
const { createTestUser, createTestGoal } = require('./helpers');

describe('POST /api/goals', () => {
  let user;
  let authToken;

  beforeEach(async () => {
    user = await createTestUser();
    authToken = user.generateAuthToken();
  });

  afterEach(async () => {
    await Goal.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  it('should create a new goal with micro-steps', async () => {
    const goalData = {
      title: 'Learn Spanish',
      category: 'learning',
      targetDays: 100,
      difficultyPreference: 'medium'
    };

    const response = await request(app)
      .post('/api/goals')
      .set('Authorization', `Bearer ${authToken}`)
      .send(goalData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(goalData.title);
    expect(response.body.data.microSteps).toHaveLength(100);
  });

  it('should return validation error for invalid input', async () => {
    const invalidData = {
      title: '', // Empty title
      category: 'invalid-category'
    };

    const response = await request(app)
      .post('/api/goals')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
  });
});
```

---

## ⚠️ Critical Rules for AI Agent

### MUST DO
- ✅ **Follow React Native best practices** - Use proper component lifecycle and hooks
- ✅ **Implement comprehensive error handling** - Try-catch blocks for all async operations
- ✅ **Use TypeScript types** - Define interfaces for all data structures
- ✅ **Include loading states** - Show spinners and skeleton screens
- ✅ **Add accessibility props** - accessibilityLabel, accessibilityHint for all interactive elements
- ✅ **Implement offline support** - Use AsyncStorage and handle network failures
- ✅ **Follow security best practices** - Validate inputs, secure token storage
- ✅ **Add celebration animations** - Use Lottie for milestone achievements
- ✅ **Include proper navigation** - Use React Navigation with proper typing

### NEVER DO
- ❌ **Skip error boundaries** - Always wrap screens in error boundaries
- ❌ **Hardcode API endpoints** - Use environment configuration
- ❌ **Store sensitive data insecurely** - Use Keychain/Keystore for tokens
- ❌ **Ignore performance** - Optimize lists with FlatList, memoize components
- ❌ **Break platform conventions** - Follow iOS/Android design guidelines
- ❌ **Skip input validation** - Validate both client and server side
- ❌ **Ignore accessibility** - Support screen readers and keyboard navigation
- ❌ **Use blocking operations** - Keep UI responsive with proper async handling

### CODE QUALITY CHECKLIST
Before submitting any code, ensure:
- [ ] All async operations have proper error handling
- [ ] TypeScript types are defined for new interfaces
- [ ] Components are responsive and work on all screen sizes
- [ ] Loading states are implemented for all async operations
- [ ] Error states are handled gracefully with user-friendly messages
- [ ] Accessibility attributes are included for all interactive elements
- [ ] Performance is optimized (memoization, lazy loading)
- [ ] Security best practices are followed
- [ ] Offline functionality is considered
- [ ] Celebration animations enhance user experience
- [ ] Navigation flows are intuitive and consistent
- [ ] API responses are properly typed and validated

---

## 📚 Development Resources

### Documentation Links
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [Firebase Documentation](https://rnfirebase.io/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)

### External APIs
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Push Notifications Guide](https://rnfirebase.io/messaging/usage)

---

*This README serves as the definitive guide for MicroWins app development. The AI development agent must strictly adhere to these guidelines to ensure consistent, high-quality code generation that delivers an exceptional user experience.*
