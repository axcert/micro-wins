```php
<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProgressResource;
use App\Models\UserProgress;
use App\Services\ProgressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProgressController extends Controller
{
    protected ProgressService $progressService;

    public function __construct(ProgressService $progressService)
    {
        $this->progressService = $progressService;
        $this->middleware('auth:sanctum');
    }

    /**
     * Get user's progress dashboard summary
     */
    public function dashboard(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $dashboardData = $this->progressService->getDashboardData($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Progress dashboard retrieved successfully',
                'data' => $dashboardData
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch progress dashboard', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve progress dashboard',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user's streak information
     */
    public function streaks(Request $request): JsonResponse 
    {
        try {
            $user = Auth::user();
            $streakData = $this->progressService->getStreakData($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Streak data retrieved successfully',
                'data' => $streakData  
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch streak data', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve streak data',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user's progress timeline data
     */
    public function timeline(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();

            $range = $request->get('range', 'month'); // Default to last 30 days
            $timelineData = $this->progressService->getTimelineData($user->id, $range);

            return response()->json([
                'success' => true,
                'message' => 'Progress timeline retrieved successfully',
                'data' => $timelineData
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch progress timeline', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()  
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve progress timeline',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user's progress statistics summary
     */
    public function stats(Request $request): JsonResponse
    {
        try { 
            $user = Auth::user();
            $statsData = $this->progressService->getStatsData($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Progress statistics retrieved successfully',
                'data' => $statsData
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch progress statistics', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,  
                'message' => 'Failed to retrieve progress statistics',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Export user's progress data
     */
    public function export(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $exportData = $this->progressService->exportProgressData($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Progress data exported successfully',
                'data' => $exportData
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to export progress data', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to export progress data',
                'error' => config('app.debug') ? $e->getMessage() : null  
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
```