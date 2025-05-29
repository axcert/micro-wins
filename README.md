# MicroWins - Goal Tracking App

*AI Agent Development Guidelines - This README serves as the primary reference for automated code generation*

## 🤖 Agent Instructions

**CRITICAL: All code generated must strictly follow these guidelines. This document defines the project's DNA.**

---

## 📋 Project Overview

### Project Type
- **Application Type**: Mobile App (React Native) with Laravel Backend API
- **Architecture Pattern**: Client-Server with RESTful API
- **Frontend**: React Native with Expo
- **Backend**: Laravel 11.x (PHP 8.2+)
- **Database**: PostgreSQL 15+ (Primary), Redis 7+ (Cache/Queues)
- **Authentication**: JWT with Laravel Sanctum

### Repositories Structure
- **Frontend Repository**: `microwinds-mobile` (React Native)
- **Backend Repository**: `microwinds-api` (Laravel)

### Core Mission
Transform overwhelming goals into 100 micro-steps using AI, helping users achieve objectives through daily 1% progress tracking.

### Core Principles
1. **Simplicity First** - One primary action per screen
2. **Celebration** - Make completing tasks feel rewarding
3. **Progress Visibility** - Always show how far users have come
4. **Gentle Nudges** - Encouraging, not demanding
5. **Accessibility** - High contrast, clear typography, inclusive design

---

## 🏗️ Initial Project Setup

### CRITICAL: Directory Structure Creation

**Before generating any code , Initialize the working directory  and create this exact directory structure:**

```bash
# Root project directory
mkdir microwinds-project
cd microwinds-project

# Frontend (React Native) structure
mkdir -p microwinds-mobile/src/{components/{common,forms,animations},screens/{auth,goals,dashboard,profile,progress},navigation,store/{slices,api},services/{api,ai,auth,notifications},utils,hooks,constants,types,assets/{images,fonts,animations}}
mkdir -p microwinds-mobile/{__tests__,docs,android,ios}

# Backend (Laravel) structure
mkdir -p microwinds-api/{app/{Http/{Controllers,Middleware,Requests,Resources},Models,Services,Jobs,Events,Listeners,Mail,Notifications,Repositories/{Contracts,Eloquent},Singletons},database/{migrations,seeders,factories},routes,config,storage/{app,framework,logs},resources/{views},tests/{Feature,Unit}}

# Shared documentation
mkdir -p docs/{api,deployment,architecture}
```

### Project Root Structure
```
microwinds-project/
├── microwinds-mobile/          # React Native Frontend
├── microwinds-api/             # Laravel Backend
├── docs/                       # Shared Documentation
├── docker-compose.yml          # Development Environment
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 📱 Frontend Architecture (React Native)

### Directory Structure
```
microwinds-mobile/
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── common/            # Generic components (Button, Card, etc.)
│   │   ├── forms/             # Form-specific components
│   │   └── animations/        # Lottie and celebration components
│   ├── screens/               # Screen-level components
│   │   ├── auth/             # Authentication screens
│   │   ├── goals/            # Goal management screens
│   │   ├── dashboard/        # Home dashboard
│   │   ├── profile/          # User profile screens
│   │   └── progress/         # Analytics and progress screens
│   ├── navigation/            # Navigation configuration
│   ├── store/                # Redux Toolkit store
│   │   ├── slices/           # Redux slices (auth, goals, progress)
│   │   └── api/              # RTK Query API slices
│   ├── services/             # External service integrations
│   │   ├── api/              # Backend API client
│   │   ├── ai/               # AI service integration
│   │   ├── auth/             # Authentication service
│   │   └── notifications/    # Push notification handling
│   ├── utils/                # Helper functions and utilities
│   ├── hooks/                # Custom React hooks
│   ├── constants/            # App constants and theme
│   ├── types/                # TypeScript type definitions
│   └── assets/               # Static assets
├── __tests__/                # Test files
├── android/                  # Android specific files
├── ios/                      # iOS specific files
├── docs/                     # Component documentation
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── metro.config.js           # Metro bundler configuration
├── babel.config.js           # Babel configuration
└── app.json                  # Expo configuration
```

### File Naming Conventions
- **Components**: `PascalCase.tsx` (e.g., `GoalCard.tsx`)
- **Screens**: `PascalCase.tsx` (e.g., `CreateGoalScreen.tsx`)
- **Services**: `camelCase.ts` (e.g., `goalService.ts`)
- **Hooks**: `use + PascalCase.ts` (e.g., `useGoalProgress.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `THEME_COLORS.ts`)
- **Types**: `PascalCase.ts` (e.g., `GoalTypes.ts`)

---

## 🔧 Backend Architecture (Laravel)

### Directory Structure
```
microwinds-api/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Controllers
│   │   │   ├── AuthController.php
│   │   │   ├── GoalController.php
│   │   │   ├── StepController.php
│   │   │   ├── ProgressController.php
│   │   │   └── SubscriptionController.php
│   │   ├── Middleware/        # Custom middleware
│   │   ├── Requests/          # Form request validation
│   │   └── Resources/         # API resource transformers
│   ├── Models/                # Eloquent models
│   │   ├── User.php
│   │   ├── Goal.php
│   │   ├── MicroStep.php
│   │   ├── UserProgress.php
│   │   └── Subscription.php
│   ├── Services/              # Business logic services
│   │   ├── GoalService.php
│   │   ├── AIService.php
│   │   ├── NotificationService.php
│   │   └── AnalyticsService.php
│   ├── Repositories/          # Repository pattern implementation
│   │   ├── Contracts/         # Repository interfaces
│   │   │   ├── GoalRepositoryInterface.php
│   │   │   ├── UserRepositoryInterface.php
│   │   │   └── ProgressRepositoryInterface.php
│   │   └── Eloquent/         # Eloquent implementations
│   │       ├── GoalRepository.php
│   │       ├── UserRepository.php
│   │       └── ProgressRepository.php
│   ├── Singletons/           # Singleton pattern implementations
│   │   ├── CacheManager.php
│   │   ├── ConfigurationManager.php
│   │   └── LogManager.php
│   ├── Jobs/                  # Queue jobs
│   ├── Events/                # Event classes
│   ├── Listeners/             # Event listeners
│   ├── Mail/                  # Mail classes
│   └── Notifications/         # Notification classes
├── database/
│   ├── migrations/            # Database migrations
│   ├── seeders/               # Database seeders
│   └── factories/             # Model factories
├── routes/
│   ├── api.php               # API routes
│   └── web.php               # Web routes
├── config/                    # Configuration files
├── storage/                   # File storage
├── resources/                 # Views and assets
├── tests/
│   ├── Feature/              # Feature tests
│   └── Unit/                 # Unit tests
├── composer.json             # PHP dependencies
├── artisan                   # Laravel CLI
├── .env.example              # Environment template
└── phpunit.xml               # Testing configuration
```

### File Naming Conventions
- **Controllers**: `PascalCase + Controller.php` (e.g., `GoalController.php`)
- **Models**: `PascalCase.php` (e.g., `Goal.php`)
- **Services**: `PascalCase + Service.php` (e.g., `GoalService.php`)
- **Repositories**: `PascalCase + Repository.php` (e.g., `GoalRepository.php`)
- **Repository Interfaces**: `PascalCase + RepositoryInterface.php` (e.g., `GoalRepositoryInterface.php`)
- **Singletons**: `PascalCase.php` (e.g., `CacheManager.php`)
- **Migrations**: `timestamp_snake_case.php`
- **Requests**: `PascalCase + Request.php` (e.g., `CreateGoalRequest.php`)
- **Resources**: `PascalCase + Resource.php` (e.g., `GoalResource.php`)

---

## 💻 React Native Coding Standards

### Component Structure Pattern
```tsx
// ✅ Standard React Native component structure
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, ProgressBar } from 'react-native-elements';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { GoalType, MicroStepType } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { completeStep } from '@/store/slices/goalSlice';

interface GoalCardProps {
  goal: GoalType;
  onPress: (goalId: string) => void;
  onComplete: (stepId: string) => void;
  testID?: string;
  style?: ViewStyle;
}

export default function GoalCard({ 
  goal, 
  onPress, 
  onComplete, 
  testID,
  style 
}: GoalCardProps) {
  // 1. Hooks and state
  const [isCompleting, setIsCompleting] = useState(false);
  const dispatch = useDispatch();
  const progress = useSelector(state => state.goals.progress[goal.id]);
  const progressValue = useSharedValue(0);
  
  // 2. Effects
  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress, progressValue]);
  
  // 3. Event handlers
  const handleComplete = useCallback(async () => {
    try {
      setIsCompleting(true);
      await dispatch(completeStep(goal.currentStep.id)).unwrap();
      onComplete(goal.currentStep.id);
      
      // Show success feedback
      Alert.alert(
        'Great Job! 🎉',
        'You completed today\'s 1% step!',
        [{ text: 'Continue', style: 'default' }]
      );
    } catch (error) {
      Alert.alert(
        'Oops!',
        'Something went wrong. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsCompleting(false);
    }
  }, [goal.currentStep.id, onComplete, dispatch]);
  
  const handleSkip = useCallback(() => {
    Alert.alert(
      'Skip Today\'s Step?',
      'You can always come back to this later.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', style: 'destructive', onPress: () => {} }
      ]
    );
  }, []);
  
  // 4. Animated styles
  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });
  
  // 5. Render helpers
  const renderProgressSection = () => (
    <View style={styles.progressContainer}>
      <Text style={styles.progressText}>{progress}% Complete</Text>
      <View style={styles.progressTrack}>
        <Animated.View 
          style={[styles.progressFill, animatedProgressStyle]} 
        />
      </View>
    </View>
  );
  
  // 6. Main render
  return (
    <Card containerStyle={[styles.container, style]} testID={testID}>
      <TouchableOpacity onPress={() => onPress(goal.id)} activeOpacity={0.7}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <Text style={styles.categoryBadge}>{goal.category.toUpperCase()}</Text>
        
        {renderProgressSection()}
        
        <View style={styles.currentStepContainer}>
          <Text style={styles.currentStepLabel}>Today's 1%:</Text>
          <Text style={styles.currentStepTitle}>
            {goal.currentStep?.title || 'No active step'}
          </Text>
          <Text style={styles.stepDescription} numberOfLines={2}>
            {goal.currentStep?.description}
          </Text>
        </View>
        
        <View style={styles.actionContainer}>
          <Button
            title={isCompleting ? "Completing..." : "Mark Complete"}
            onPress={handleComplete}
            disabled={isCompleting || !goal.currentStep}
            buttonStyle={[
              styles.completeButton,
              isCompleting && styles.disabledButton
            ]}
            titleStyle={styles.buttonText}
            loading={isCompleting}
          />
          
          <TouchableOpacity 
            onPress={handleSkip}
            style={styles.skipButton}
            disabled={isCompleting}
          >
            <Text style={styles.skipButtonText}>Skip Today</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.md,
    marginVertical: spacing.sm,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  goalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  categoryBadge: {
    ...typography.caption,
    color: colors.primary,
    backgroundColor: colors.primary + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: spacing.md,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  currentStepContainer: {
    backgroundColor: colors.background.card,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.md,
  },
  currentStepLabel: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  currentStepTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    ...typography.body,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingHorizontal: spacing.lg,
    flex: 1,
    marginRight: spacing.sm,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    ...typography.body,
    fontWeight: '600',
  },
  skipButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  skipButtonText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});
```

### Redux Toolkit Patterns
```tsx
// ✅ Goal slice with async thunks
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { goalService } from '@/services/api/goalService';
import { GoalType, CreateGoalRequest, MicroStepType } from '@/types';

interface GoalState {
  goals: GoalType[];
  activeGoal: GoalType | null;
  todaysStep: MicroStepType | null;
  loading: boolean;
  error: string | null;
  progress: Record<string, number>;
  streaks: Record<string, number>;
}

const initialState: GoalState = {
  goals: [],
  activeGoal: null,
  todaysStep: null,
  loading: false,
  error: null,
  progress: {},
  streaks: {},
};

// ✅ Async thunks for API operations
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData: CreateGoalRequest, { rejectWithValue }) => {
    try {
      const response = await goalService.createGoal(goalData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create goal'
      );
    }
  }
);

export const fetchUserGoals = createAsyncThunk(
  'goals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getUserGoals();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch goals'
      );
    }
  }
);

export const completeStep = createAsyncThunk(
  'goals/completeStep',
  async (stepId: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await goalService.completeStep(stepId);
      
      // Trigger celebration
      dispatch(showCelebration({ type: 'step', progress: response.data.progress }));
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to complete step'
      );
    }
  }
);

export const fetchTodaysStep = createAsyncThunk(
  'goals/fetchTodaysStep',
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getTodaysStep();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch today\'s step'
      );
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setActiveGoal: (state, action: PayloadAction<GoalType>) => {
      state.activeGoal = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateProgress: (state, action: PayloadAction<{ goalId: string; progress: number }>) => {
      const { goalId, progress } = action.payload;
      state.progress[goalId] = progress;
    },
    showCelebration: (state, action: PayloadAction<{ type: string; progress: number }>) => {
      // Handle celebration state
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Goal
      .addCase(createGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals.push(action.payload);
        state.activeGoal = action.payload;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch Goals
      .addCase(fetchUserGoals.fulfilled, (state, action) => {
        state.goals = action.payload;
        if (action.payload.length > 0 && !state.activeGoal) {
          state.activeGoal = action.payload.find(g => g.status === 'active') || action.payload[0];
        }
      })
      
      // Complete Step
      .addCase(completeStep.fulfilled, (state, action) => {
        const { goalId, progress, nextStep } = action.payload;
        state.progress[goalId] = progress;
        
        // Update active goal
        if (state.activeGoal?.id === goalId) {
          state.activeGoal.currentStep = nextStep;
        }
        
        // Update today's step
        state.todaysStep = nextStep;
        
        // Update streak
        state.streaks[goalId] = (state.streaks[goalId] || 0) + 1;
      })
      
      // Fetch Today's Step
      .addCase(fetchTodaysStep.fulfilled, (state, action) => {
        state.todaysStep = action.payload;
      });
  },
});

export const { setActiveGoal, clearError, updateProgress, showCelebration } = goalSlice.actions;
export default goalSlice.reducer;
```

---

## 🔧 Laravel Backend Coding Standards

### Controller Structure Pattern
```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use App\Services\GoalService;
use App\Services\AIService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class GoalController extends Controller
{
    protected GoalService $goalService;
    protected AIService $aiService;

    public function __construct(GoalService $goalService, AIService $aiService)
    {
        $this->goalService = $goalService;
        $this->aiService = $aiService;
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of user's goals
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $goals = $this->goalService->getUserGoals($user->id, [
                'status' => $request->get('status', 'active'),
                'per_page' => $request->get('per_page', 10)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goals retrieved successfully',
                'data' => GoalResource::collection($goals->items()),
                'meta' => [
                    'current_page' => $goals->currentPage(),
                    'total' => $goals->total(),
                    'per_page' => $goals->perPage(),
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch goals', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve goals',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created goal with AI processing
     */
    public function store(CreateGoalRequest $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            // Check user's goal limit
            if (!$this->goalService->canCreateGoal($user)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal limit reached. Upgrade to premium for unlimited goals.',
                    'error_code' => 'GOAL_LIMIT_EXCEEDED'
                ], Response::HTTP_FORBIDDEN);
            }

            $goalData = $request->validated();
            $goalData['user_id'] = $user->id;

            // Create goal and queue AI processing
            $goal = $this->goalService->createGoal($goalData);

            Log::info('Goal created successfully', [
                'goal_id' => $goal->id,
                'user_id' => $user->id,
                'title' => $goal->title
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goal created successfully. AI is generating micro-steps...',
                'data' => new GoalResource($goal),
                'processing_status' => 'queued'
            ], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            Log::error('Goal creation failed', [
                'user_id' => Auth::id(),
                'request_data' => $request->validated(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create goal',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified goal with micro-steps
     */
    public function show(Goal $goal): JsonResponse
    {
        try {
            // Check ownership
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $goalWithSteps = $this->goalService->getGoalWithSteps($goal->id);

            return response()->json([
                'success' => true,
                'message' => 'Goal retrieved successfully',
                'data' => new GoalResource($goalWithSteps)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch goal', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve goal'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified goal
     */
    public function update(UpdateGoalRequest $request, Goal $goal): JsonResponse
    {
        try {
            // Check ownership
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $updatedGoal = $this->goalService->updateGoal($goal, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Goal updated successfully',
                'data' => new GoalResource($updatedGoal)
            ]);

        } catch (\Exception $e) {
            Log::error('Goal update failed', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update goal'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Activate a paused goal
     */
    public function activate(Goal $goal): JsonResponse
    {
        try {
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $activatedGoal = $this->goalService->activateGoal($goal);

            return response()->json([
                'success' => true,
                'message' => 'Goal activated successfully',
                'data' => new GoalResource($activatedGoal)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to activate goal'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Pause an active goal
     */
    public function pause(Goal $goal): JsonResponse
    {
        try {
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $pausedGoal = $this->goalService->pauseGoal($goal);

            return response()->json([
                'success' => true,
                'message' => 'Goal paused successfully',
                'data' => new GoalResource($pausedGoal)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to pause goal'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get goal templates
     */
    public function templates(): JsonResponse
    {
        try {
            $templates = $this->goalService->getGoalTemplates();

            return response()->json([
                'success' => true,
                'message' => 'Goal templates retrieved successfully',
                'data' => $templates
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve templates'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
```

---

## 🏛️ Repository Architecture Pattern

### Repository Interface Contract
```php
<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseRepositoryInterface
{
    /**
     * Get all records
     */
    public function all(array $columns = ['*']): Collection;

    /**
     * Get paginated records
     */
    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator;

    /**
     * Find record by ID
     */
    public function find(int $id, array $columns = ['*']): ?Model;

    /**
     * Find record by ID or fail
     */
    public function findOrFail(int $id, array $columns = ['*']): Model;

    /**
     * Find record by field
     */
    public function findBy(string $field, $value, array $columns = ['*']): ?Model;

    /**
     * Find multiple records by field
     */
    public function findWhere(string $field, $value, array $columns = ['*']): Collection;

    /**
     * Create new record
     */
    public function create(array $data): Model;

    /**
     * Update record
     */
    public function update(Model $model, array $data): Model;

    /**
     * Delete record
     */
    public function delete(Model $model): bool;

    /**
     * Get records with relationships
     */
    public function with(array $relationships): self;

    /**
     * Apply where conditions
     */
    public function where(string $field, $operator = null, $value = null): self;

    /**
     * Order results
     */
    public function orderBy(string $field, string $direction = 'asc'): self;

    /**
     * Limit results
     */
    public function limit(int $limit): self;
}
```

### Goal Repository Interface
```php
<?php

namespace App\Repositories\Contracts;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface GoalRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Get user's goals with optional filtering
     */
    public function getUserGoals(int $userId, array $filters = []): LengthAwarePaginator;

    /**
     * Get active goals for user
     */
    public function getActiveGoals(int $userId): Collection;

    /**
     * Get goal with micro-steps
     */
    public function getGoalWithSteps(int $goalId): Goal;

    /**
     * Get goals by category
     */
    public function getGoalsByCategory(string $category, int $userId = null): Collection;

    /**
     * Get goals by status
     */
    public function getGoalsByStatus(string $status, int $userId = null): Collection;

    /**
     * Count user's active goals
     */
    public function countActiveGoals(int $userId): int;

    /**
     * Get goals that need AI processing
     */
    public function getGoalsNeedingProcessing(): Collection;

    /**
     * Get user's completed goals
     */
    public function getCompletedGoals(int $userId): Collection;

    /**
     * Search goals by title
     */
    public function searchGoals(string $query, int $userId = null): Collection;

    /**
     * Get goals with progress statistics
     */
    public function getGoalsWithProgress(int $userId): Collection;

    /**
     * Archive completed goals
     */
    public function archiveCompletedGoals(int $userId): int;
}
```

### Goal Repository Implementation
```php
<?php

namespace App\Repositories\Eloquent;

use App\Models\Goal;
use App\Models\User;
use App\Repositories\Contracts\GoalRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class GoalRepository extends BaseRepository implements GoalRepositoryInterface
{
    /**
     * GoalRepository constructor
     */
    public function __construct(Goal $model)
    {
        parent::__construct($model);
    }

    /**
     * Get user's goals with optional filtering
     */
    public function getUserGoals(int $userId, array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->where('user_id', $userId);

        // Apply status filter
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Apply category filter
        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        // Apply date range filter
        if (isset($filters['created_from'])) {
            $query->where('created_at', '>=', $filters['created_from']);
        }

        if (isset($filters['created_to'])) {
            $query->where('created_at', '<=', $filters['created_to']);
        }

        // Load relationships
        $query->with(['microSteps' => function ($q) {
            $q->where('completed_at', null)->orderBy('order')->limit(1);
        }]);

        // Order by creation date
        $query->orderBy('created_at', 'desc');

        return $query->paginate($filters['per_page'] ?? 10);
    }

    /**
     * Get active goals for user
     */
    public function getActiveGoals(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->with(['microSteps' => function ($query) {
                $query->where('completed_at', null)->orderBy('order');
            }])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Get goal with micro-steps
     */
    public function getGoalWithSteps(int $goalId): Goal
    {
        return $this->model
            ->with(['microSteps' => function ($query) {
                $query->orderBy('order');
            }])
            ->findOrFail($goalId);
    }

    /**
     * Get goals by category
     */
    public function getGoalsByCategory(string $category, int $userId = null): Collection
    {
        $query = $this->model->where('category', $category);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Get goals by status
     */
    public function getGoalsByStatus(string $status, int $userId = null): Collection
    {
        $query = $this->model->where('status', $status);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        return $query->orderBy('updated_at', 'desc')->get();
    }

    /**
     * Count user's active goals
     */
    public function countActiveGoals(int $userId): int
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->count();
    }

    /**
     * Get goals that need AI processing
     */
    public function getGoalsNeedingProcessing(): Collection
    {
        return $this->model
            ->where('status', 'processing')
            ->whereNull('processed_at')
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get();
    }

    /**
     * Get user's completed goals
     */
    public function getCompletedGoals(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('status', 'completed')
            ->with(['microSteps'])
            ->orderBy('completed_at', 'desc')
            ->get();
    }

    /**
     * Search goals by title
     */
    public function searchGoals(string $query, int $userId = null): Collection
    {
        $builder = $this->model
            ->where('title', 'ILIKE', "%{$query}%");

        if ($userId) {
            $builder->where('user_id', $userId);
        }

        return $builder->orderBy('created_at', 'desc')->get();
    }

    /**
     * Get goals with progress statistics
     */
    public function getGoalsWithProgress(int $userId): Collection
    {
        return $this->model
            ->select('goals.*')
            ->selectRaw('
                COALESCE(
                    ROUND(
                        (COUNT(CASE WHEN micro_steps.completed_at IS NOT NULL THEN 1 END) * 100.0) / 
                        NULLIF(COUNT(micro_steps.id), 0)
                    ), 0
                ) as progress_percentage
            ')
            ->selectRaw('
                COUNT(CASE WHEN micro_steps.completed_at IS NOT NULL THEN 1 END) as completed_steps
            ')
            ->selectRaw('COUNT(micro_steps.id) as total_steps')
            ->leftJoin('micro_steps', 'goals.id', '=', 'micro_steps.goal_id')
            ->where('goals.user_id', $userId)
            ->groupBy('goals.id')
            ->orderBy('goals.created_at', 'desc')
            ->get();
    }

    /**
     * Archive completed goals
     */
    public function archiveCompletedGoals(int $userId): int
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('status', 'completed')
            ->where('completed_at', '<', now()->subDays(30))
            ->update(['status' => 'archived']);
    }
}
```

### Base Repository Implementation
```php
<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected Model $model;
    protected Builder $query;

    /**
     * BaseRepository constructor
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->resetQuery();
    }

    /**
     * Get all records
     */
    public function all(array $columns = ['*']): Collection
    {
        return $this->query->get($columns);
    }

    /**
     * Get paginated records
     */
    public function paginate(int $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        return $this->query->paginate($perPage, $columns);
    }

    /**
     * Find record by ID
     */
    public function find(int $id, array $columns = ['*']): ?Model
    {
        return $this->query->find($id, $columns);
    }

    /**
     * Find record by ID or fail
     */
    public function findOrFail(int $id, array $columns = ['*']): Model
    {
        return $this->query->findOrFail($id, $columns);
    }

    /**
     * Find record by field
     */
    public function findBy(string $field, $value, array $columns = ['*']): ?Model
    {
        return $this->query->where($field, $value)->first($columns);
    }

    /**
     * Find multiple records by field
     */
    public function findWhere(string $field, $value, array $columns = ['*']): Collection
    {
        return $this->query->where($field, $value)->get($columns);
    }

    /**
     * Create new record
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * Update record
     */
    public function update(Model $model, array $data): Model
    {
        $model->update($data);
        return $model->fresh();
    }

    /**
     * Delete record
     */
    public function delete(Model $model): bool
    {
        return $model->delete();
    }

    /**
     * Get records with relationships
     */
    public function with(array $relationships): self
    {
        $this->query = $this->query->with($relationships);
        return $this;
    }

    /**
     * Apply where conditions
     */
    public function where(string $field, $operator = null, $value = null): self
    {
        if ($value === null) {
            $value = $operator;
            $operator = '=';
        }

        $this->query = $this->query->where($field, $operator, $value);
        return $this;
    }

    /**
     * Order results
     */
    public function orderBy(string $field, string $direction = 'asc'): self
    {
        $this->query = $this->query->orderBy($field, $direction);
        return $this;
    }

    /**
     * Limit results
     */
    public function limit(int $limit): self
    {
        $this->query = $this->query->limit($limit);
        return $this;
    }

    /**
     * Reset the query builder
     */
    protected function resetQuery(): void
    {
        $this->query = $this->model->newQuery();
    }

    /**
     * Get the model instance
     */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
     * Set a new model instance
     */
    public function setModel(Model $model): self
    {
        $this->model = $model;
        $this->resetQuery();
        return $this;
    }
}
```

### Service Layer with Repository Pattern
```php
<?php

namespace App\Services;

use App\Models\Goal;
use App\Models\MicroStep;
use App\Models\User;
use App\Jobs\ProcessGoalWithAI;
use App\Repositories\Contracts\GoalRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GoalService
{
    protected GoalRepositoryInterface $goalRepository;
    protected UserRepositoryInterface $userRepository;
    protected AIService $aiService;
    protected NotificationService $notificationService;

    public function __construct(
        GoalRepositoryInterface $goalRepository,
        UserRepositoryInterface $userRepository,
        AIService $aiService,
        NotificationService $notificationService
    ) {
        $this->goalRepository = $goalRepository;
        $this->userRepository = $userRepository;
        $this->aiService = $aiService;
        $this->notificationService = $notificationService;
    }

    /**
     * Get user's goals with filtering and pagination
     */
    public function getUserGoals(int $userId, array $options = []): LengthAwarePaginator
    {
        return $this->goalRepository->getUserGoals($userId, $options);
    }

    /**
     * Create a new goal and queue AI processing
     */
    public function createGoal(array $goalData): Goal
    {
        return DB::transaction(function () use ($goalData) {
            // Create the goal
            $goal = $this->goalRepository->create([
                'user_id' => $goalData['user_id'],
                'title' => $goalData['title'],
                'category' => $goalData['category'],
                'target_days' => $goalData['target_days'] ?? 100,
                'difficulty_preference' => $goalData['difficulty_preference'] ?? 'medium',
                'status' => 'processing', // Will be 'active' after AI processing
            ]);

            // Queue AI processing job
            ProcessGoalWithAI::dispatch($goal);

            Log::info('Goal queued for AI processing', [
                'goal_id' => $goal->id,
                'user_id' => $goal->user_id
            ]);

            return $goal;
        });
    }

    /**
     * Get goal with micro-steps using repository
     */
    public function getGoalWithSteps(int $goalId): Goal
    {
        return $this->goalRepository->getGoalWithSteps($goalId);
    }

    /**
     * Update goal using repository
     */
    public function updateGoal(Goal $goal, array $data): Goal
    {
        return $this->goalRepository->update($goal, $data);
    }

    /**
     * Activate a goal
     */
    public function activateGoal(Goal $goal): Goal
    {
        return $this->goalRepository->update($goal, ['status' => 'active']);
    }

    /**
     * Pause a goal
     */
    public function pauseGoal(Goal $goal): Goal
    {
        return $this->goalRepository->update($goal, ['status' => 'paused']);
    }

    /**
     * Check if user can create more goals
     */
    public function canCreateGoal(User $user): bool
    {
        $activeGoalsCount = $this->goalRepository->countActiveGoals($user->id);
        
        // Free users: 1 goal, Premium users: unlimited
        return $user->isPremium() || $activeGoalsCount < 1;
    }

    /**
     * Get user's progress statistics
     */
    public function getUserProgressStats(int $userId): array
    {
        $goalsWithProgress = $this->goalRepository->getGoalsWithProgress($userId);
        $completedGoals = $this->goalRepository->getCompletedGoals($userId);
        
        return [
            'total_goals' => $goalsWithProgress->count(),
            'completed_goals' => $completedGoals->count(),
            'active_goals' => $goalsWithProgress->where('status', 'active')->count(),
            'average_progress' => $goalsWithProgress->avg('progress_percentage'),
            'total_steps_completed' => $goalsWithProgress->sum('completed_steps'),
        ];
    }

    /**
     * Search user's goals
     */
    public function searchUserGoals(string $query, int $userId): Collection
    {
        return $this->goalRepository->searchGoals($query, $userId);
    }

    /**
     * Archive old completed goals
     */
    public function archiveOldGoals(int $userId): int
    {
        return $this->goalRepository->archiveCompletedGoals($userId);
    }
}
```

---

## 🔄 Singleton Pattern Implementation

### Cache Manager Singleton
```php
<?php

namespace App\Singletons;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CacheManager
{
    private static ?CacheManager $instance = null;
    private array $tags = [];
    private int $defaultTtl = 3600; // 1 hour

    /**
     * Private constructor to prevent direct instantiation
     */
    private function __construct()
    {
        // Initialize cache settings
        $this->defaultTtl = config('cache.default_ttl', 3600);
    }

    /**
     * Prevent cloning of the instance
     */
    private function __clone() {}

    /**
     * Prevent unserialization of the instance
     */
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize singleton");
    }

    /**
     * Get the singleton instance
     */
    public static function getInstance(): CacheManager
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Set cache tags for the next operation
     */
    public function tags(array $tags): self
    {
        $this->tags = $tags;
        return $this;
    }

    /**
     * Store data in cache
     */
    public function put(string $key, $value, ?int $ttl = null): bool
    {
        try {
            $ttl = $ttl ?? $this->defaultTtl;
            
            if (!empty($this->tags)) {
                $result = Cache::tags($this->tags)->put($key, $value, $ttl);
                $this->tags = []; // Reset tags after use
                return $result;
            }

            return Cache::put($key, $value, $ttl);

        } catch (\Exception $e) {
            Log::error('Cache put operation failed', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Get data from cache
     */
    public function get(string $key, $default = null)
    {
        try {
            if (!empty($this->tags)) {
                $result = Cache::tags($this->tags)->get($key, $default);
                $this->tags = []; // Reset tags after use
                return $result;
            }

            return Cache::get($key, $default);

        } catch (\Exception $e) {
            Log::error('Cache get operation failed', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return $default;
        }
    }

    /**
     * Remember data in cache
     */
    public function remember(string $key, callable $callback, ?int $ttl = null)
    {
        try {
            $ttl = $ttl ?? $this->defaultTtl;

            if (!empty($this->tags)) {
                $result = Cache::tags($this->tags)->remember($key, $ttl, $callback);
                $this->tags = []; // Reset tags after use
                return $result;
            }

            return Cache::remember($key, $ttl, $callback);

        } catch (\Exception $e) {
            Log::error('Cache remember operation failed', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return $callback();
        }
    }

    /**
     * Check if key exists in cache
     */
    public function has(string $key): bool
    {
        try {
            if (!empty($this->tags)) {
                $result = Cache::tags($this->tags)->has($key);
                $this->tags = []; // Reset tags after use
                return $result;
            }

            return Cache::has($key);

        } catch (\Exception $e) {
            Log::error('Cache has operation failed', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Forget cache key
     */
    public function forget(string $key): bool
    {
        try {
            if (!empty($this->tags)) {
                $result = Cache::tags($this->tags)->forget($key);
                $this->tags = []; // Reset tags after use
                return $result;
            }

            return Cache::forget($key);

        } catch (\Exception $e) {
            Log::error('Cache forget operation failed', [
                'key' => $key,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Flush cache by tags
     */
    public function flushTags(array $tags): bool
    {
        try {
            Cache::tags($tags)->flush();
            return true;

        } catch (\Exception $e) {
            Log::error('Cache flush tags operation failed', [
                'tags' => $tags,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Generate cache key for user data
     */
    public function userKey(int $userId, string $suffix = ''): string
    {
        return "user:{$userId}" . ($suffix ? ":{$suffix}" : '');
    }

    /**
     * Generate cache key for goal data
     */
    public function goalKey(int $goalId, string $suffix = ''): string
    {
        return "goal:{$goalId}" . ($suffix ? ":{$suffix}" : '');
    }

    /**
     * Generate cache key for progress data
     */
    public function progressKey(int $userId, string $suffix = ''): string
    {
        return "progress:{$userId}" . ($suffix ? ":{$suffix}" : '');
    }

    /**
     * Cache user goals
     */
    public function cacheUserGoals(int $userId, $goals, int $ttl = 1800): bool
    {
        return $this->tags(['user_goals', "user_{$userId}"])
                   ->put($this->userKey($userId, 'goals'), $goals, $ttl);
    }

    /**
     * Get cached user goals
     */
    public function getCachedUserGoals(int $userId, $default = null)
    {
        return $this->tags(['user_goals', "user_{$userId}"])
                   ->get($this->userKey($userId, 'goals'), $default);
    }

    /**
     * Cache goal with steps
     */
    public function cacheGoalWithSteps(int $goalId, $goal, int $ttl = 3600): bool
    {
        return $this->tags(['goals', "goal_{$goalId}"])
                   ->put($this->goalKey($goalId, 'with_steps'), $goal, $ttl);
    }

    /**
     * Get cached goal with steps
     */
    public function getCachedGoalWithSteps(int $goalId, $default = null)
    {
        return $this->tags(['goals', "goal_{$goalId}"])
                   ->get($this->goalKey($goalId, 'with_steps'), $default);
    }

    /**
     * Invalidate user cache
     */
    public function invalidateUserCache(int $userId): bool
    {
        return $this->flushTags(["user_{$userId}", 'user_goals', 'user_progress']);
    }

    /**
     * Invalidate goal cache
     */
    public function invalidateGoalCache(int $goalId): bool
    {
        return $this->flushTags(["goal_{$goalId}", 'goals']);
    }
}
```

### Configuration Manager Singleton
```php
<?php

namespace App\Singletons;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class ConfigurationManager
{
    private static ?ConfigurationManager $instance = null;
    private array $runtimeConfig = [];
    private array $featuresFlags = [];

    /**
     * Private constructor to prevent direct instantiation
     */
    private function __construct()
    {
        $this->loadFeatureFlags();
    }

    /**
     * Prevent cloning of the instance
     */
    private function __clone() {}

    /**
     * Prevent unserialization of the instance
     */
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize singleton");
    }

    /**
     * Get the singleton instance
     */
    public static function getInstance(): ConfigurationManager
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Load feature flags from configuration
     */
    private function loadFeatureFlags(): void
    {
        $this->featuresFlags = [
            'ai_processing' => Config::get('features.ai_processing', true),
            'premium_features' => Config::get('features.premium_features', true),
            'social_sharing' => Config::get('features.social_sharing', false),
            'analytics_tracking' => Config::get('features.analytics_tracking', true),
            'push_notifications' => Config::get('features.push_notifications', true),
            'goal_templates' => Config::get('features.goal_templates', true),
            'collaboration' => Config::get('features.collaboration', false),
            'gamification' => Config::get('features.gamification', true),
        ];
    }

    /**
     * Check if a feature is enabled
     */
    public function isFeatureEnabled(string $feature): bool
    {
        return $this->featuresFlags[$feature] ?? false;
    }

    /**
     * Enable a feature
     */
    public function enableFeature(string $feature): void
    {
        $this->featuresFlags[$feature] = true;
        Log::info("Feature enabled: {$feature}");
    }

    /**
     * Disable a feature
     */
    public function disableFeature(string $feature): void
    {
        $this->featuresFlags[$feature] = false;
        Log::info("Feature disabled: {$feature}");
    }

    /**
     * Get all feature flags
     */
    public function getAllFeatures(): array
    {
        return $this->featuresFlags;
    }

    /**
     * Set runtime configuration
     */
    public function setRuntimeConfig(string $key, $value): void
    {
        $this->runtimeConfig[$key] = $value;
    }

    /**
     * Get runtime configuration
     */
    public function getRuntimeConfig(string $key, $default = null)
    {
        return $this->runtimeConfig[$key] ?? $default;
    }

    /**
     * Get AI service configuration
     */
    public function getAIConfig(): array
    {
        return [
            'enabled' => $this->isFeatureEnabled('ai_processing'),
            'api_key' => Config::get('services.openai.api_key'),
            'model' => Config::get('services.openai.model', 'gpt-4'),
            'max_tokens' => Config::get('services.openai.max_tokens', 4000),
            'temperature' => Config::get('services.openai.temperature', 0.7),
            'timeout' => Config::get('services.openai.timeout', 120),
        ];
    }

    /**
     * Get cache configuration
     */
    public function getCacheConfig(): array
    {
        return [
            'driver' => Config::get('cache.default'),
            'prefix' => Config::get('cache.prefix'),
            'default_ttl' => Config::get('cache.default_ttl', 3600),
            'user_goals_ttl' => Config::get('cache.user_goals_ttl', 1800),
            'goal_steps_ttl' => Config::get('cache.goal_steps_ttl', 3600),
            'analytics_ttl' => Config::get('cache.analytics_ttl', 7200),
        ];
    }

    /**
     * Get notification configuration
     */
    public function getNotificationConfig(): array
    {
        return [
            'enabled' => $this->isFeatureEnabled('push_notifications'),
            'daily_reminder' => Config::get('notifications.daily_reminder', true),
            'milestone_celebration' => Config::get('notifications.milestone_celebration', true),
            'streak_motivation' => Config::get('notifications.streak_motivation', true),
            'goal_completion' => Config::get('notifications.goal_completion', true),
        ];
    }

    /**
     * Get rate limiting configuration
     */
    public function getRateLimitConfig(): array
    {
        return [
            'api_requests' => Config::get('rate_limit.api_requests', 100),
            'goal_creation' => Config::get('rate_limit.goal_creation', 5),
            'ai_processing' => Config::get('rate_limit.ai_processing', 10),
            'step_completion' => Config::get('rate_limit.step_completion', 50),
        ];
    }

    /**
     * Get subscription limits
     */
    public function getSubscriptionLimits(string $plan = 'free'): array
    {
        $limits = [
            'free' => [
                'max_goals' => 1,
                'ai_requests_per_day' => 5,
                'goal_categories' => ['personal', 'health', 'learning'],
                'features' => ['basic_tracking', 'progress_charts'],
            ],
            'premium' => [
                'max_goals' => -1, // unlimited
                'ai_requests_per_day' => 100,
                'goal_categories' => ['personal', 'health', 'learning', 'career', 'finance', 'social', 'creativity'],
                'features' => ['advanced_analytics', 'collaboration', 'export_data', 'priority_support'],
            ],
        ];

        return $limits[$plan] ?? $limits['free'];
    }

    /**
     * Update feature flags from database or external source
     */
    public function refreshFeatureFlags(): void
    {
        // This could load from database, external API, or feature flag service
        $this->loadFeatureFlags();
        Log::info('Feature flags refreshed');
    }
}
```

### Log Manager Singleton
```php
<?php

namespace App\Singletons;

use Illuminate\Support\Facades\Log;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Formatter\JsonFormatter;

class LogManager
{
    private static ?LogManager $instance = null;
    private array $loggers = [];
    private array $contexts = [];

    /**
     * Private constructor to prevent direct instantiation
     */
    private function __construct()
    {
        $this->initializeLoggers();
    }

    /**
     * Prevent cloning of the instance
     */
    private function __clone() {}

    /**
     * Prevent unserialization of the instance
     */
    public function __wakeup()
    {
        throw new \Exception("Cannot unserialize singleton");
    }

    /**
     * Get the singleton instance
     */
    public static function getInstance(): LogManager
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Initialize custom loggers
     */
    private function initializeLoggers(): void
    {
        // Goal operations logger
        $goalLogger = new Logger('goals');
        $goalLogger->pushHandler(
            new RotatingFileHandler(
                storage_path('logs/goals.log'),
                7,
                Logger::INFO
            )
        );
        $this->loggers['goals'] = $goalLogger;

        // AI operations logger
        $aiLogger = new Logger('ai');
        $aiLogger->pushHandler(
            new RotatingFileHandler(
                storage_path('logs/ai.log'),
                7,
                Logger::INFO
            )
        );
        $aiLogger->pushProcessor(function ($record) {
            $record['extra']['service'] = 'ai';
            return $record;
        });
        $this->loggers['ai'] = $aiLogger;

        // Performance logger
        $performanceLogger = new Logger('performance');
        $performanceLogger->pushHandler(
            new StreamHandler(
                storage_path('logs/performance.log'),
                Logger::INFO
            )
        );
        $performanceLogger->pushProcessor(function ($record) {
            $record['extra']['timestamp'] = microtime(true);
            return $record;
        });
        $this->loggers['performance'] = $performanceLogger;

        // User activity logger
        $activityLogger = new Logger('activity');
        $activityLogger->pushHandler(
            new RotatingFileHandler(
                storage_path('logs/user_activity.log'),
                30,
                Logger::INFO
            )
        );
        $activityLogger->pushFormatter(new JsonFormatter());
        $this->loggers['activity'] = $activityLogger;
    }

    /**
     * Set context for subsequent log entries
     */
    public function setContext(array $context): self
    {
        $this->contexts = array_merge($this->contexts, $context);
        return $this;
    }

    /**
     * Clear context
     */
    public function clearContext(): self
    {
        $this->contexts = [];
        return $this;
    }

    /**
     * Log goal creation
     */
    public function logGoalCreated(int $goalId, int $userId, string $title): void
    {
        $this->loggers['goals']->info('Goal created', array_merge($this->contexts, [
            'action' => 'goal_created',
            'goal_id' => $goalId,
            'user_id' => $userId,
            'title' => $title,
            'timestamp' => now()->toISOString(),
        ]));
    }

    /**
     * Log goal completion
     */
    public function logGoalCompleted(int $goalId, int $userId, int $daysTaken): void
    {
        $this->loggers['goals']->info('Goal completed', array_merge($this->contexts, [
            'action' => 'goal_completed',
            'goal_id' => $goalId,
            'user_id' => $userId,
            'days_taken' => $daysTaken,
            'timestamp' => now()->toISOString(),
        ]));
    }

    /**
     * Log step completion
     */
    public function logStepCompleted(int $stepId, int $goalId, int $userId, int $stepNumber): void
    {
        $this->loggers['goals']->info('Step completed', array_merge($this->contexts, [
            'action' => 'step_completed',
            'step_id' => $stepId,
            'goal_id' => $goalId,
            'user_id' => $userId,
            'step_number' => $stepNumber,
            'timestamp' => now()->toISOString(),
        ]));
    }

    /**
     * Log AI processing
     */
    public function logAIProcessing(int $goalId, string $operation, float $duration, bool $success = true): void
    {
        $level = $success ? 'info' : 'error';
        
        $this->loggers['ai']->$level('AI processing', array_merge($this->contexts, [
            'action' => 'ai_processing',
            'operation' => $operation,
            'goal_id' => $goalId,
            'duration_seconds' => $duration,
            'success' => $success,
            'timestamp' => now()->toISOString(),
        ]));
    }

    /**
     * Log performance metrics
     */
    public function logPerformance(string $operation, float $duration, array $metrics = []): void
    {
        $this->loggers['performance']->info('Performance metric', array_merge($this->contexts, [
            'operation' => $operation,
            'duration_ms' => $duration * 1000,
            'memory_usage' => memory_get_usage(true),
            'peak_memory' => memory_get_peak_usage(true),
        ], $metrics));
    }

    /**
     * Log user activity
     */
    public function logUserActivity(int $userId, string $action, array $data = []): void
    {
        $this->loggers['activity']->info('User activity', array_merge($this->contexts, [
            'user_id' => $userId,
            'action' => $action,
            'data' => $data,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'timestamp' => now()->toISOString(),
        ]));
    }

    /**
     * Log error with context
     */
    public function logError(string $message, \Exception $exception, array $context = []): void
    {
        Log::error($message, array_merge($this->contexts, $context, [
            'exception' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ]));
    }

    /**
     * Get daily activity summary
     */
    public function getDailyActivitySummary(\DateTime $date): array
    {
        // This would typically read from log files or database
        // Implementation depends on your log storage solution
        return [
            'date' => $date->format('Y-m-d'),
            'goal_creations' => 0,
            'step_completions' => 0,
            'goal_completions' => 0,
            'active_users' => 0,
            'ai_requests' => 0,
        ];
    }

    /**
     * Archive old logs
     */
    public function archiveOldLogs(int $daysToKeep = 30): void
    {
        $cutoffDate = now()->subDays($daysToKeep);
        
        // Archive logic would go here
        Log::info('Log archival completed', [
            'cutoff_date' => $cutoffDate->toISOString(),
            'days_kept' => $daysToKeep,
        ]);
    }
}
```

### Using Singletons in Services
```php
<?php

namespace App\Services;

use App\Models\Goal;
use App\Repositories\Contracts\GoalRepositoryInterface;
use App\Singletons\CacheManager;
use App\Singletons\ConfigurationManager;
use App\Singletons\LogManager;

class EnhancedGoalService
{
    protected GoalRepositoryInterface $goalRepository;
    protected CacheManager $cache;
    protected ConfigurationManager $config;
    protected LogManager $logger;

    public function __construct(GoalRepositoryInterface $goalRepository)
    {
        $this->goalRepository = $goalRepository;
        $this->cache = CacheManager::getInstance();
        $this->config = ConfigurationManager::getInstance();
        $this->logger = LogManager::getInstance();
    }

    /**
     * Get user goals with caching
     */
    public function getUserGoals(int $userId, array $options = [])
    {
        $startTime = microtime(true);

        // Check cache first
        $cacheKey = $this->cache->userKey($userId, 'goals_' . md5(serialize($options)));
        $goals = $this->cache->getCachedUserGoals($userId);

        if ($goals === null) {
            // Load from repository
            $goals = $this->goalRepository->getUserGoals($userId, $options);
            
            // Cache the results
            $this->cache->cacheUserGoals($userId, $goals, $this->config->getCacheConfig()['user_goals_ttl']);
            
            $this->logger->logUserActivity($userId, 'goals_loaded_from_db');
        } else {
            $this->logger->logUserActivity($userId, 'goals_loaded_from_cache');
        }

        // Log performance
        $this->logger->logPerformance('get_user_goals', microtime(true) - $startTime, [
            'user_id' => $userId,
            'goals_count' => $goals->count(),
            'cache_hit' => $goals !== null,
        ]);

        return $goals;
    }

    /**
     * Create goal with enhanced logging and caching
     */
    public function createGoal(array $goalData): Goal
    {
        $startTime = microtime(true);

        // Check feature flag
        if (!$this->config->isFeatureEnabled('goal_creation')) {
            throw new \Exception('Goal creation is currently disabled');
        }

        // Check rate limits
        $limits = $this->config->getSubscriptionLimits();
        $userGoalsCount = $this->goalRepository->countActiveGoals($goalData['user_id']);
        
        if ($limits['max_goals'] > 0 && $userGoalsCount >= $limits['max_goals']) {
            throw new \Exception('Goal limit exceeded');
        }

        try {
            $goal = $this->goalRepository->create($goalData);

            // Log goal creation
            $this->logger->logGoalCreated($goal->id, $goal->user_id, $goal->title);

            // Invalidate user cache
            $this->cache->invalidateUserCache($goal->user_id);

            // Log performance
            $this->logger->logPerformance('create_goal', microtime(true) - $startTime, [
                'goal_id' => $goal->id,
                'user_id' => $goal->user_id,
            ]);

            return $goal;

        } catch (\Exception $e) {
            $this->logger->logError('Goal creation failed', $e, [
                'user_id' => $goalData['user_id'],
                'goal_data' => $goalData,
            ]);
            throw $e;
        }
    }

    /**
     * Complete step with comprehensive logging
     */
    public function completeStep(int $stepId, int $userId): array
    {
        $startTime = microtime(true);

        try {
            // Implementation here...
            $result = [
                'step_id' => $stepId,
                'user_id' => $userId,
                'completed_at' => now(),
            ];

            // Log step completion
            $this->logger->logStepCompleted($stepId, $result['goal_id'], $userId, $result['step_number']);

            // Invalidate caches
            $this->cache->invalidateUserCache($userId);
            $this->cache->invalidateGoalCache($result['goal_id']);

            // Log performance
            $this->logger->logPerformance('complete_step', microtime(true) - $startTime, [
                'step_id' => $stepId,
                'user_id' => $userId,
            ]);

            return $result;

        } catch (\Exception $e) {
            $this->logger->logError('Step completion failed', $e, [
                'step_id' => $stepId,
                'user_id' => $userId,
            ]);
            throw $e;
        }
    }
}
```

---

## 🔒 Security & Validation Guidelines

### Laravel Request Validation
```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateGoalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'min:10',
                'max:200',
                'regex:/^[a-zA-Z0-9\s\-\'\".,!?]+$/' // Allow basic punctuation
            ],
            'category' => [
                'required',
                Rule::in(['social', 'health', 'career', 'learning', 'creativity', 'finance', 'personal'])
            ],
            'target_days' => [
                'sometimes',
                'integer',
                'min:30',
                'max:365'
            ],
            'difficulty_preference' => [
                'sometimes',
                Rule::in(['easy', 'medium', 'hard'])
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please describe your goal.',
            'title.min' => 'Your goal description should be at least 10 characters.',
            'title.max' => 'Please keep your goal description under 200 characters.',
            'title.regex' => 'Please use only letters, numbers, and basic punctuation.',
            'category.required' => 'Please select a category for your goal.',
            'category.in' => 'Please select a valid category.',
            'target_days.min' => 'Goals must be at least 30 days long.',
            'target_days.max' => 'Goals cannot exceed 365 days.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'title' => trim($this->title),
            'target_days' => $this->target_days ?? 100,
            'difficulty_preference' => $this->difficulty_preference ?? 'medium',
        ]);
    }
}
```

---

## 📱 React Native Navigation Patterns

### Navigation Structure
```tsx
// ✅ App navigation setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import AuthStackNavigator from './AuthStackNavigator';
import OnboardingScreen from '@/screens/auth/OnboardingScreen';
import HomeScreen from '@/screens/dashboard/HomeScreen';
import CreateGoalScreen from '@/screens/goals/CreateGoalScreen';
import ProgressScreen from '@/screens/progress/ProgressScreen';
import ProfileScreen from '@/screens/profile/ProfileScreen';
import TaskScreen from '@/screens/goals/TaskScreen';

// Types
import { RootState } from '@/store';
import { colors } from '@/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Progress':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'circle';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border,
          paddingTop: 8,
          height: 88,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, hasCompletedOnboarding } = useSelector((state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    hasCompletedOnboarding: state.auth.user?.hasCompletedOnboarding ?? false,
  }));

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
        ) : !hasCompletedOnboarding ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen 
              name="CreateGoal" 
              component={CreateGoalScreen}
              options={{
                presentation: 'modal',
                headerShown: true,
                title: 'Create New Goal'
              }}
            />
            <Stack.Screen 
              name="Task" 
              component={TaskScreen}
              options={{
                headerShown: true,
                title: "Today's Mission"
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## 🎨 Design System & Theme

### Theme Constants
```tsx
// ✅ Complete design system
export const colors = {
  // Primary brand colors
  primary: '#6C63FF',
  primaryDark: '#5A52E8',
  primaryLight: '#8A84FF',
  
  // Secondary colors
  secondary: '#FF6584',
  secondaryDark: '#E8576F',
  secondaryLight: '#FF8FA3',
  
  // Status colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    tertiary: '#F5F5F5',
    card: '#FFFFFF',
    modal: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
    link: '#6C63FF',
  },
  
  // Border and divider colors
  border: '#E5E7EB',
  divider: '#F3F4F6',
  
  // Other utility colors
  shadow: '#000000',
  disabled: '#D1D5DB',
  placeholder: '#9CA3AF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};
```

---

## ⚠️ Critical Rules for AI Agent

### MUST DO - Frontend (React Native)
- ✅ **Use TypeScript** for all components and services
- ✅ **Follow React Native best practices** with proper hooks usage
- ✅ **Implement comprehensive error boundaries** for all screens
- ✅ **Add accessibility props** (accessibilityLabel, accessibilityHint) for all interactive elements
- ✅ **Use Redux Toolkit** for state management with proper async thunks
- ✅ **Include loading and error states** for all async operations
- ✅ **Implement celebration animations** using Lottie for milestone achievements
- ✅ **Add proper navigation typing** with React Navigation v6
- ✅ **Use design system constants** for colors, spacing, and typography
- ✅ **Include proper testing** with React Native Testing Library

### MUST DO - Backend (Laravel)
- ✅ **Follow PSR-12 coding standards** for all PHP code
- ✅ **Use Repository Pattern** for data access layer abstraction
- ✅ **Implement Singleton Pattern** for shared resources (cache, config, logging)
- ✅ **Use Eloquent ORM** for all database operations through repositories
- ✅ **Implement proper request validation** using Form Requests
- ✅ **Use service layer pattern** for business logic with dependency injection
- ✅ **Add comprehensive logging** using LogManager singleton for all operations
- ✅ **Implement proper error handling** with try-catch blocks
- ✅ **Use Laravel queues** for long-running operations (AI processing)
- ✅ **Add API resource transformers** for consistent response format
- ✅ **Include proper authentication** using Laravel Sanctum
- ✅ **Write feature and unit tests** for all functionality
- ✅ **Use CacheManager singleton** for all caching operations
- ✅ **Implement ConfigurationManager** for feature flags and settings

### Repository Pattern Requirements
- ✅ **Create repository interfaces** for all major entities (Goal, User, Progress)
- ✅ **Implement repository classes** that extend BaseRepository
- ✅ **Use dependency injection** to inject repositories into services
- ✅ **Include method-specific queries** in repository implementations
- ✅ **Add caching layer** in repositories using CacheManager singleton
- ✅ **Implement proper error handling** in repository methods

### Singleton Pattern Requirements
- ✅ **Use private constructors** to prevent direct instantiation
- ✅ **Implement __clone() prevention** to avoid cloning
- ✅ **Add __wakeup() protection** against unserialization
- ✅ **Use static getInstance() method** for accessing singleton instances
- ✅ **Thread-safe implementation** for singleton instances
- ✅ **Proper cleanup and resource management** in singleton classes

### NEVER DO
- ❌ **Skip input validation** - Validate on both frontend and backend
- ❌ **Hardcode API endpoints** - Use environment configuration
- ❌ **Store sensitive data insecurely** - Use proper encryption and secure storage
- ❌ **Ignore accessibility** - Support screen readers and keyboard navigation
- ❌ **Skip error handling** - Handle all possible error scenarios
- ❌ **Use raw SQL queries** - Use Eloquent ORM through repositories
- ❌ **Expose sensitive information** in API responses or logs
- ❌ **Skip rate limiting** - Implement proper API rate limiting
- ❌ **Ignore performance** - Optimize queries and API responses
- ❌ **Skip database transactions** - Use transactions for multi-step operations
- ❌ **Create multiple singleton instances** - Ensure proper singleton implementation
- ❌ **Access database directly from controllers** - Always use repository pattern
- ❌ **Bypass caching layer** - Use CacheManager for all caching needs

### CODE QUALITY CHECKLIST
Before submitting any code, ensure:
- [ ] All async operations have proper error handling
- [ ] TypeScript types are defined for all data structures
- [ ] Components are responsive and work on all screen sizes
- [ ] Loading states are implemented for all async operations
- [ ] Error states are handled gracefully with user-friendly messages
- [ ] Accessibility attributes are included for all interactive elements
- [ ] Performance is optimized (lazy loading, memoization)
- [ ] Security best practices are followed (input validation, authentication)
- [ ] Repository pattern is used for all data access
- [ ] Singleton pattern is properly implemented for shared resources
- [ ] Database operations use proper Eloquent relationships through repositories
- [ ] API responses follow consistent format with proper HTTP status codes
- [ ] Laravel queues are used for long-running operations
- [ ] Comprehensive logging is included using LogManager singleton
- [ ] Caching is implemented using CacheManager singleton
- [ ] Feature flags are managed through ConfigurationManager
- [ ] Tests are written for both frontend components and backend functionality

---

## 📋 Project-Specific Features

### Goal Creation Flow
```tsx
// ✅ Multi-step goal creation with AI processing
interface CreateGoalFormData {
  title: string;
  category: GoalCategory;
  targetDays: number;
  difficultyPreference: 'easy' | 'medium' | 'hard';
}

// Component should include:
// - Text input with validation (min 10 chars)
// - Category picker with icons
// - Difficulty selector with descriptions
// - AI processing status display
// - Generated steps preview and editing
// - Save as draft functionality
```

### Daily Task Interface
```tsx
// ✅ Today's mission screen requirements
interface TodaysMissionProps {
  currentStep: MicroStep;
  goalProgress: number;
  streakCount: number;
}

// Features to implement:
// - Step counter (X of 100)
// - Progress bar animation
// - Task title and description
// - Expandable tips section
// - Complete/Skip/Swap buttons
// - Celebration animation on completion
// - Navigation to next step
```

### Progress Analytics
```tsx
// ✅ Analytics dashboard requirements
interface ProgressAnalyticsProps {
  goals: Goal[];
  completionData: CompletionData[];
  streakData: StreakData;
}

// Charts to implement:
// - Calendar heat map (react-native-calendar-heatmap)
// - Progress line chart (victory-native)
// - Completion rate pie chart
// - Weekly/monthly toggle
// - Export functionality
// - Social sharing
```

---

## 🚀 API Endpoints Reference

### Authentication Endpoints
```
POST   /api/auth/register      - User registration
POST   /api/auth/login         - User login
POST   /api/auth/logout        - User logout
POST   /api/auth/refresh       - Refresh JWT token
POST   /api/auth/forgot        - Password reset request
POST   /api/auth/reset         - Password reset confirmation
```

### Goal Management Endpoints
```
GET    /api/goals              - List user's goals
POST   /api/goals              - Create new goal
GET    /api/goals/{id}         - Get goal details
PUT    /api/goals/{id}         - Update goal
DELETE /api/goals/{id}         - Delete goal
POST   /api/goals/{id}/activate - Activate goal
POST   /api/goals/{id}/pause    - Pause goal
GET    /api/goals/templates     - Get goal templates
```

### Step Management Endpoints
```
GET    /api/steps/today        - Get today's step
POST   /api/steps/{id}/complete - Complete step
POST   /api/steps/{id}/skip     - Skip step
POST   /api/steps/{id}/swap     - Swap step
GET    /api/goals/{id}/steps    - Get goal steps
```

### Progress & Analytics Endpoints
```
GET    /api/progress/dashboard  - Dashboard summary
GET    /api/progress/streaks    - Streak information
GET    /api/progress/timeline   - Progress timeline
GET    /api/progress/stats      - Statistics summary
GET    /api/progress/export     - Export progress data
```

---

## 🛠️ Service Provider Registration

### Repository Service Provider
```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\GoalRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Contracts\ProgressRepositoryInterface;
use App\Repositories\Eloquent\GoalRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Eloquent\ProgressRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(GoalRepositoryInterface::class, GoalRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(ProgressRepositoryInterface::class, ProgressRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
```

---

## 📚 Additional Resources

### Frontend Documentation
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)

### Backend Documentation
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Eloquent ORM](https://laravel.com/docs/eloquent)
- [Laravel Queues](https://laravel.com/docs/queues)
- [Laravel Sanctum Authentication](https://laravel.com/docs/sanctum)
- [Laravel Testing](https://laravel.com/docs/testing)

### Design Patterns
- [Repository Pattern in Laravel](https://asperbrothers.com/blog/repository-pattern-in-laravel/)
- [Singleton Pattern in PHP](https://refactoring.guru/design-patterns/singleton/php/example)
- [Laravel Service Container](https://laravel.com/docs/container)

---

*This README serves as the definitive guide for MicroWins app development. The AI development agent must strictly adhere to these guidelines to ensure consistent, high-quality code generation that delivers an exceptional goal-tracking experience using Repository Architecture and Singleton Pattern implementations.*
