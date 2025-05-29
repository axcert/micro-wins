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
mkdir -p microwinds-api/{app/{Http/{Controllers,Middleware,Requests,Resources},Models,Services,Jobs,Events,Listeners,Mail,Notifications},database/{migrations,seeders,factories},routes,config,storage/{app,framework,logs},resources/{views},tests/{Feature,Unit}}

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

### Service Layer Pattern
```php
<?php

namespace App\Services;

use App\Models\Goal;
use App\Models\MicroStep;
use App\Models\User;
use App\Jobs\ProcessGoalWithAI;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class GoalService
{
    protected AIService $aiService;
    protected NotificationService $notificationService;

    public function __construct(AIService $aiService, NotificationService $notificationService)
    {
        $this->aiService = $aiService;
        $this->notificationService = $notificationService;
    }

    /**
     * Get user's goals with filtering and pagination
     */
    public function getUserGoals(int $userId, array $options = []): LengthAwarePaginator
    {
        $query = Goal::where('user_id', $userId)
            ->with(['microSteps' => function ($query) {
                $query->where('completed_at', null)
                    ->orderBy('order')
                    ->limit(1);
            }]);

        // Apply status filter
        if (isset($options['status'])) {
            $query->where('status', $options['status']);
        }

        // Order by creation date
        $query->orderBy('created_at', 'desc');

        return $query->paginate($options['per_page'] ?? 10);
    }

    /**
     * Create a new goal and queue AI processing
     */
    public function createGoal(array $goalData): Goal
    {
        return DB::transaction(function () use ($goalData) {
            // Create the goal
            $goal = Goal::create([
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
     * Process goal with AI and create micro-steps
     */
    public function processGoalWithAI(Goal $goal): void
    {
        try {
            $goal->update(['status' => 'processing']);

            // Generate micro-steps using AI
            $microSteps = $this->aiService->generateMicroSteps([
                'title' => $goal->title,
                'category' => $goal->category,
                'target_days' => $goal->target_days,
                'difficulty' => $goal->difficulty_preference,
            ]);

            // Create micro-steps in database
            $stepsData = collect($microSteps)->map(function ($step, $index) use ($goal) {
                return [
                    'goal_id' => $goal->id,
                    'order' => $index + 1,
                    'title' => $step['title'],
                    'description' => $step['description'],
                    'tips' => json_encode($step['tips'] ?? []),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })->toArray();

            MicroStep::insert($stepsData);

            // Update goal status
            $goal->update([
                'status' => 'active',
                'processed_at' => now(),
            ]);

            // Send notification to user
            $this->notificationService->sendGoalReadyNotification($goal);

            Log::info('Goal processed successfully', [
                'goal_id' => $goal->id,
                'steps_created' => count($stepsData)
            ]);

        } catch (\Exception $e) {
            $goal->update(['status' => 'failed']);
            
            Log::error('Goal processing failed', [
                'goal_id' => $goal->id,
                'error' => $e->getMessage()
            ]);

            throw $e;
        }
    }

    /**
     * Get goal with micro-steps
     */
    public function getGoalWithSteps(int $goalId): Goal
    {
        return Goal::with(['microSteps' => function ($query) {
            $query->orderBy('order');
        }])->findOrFail($goalId);
    }

    /**
     * Update goal
     */
    public function updateGoal(Goal $goal, array $data): Goal
    {
        $goal->update($data);
        return $goal->fresh();
    }

    /**
     * Activate a goal
     */
    public function activateGoal(Goal $goal): Goal
    {
        $goal->update(['status' => 'active']);
        return $goal;
    }

    /**
     * Pause a goal
     */
    public function pauseGoal(Goal $goal): Goal
    {
        $goal->update(['status' => 'paused']);
        return $goal;
    }

    /**
     * Check if user can create more goals
     */
    public function canCreateGoal(User $user): bool
    {
        $activeGoalsCount = $user->goals()->where('status', 'active')->count();
        
        // Free users: 1 goal, Premium users: unlimited
        return $user->isPremium() || $activeGoalsCount < 1;
    }

    /**
     * Get today's step for user
     */
    public function getTodaysStep(int $userId): ?MicroStep
    {
        return MicroStep::whereHas('goal', function ($query) use ($userId) {
            $query->where('user_id', $userId)
                  ->where('status', 'active');
        })
        ->where('completed_at', null)
        ->orderBy('order')
        ->first();
    }

    /**
     * Complete a micro-step
     */
    public function completeStep(int $stepId, int $userId): array
    {
        return DB::transaction(function () use ($stepId, $userId) {
            $step = MicroStep::whereHas('goal', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->findOrFail($stepId);

            if ($step->completed_at) {
                throw new \Exception('Step already completed');
            }

            // Mark step as completed
            $step->update(['completed_at' => now()]);

            // Calculate progress
            $progress = $this->calculateProgress($step->goal_id);

            // Get next step
            $nextStep = MicroStep::where('goal_id', $step->goal_id)
                ->where('completed_at', null)
                ->orderBy('order')
                ->first();

            // Update user progress
            $step->goal->user->increment('total_steps_completed');

            // Check for milestones
            if ($progress % 10 === 0) {
                $this->createMilestone($step->goal_id, $progress);
            }

            return [
                'step' => $step,
                'progress' => $progress,
                'next_step' => $nextStep,
                'goal_id' => $step->goal_id,
            ];
        });
    }

    /**
     * Calculate goal progress percentage
     */
    public function calculateProgress(int $goalId): int
    {
        $totalSteps = MicroStep::where('goal_id', $goalId)->count();
        $completedSteps = MicroStep::where('goal_id', $goalId)
            ->whereNotNull('completed_at')
            ->count();

        return $totalSteps > 0 ? round(($completedSteps / $totalSteps) * 100) : 0;
    }

    /**
     * Create milestone achievement
     */
    protected function createMilestone(int $goalId, int $progress): void
    {
        // Implementation for milestone creation
        Log::info('Milestone reached', [
            'goal_id' => $goalId,
            'progress' => $progress
        ]);
    }

    /**
     * Get goal templates
     */
    public function getGoalTemplates(): array
    {
        return [
            [
                'id' => 'learn_language',
                'title' => 'Learn a New Language',
                'category' => 'learning',
                'description' => 'Master a new language through daily practice',
                'difficulty' => 'medium',
                'estimated_days' => 90,
            ],
            [
                'id' => 'get_fit',
                'title' => 'Get in Shape',
                'category' => 'health',
                'description' => 'Build fitness through consistent exercise',
                'difficulty' => 'medium',
                'estimated_days' => 60,
            ],
            // Add more templates
        ];
    }
}
```

### AI Service Pattern
```php
<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class AIService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openai.api_key');
        $this->baseUrl = config('services.openai.base_url', 'https://api.openai.com/v1');
    }

    /**
     * Generate 100 micro-steps for a goal using AI
     */
    public function generateMicroSteps(array $goalData): array
    {
        $cacheKey = 'microsteps_' . md5(json_encode($goalData));
        
        // Check cache first
        if (Cache::has($cacheKey)) {
            Log::info('Using cached micro-steps', ['goal' => $goalData['title']]);
            return Cache::get($cacheKey);
        }

        try {
            $prompt = $this->buildMicroStepsPrompt($goalData);
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(120)->post($this->baseUrl . '/chat/completions', [
                'model' => 'gpt-4',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'You are an expert life coach who breaks down big goals into exactly 100 manageable micro-steps. Each step should be specific, actionable, and build upon the previous ones.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'temperature' => 0.7,
                'max_tokens' => 4000,
            ]);

            if (!$response->successful()) {
                throw new \Exception('AI API request failed: ' . $response->body());
            }

            $content = $response->json()['choices'][0]['message']['content'];
            $microSteps = $this->parseMicroStepsResponse($content);

            if (count($microSteps) !== 100) {
                throw new \Exception('Expected 100 steps, got ' . count($microSteps));
            }

            // Cache for 24 hours
            Cache::put($cacheKey, $microSteps, now()->addDay());

            Log::info('Generated micro-steps successfully', [
                'goal' => $goalData['title'],
                'steps_count' => count($microSteps)
            ]);

            return $microSteps;

        } catch (\Exception $e) {
            Log::error('AI micro-steps generation failed', [
                'goal' => $goalData['title'],
                'error' => $e->getMessage()
            ]);

            // Return fallback steps if AI fails
            return $this->getFallbackSteps($goalData);
        }
    }

    /**
     * Build the prompt for AI micro-step generation
     */
    protected function buildMicroStepsPrompt(array $goalData): string
    {
        return sprintf(
            "Generate exactly 100 micro-steps to achieve this goal: \"%s\"\n\n" .
            "Goal Details:\n" .
            "- Category: %s\n" .
            "- Timeline: %d days\n" .
            "- Difficulty: %s\n\n" .
            "Requirements:\n" .
            "- Each step must be completable in 15-30 minutes\n" .
            "- Steps should build upon each other logically\n" .
            "- Include variety to maintain engagement\n" .
            "- Make steps specific and actionable\n" .
            "- Progress from basic to advanced concepts\n\n" .
            "Format each step as JSON:\n" .
            "{\n" .
            "  \"title\": \"Brief, actionable title (max 50 chars)\",\n" .
            "  \"description\": \"Detailed instructions (100-200 words)\",\n" .
            "  \"tips\": [\"helpful tip 1\", \"helpful tip 2\"]\n" .
            "}\n\n" .
            "Return as a JSON array of exactly 100 steps.",
            $goalData['title'],
            $goalData['category'],
            $goalData['target_days'],
            $goalData['difficulty']
        );
    }

    /**
     * Parse AI response into structured micro-steps
     */
    protected function parseMicroStepsResponse(string $response): array
    {
        try {
            // Clean response
            $cleaned = preg_replace('/```json\n?|\n?```/', '', $response);
            $cleaned = trim($cleaned);
            
            $steps = json_decode($cleaned, true);
            
            if (!is_array($steps)) {
                throw new \Exception('Response is not an array');
            }

            return array_map(function ($step, $index) {
                return [
                    'title' => $step['title'] ?? "Step " . ($index + 1),
                    'description' => $step['description'] ?? $step['title'] ?? '',
                    'tips' => is_array($step['tips'] ?? null) ? $step['tips'] : []
                ];
            }, $steps, array_keys($steps));

        } catch (\Exception $e) {
            Log::error('Failed to parse AI response', [
                'error' => $e->getMessage(),
                'response_preview' => substr($response, 0, 500)
            ]);
            
            throw new \Exception('Invalid AI response format');
        }
    }

    /**
     * Get fallback steps when AI fails
     */
    protected function getFallbackSteps(array $goalData): array
    {
        // Return generic steps based on category
        $templates = [
            'learning' => [
                ['title' => 'Set up learning space', 'description' => 'Create a dedicated space for learning.', 'tips' => []],
                ['title' => 'Define learning objectives', 'description' => 'Write down what you want to achieve.', 'tips' => []],
                // ... more generic steps
            ],
            // Other categories...
        ];

        $category = $goalData['category'] ?? 'general';
        $fallbackSteps = $templates[$category] ?? $templates['learning'];

        // Pad to 100 steps
        while (count($fallbackSteps) < 100) {
            $fallbackSteps[] = [
                'title' => 'Continue practice',
                'description' => 'Keep working on your goal with consistent effort.',
                'tips' => ['Stay consistent', 'Track your progress']
            ];
        }

        return array_slice($fallbackSteps, 0, 100);
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
- ✅ **Use Eloquent ORM** for all database operations
- ✅ **Implement proper request validation** using Form Requests
- ✅ **Use service layer pattern** for business logic
- ✅ **Add comprehensive logging** for all operations
- ✅ **Implement proper error handling** with try-catch blocks
- ✅ **Use Laravel queues** for long-running operations (AI processing)
- ✅ **Add API resource transformers** for consistent response format
- ✅ **Include proper authentication** using Laravel Sanctum
- ✅ **Write feature and unit tests** for all functionality

### NEVER DO
- ❌ **Skip input validation** - Validate on both frontend and backend
- ❌ **Hardcode API endpoints** - Use environment configuration
- ❌ **Store sensitive data insecurely** - Use proper encryption and secure storage
- ❌ **Ignore accessibility** - Support screen readers and keyboard navigation
- ❌ **Skip error handling** - Handle all possible error scenarios
- ❌ **Use raw SQL queries** - Use Eloquent ORM for database operations
- ❌ **Expose sensitive information** in API responses or logs
- ❌ **Skip rate limiting** - Implement proper API rate limiting
- ❌ **Ignore performance** - Optimize queries and API responses
- ❌ **Skip database transactions** - Use transactions for multi-step operations

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
- [ ] Database operations use proper Eloquent relationships
- [ ] API responses follow consistent format with proper HTTP status codes
- [ ] Laravel queues are used for long-running operations
- [ ] Comprehensive logging is included for debugging
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

---

*This README serves as the definitive guide for MicroWins app development. The AI development agent must strictly adhere to these guidelines to ensure consistent, high-quality code generation that delivers an exceptional goal-tracking experience.*
