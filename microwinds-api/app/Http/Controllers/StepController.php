<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompleteStepRequest;
use App\Http\Requests\SkipStepRequest;
use App\Http\Requests\SwapStepRequest;
use App\Http\Requests\UpdateStepRequest;
use App\Http\Resources\MicroStepResource;
use App\Http\Resources\StepHistoryResource;
use App\Models\Goal;
use App\Models\MicroStep;
use App\Services\StepService;
use App\Services\NotificationService;
use App\Services\AnalyticsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class StepController extends Controller
{
    protected StepService $stepService;
    protected NotificationService $notificationService;
    protected AnalyticsService $analyticsService;

    public function __construct(
        StepService $stepService,
        NotificationService $notificationService,
        AnalyticsService $analyticsService
    ) {
        $this->stepService = $stepService;
        $this->notificationService = $notificationService;
        $this->analyticsService = $analyticsService;
        $this->middleware('auth:sanctum');
    }

    /**
     * List all steps for a specific goal
     */
    public function index(Goal $goal, Request $request): JsonResponse
    {
        try {
            // Check ownership
            if ($goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Goal not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $filters = [
                'status' => $request->get('status'),
                'completed' => $request->boolean('completed', null),
                'per_page' => $request->get('per_page', 20)
            ];

            $steps = $this->stepService->getGoalSteps($goal->id, $filters);

            return response()->json([
                'success' => true,
                'message' => 'Steps retrieved successfully',
                'data' => MicroStepResource::collection($steps->items()),
                'meta' => [
                    'current_page' => $steps->currentPage(),
                    'total' => $steps->total(),
                    'per_page' => $steps->perPage(),
                    'total_completed' => $this->stepService->countCompletedSteps($goal->id),
                    'total_skipped' => $this->stepService->countSkippedSteps($goal->id)
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch steps', [
                'goal_id' => $goal->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve steps'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get today's step for the user
     */
    public function getTodaysStep(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $goalId = $request->get('goal_id');

            $todaysStep = $this->stepService->getTodaysStep($user->id, $goalId);

            if (!$todaysStep) {
                return response()->json([
                    'success' => true,
                    'message' => 'No step scheduled for today',
                    'data' => null
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Today\'s step retrieved successfully',
                'data' => new MicroStepResource($todaysStep),
                'meta' => [
                    'goal_progress' => $this->stepService->getGoalProgress($todaysStep->goal_id),
                    'current_streak' => $this->analyticsService->getCurrentStreak($user->id),
                    'steps_completed_today' => $this->stepService->getStepsCompletedToday($user->id)
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch today\'s step', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve today\'s step'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Mark a step as complete
     */
    public function complete(CompleteStepRequest $request, MicroStep $step): JsonResponse
    {
        try {
            // Check ownership through goal
            if ($step->goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step not found'
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if already completed
            if ($step->completed_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step already completed'
                ], Response::HTTP_BAD_REQUEST);
            }

            DB::beginTransaction();

            $completedStep = $this->stepService->completeStep($step, $request->validated());

            // Track analytics
            $this->analyticsService->trackStepCompletion(Auth::id(), $step);

            // Send notification if milestone reached
            $progress = $this->stepService->getGoalProgress($step->goal_id);
            if ($progress % 10 === 0) {
                $this->notificationService->sendMilestoneNotification(
                    Auth::user(),
                    $step->goal,
                    $progress
                );
            }

            DB::commit();

            Log::info('Step completed successfully', [
                'step_id' => $step->id,
                'goal_id' => $step->goal_id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Step completed successfully!',
                'data' => new MicroStepResource($completedStep),
                'meta' => [
                    'goal_progress' => $progress,
                    'next_step' => $this->stepService->getNextStep($step->goal_id),
                    'celebration_type' => $this->stepService->getCelebrationTypeForProgress($progress)
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to complete step', [
                'step_id' => $step->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to complete step'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Skip a step with reason
     */
    public function skip(SkipStepRequest $request, MicroStep $step): JsonResponse
    {
        try {
            // Check ownership through goal
            if ($step->goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step not found'
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if already completed or skipped
            if ($step->completed_at || $step->skipped_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step already processed'
                ], Response::HTTP_BAD_REQUEST);
            }

            DB::beginTransaction();

            $skippedStep = $this->stepService->skipStep($step, $request->validated());

            // Track analytics
            $this->analyticsService->trackStepSkip(Auth::id(), $step, $request->reason);

            DB::commit();

            Log::info('Step skipped', [
                'step_id' => $step->id,
                'goal_id' => $step->goal_id,
                'user_id' => Auth::id(),
                'reason' => $request->reason
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Step skipped. Don\'t worry, you can try again tomorrow!',
                'data' => new MicroStepResource($skippedStep),
                'meta' => [
                    'next_step' => $this->stepService->getNextStep($step->goal_id),
                    'skip_count' => $this->stepService->getUserSkipCount(Auth::id())
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to skip step', [
                'step_id' => $step->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to skip step'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Swap a step for an alternative
     */
    public function swap(SwapStepRequest $request, MicroStep $step): JsonResponse
    {
        try {
            // Check ownership through goal
            if ($step->goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step not found'
                ], Response::HTTP_NOT_FOUND);
            }

            // Check if already completed
            if ($step->completed_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot swap completed step'
                ], Response::HTTP_BAD_REQUEST);
            }

            DB::beginTransaction();

            $swappedStep = $this->stepService->swapStep($step, $request->validated());

            // Track analytics
            $this->analyticsService->trackStepSwap(Auth::id(), $step);

            DB::commit();

            Log::info('Step swapped', [
                'original_step_id' => $step->id,
                'new_step_id' => $swappedStep->id,
                'goal_id' => $step->goal_id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Step swapped successfully!',
                'data' => new MicroStepResource($swappedStep),
                'meta' => [
                    'swap_count' => $this->stepService->getUserSwapCount(Auth::id()),
                    'remaining_swaps' => $this->stepService->getRemainingSwaps(Auth::id())
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Failed to swap step', [
                'step_id' => $step->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to swap step'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update step details
     */
    public function update(UpdateStepRequest $request, MicroStep $step): JsonResponse
    {
        try {
            // Check ownership through goal
            if ($step->goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step not found'
                ], Response::HTTP_NOT_FOUND);
            }

            // Cannot update completed steps
            if ($step->completed_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot update completed step'
                ], Response::HTTP_BAD_REQUEST);
            }

            $updatedStep = $this->stepService->updateStep($step, $request->validated());

            Log::info('Step updated', [
                'step_id' => $step->id,
                'goal_id' => $step->goal_id,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Step updated successfully',
                'data' => new MicroStepResource($updatedStep)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to update step', [
                'step_id' => $step->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update step'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get step history
     */
    public function history(MicroStep $step, Request $request): JsonResponse
    {
        try {
            // Check ownership through goal
            if ($step->goal->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Step not found'
                ], Response::HTTP_NOT_FOUND);
            }

            $history = $this->stepService->getStepHistory($step->id);

            return response()->json([
                'success' => true,
                'message' => 'Step history retrieved successfully',
                'data' => StepHistoryResource::collection($history)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch step history', [
                'step_id' => $step->id,
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve step history'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}