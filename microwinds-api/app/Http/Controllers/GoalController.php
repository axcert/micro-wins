<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Http\Resources\GoalTemplateResource;
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
                'category' => $request->get('category'),
                'per_page' => $request->get('per_page', 10),
                'page' => $request->get('page', 1)
            ]);

            Log::info('Goals retrieved successfully', [
                'user_id' => $user->id,
                'count' => $goals->count(),
                'page' => $goals->currentPage()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goals retrieved successfully',
                'data' => GoalResource::collection($goals->items()),
                'meta' => [
                    'current_page' => $goals->currentPage(),
                    'total' => $goals->total(),
                    'per_page' => $goals->perPage(),
                    'last_page' => $goals->lastPage()
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

            Log::info('Goal retrieved successfully', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'steps_count' => $goalWithSteps->microSteps->count()
            ]);

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

            Log::info('Goal updated successfully', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'changes' => $request->validated()
            ]);

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
     * Remove the specified goal (soft delete)
     */
    public function destroy(Goal $goal): JsonResponse
    {
        try {
            // Check ownership
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $this->goalService->deleteGoal($goal);

            Log::info('Goal deleted successfully', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goal deleted successfully'
            ], Response::HTTP_OK);

        } catch (\Exception $e) {
            Log::error('Goal deletion failed', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete goal'
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

            if ($goal->status === 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal is already active'
                ], Response::HTTP_BAD_REQUEST);
            }

            $activatedGoal = $this->goalService->activateGoal($goal);

            Log::info('Goal activated successfully', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goal activated successfully',
                'data' => new GoalResource($activatedGoal)
            ]);

        } catch (\Exception $e) {
            Log::error('Goal activation failed', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

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

            if ($goal->status !== 'active') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only active goals can be paused'
                ], Response::HTTP_BAD_REQUEST);
            }

            $pausedGoal = $this->goalService->pauseGoal($goal);

            Log::info('Goal paused successfully', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goal paused successfully',
                'data' => new GoalResource($pausedGoal)
            ]);

        } catch (\Exception $e) {
            Log::error('Goal pause failed', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to pause goal'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get goal templates
     */
    public function templates(Request $request): JsonResponse
    {
        try {
            $category = $request->get('category');
            $templates = $this->goalService->getGoalTemplates($category);

            Log::info('Goal templates retrieved', [
                'category' => $category,
                'count' => $templates->count()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Goal templates retrieved successfully',
                'data' => GoalTemplateResource::collection($templates)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to retrieve goal templates', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve templates'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}