<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardSummaryResource;
use App\Http\Resources\StreakResource;
use App\Http\Resources\TimelineResource;
use App\Http\Resources\StatsResource;
use App\Http\Resources\AchievementResource;
use App\Services\AnalyticsService;
use App\Services\StreakService;
use App\Services\AchievementService;
use App\Services\ExportService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ProgressController extends Controller
{
    protected AnalyticsService $analyticsService;
    protected StreakService $streakService;
    protected AchievementService $achievementService;
    protected ExportService $exportService;

    public function __construct(
        AnalyticsService $analyticsService,
        StreakService $streakService,
        AchievementService $achievementService,
        ExportService $exportService
    ) {
        $this->analyticsService = $analyticsService;
        $this->streakService = $streakService;
        $this->achievementService = $achievementService;
        $this->exportService = $exportService;
        $this->middleware('auth:sanctum');
    }

    /**
     * Get dashboard summary for the authenticated user
     */
    public function dashboard(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $period = $request->get('period', 'week'); // week, month, all
            
            $summary = $this->analyticsService->getDashboardSummary($user->id, $period);
            
            Log::info('Dashboard summary retrieved', [
                'user_id' => $user->id,
                'period' => $period
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Dashboard summary retrieved successfully',
                'data' => new DashboardSummaryResource($summary)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch dashboard summary', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard summary',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get streak information for the authenticated user
     */
    public function streaks(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $goalId = $request->get('goal_id');
            
            $streaks = $this->streakService->getUserStreaks($user->id, $goalId);
            
            Log::info('Streaks retrieved', [
                'user_id' => $user->id,
                'goal_id' => $goalId,
                'streak_count' => count($streaks)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Streaks retrieved successfully',
                'data' => StreakResource::collection($streaks)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch streaks', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve streaks'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get progress timeline for the authenticated user
     */
    public function timeline(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $startDate = $request->get('start_date', now()->subDays(30)->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));
            $goalId = $request->get('goal_id');
            
            $timeline = $this->analyticsService->getProgressTimeline(
                $user->id, 
                $startDate, 
                $endDate,
                $goalId
            );
            
            Log::info('Timeline retrieved', [
                'user_id' => $user->id,
                'date_range' => "$startDate to $endDate",
                'goal_id' => $goalId
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Progress timeline retrieved successfully',
                'data' => TimelineResource::collection($timeline)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch timeline', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve timeline'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get statistics for the authenticated user
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $period = $request->get('period', 'month');
            $includeComparison = $request->boolean('include_comparison', false);
            
            $stats = $this->analyticsService->getUserStats($user->id, $period);
            
            if ($includeComparison) {
                $stats['community_comparison'] = $this->analyticsService->getCommunityComparison($user->id, $period);
            }
            
            Log::info('Stats retrieved', [
                'user_id' => $user->id,
                'period' => $period,
                'include_comparison' => $includeComparison
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Statistics retrieved successfully',
                'data' => new StatsResource($stats)
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch stats', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get achievements for the authenticated user
     */
    public function achievements(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $category = $request->get('category');
            $unlocked = $request->get('unlocked');
            
            $achievements = $this->achievementService->getUserAchievements(
                $user->id,
                $category,
                $unlocked === 'true' ? true : ($unlocked === 'false' ? false : null)
            );
            
            Log::info('Achievements retrieved', [
                'user_id' => $user->id,
                'category' => $category,
                'achievement_count' => count($achievements)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Achievements retrieved successfully',
                'data' => AchievementResource::collection($achievements),
                'summary' => [
                    'total' => $achievements->count(),
                    'unlocked' => $achievements->where('unlocked', true)->count(),
                    'locked' => $achievements->where('unlocked', false)->count(),
                    'points' => $achievements->where('unlocked', true)->sum('points')
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch achievements', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve achievements'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Export user progress data
     */
    public function export(Request $request): StreamedResponse|JsonResponse
    {
        try {
            $user = Auth::user();
            $format = $request->get('format', 'json'); // json, csv, pdf
            $startDate = $request->get('start_date');
            $endDate = $request->get('end_date');
            
            // Check if user is premium for PDF export
            if ($format === 'pdf' && !$user->isPremium()) {
                return response()->json([
                    'success' => false,
                    'message' => 'PDF export is available for premium users only',
                    'error_code' => 'PREMIUM_REQUIRED'
                ], Response::HTTP_FORBIDDEN);
            }
            
            $exportData = $this->exportService->exportUserData(
                $user->id,
                $format,
                $startDate,
                $endDate
            );
            
            Log::info('Progress data exported', [
                'user_id' => $user->id,
                'format' => $format,
                'date_range' => $startDate ? "$startDate to $endDate" : 'all'
            ]);
            
            // Return appropriate response based on format
            switch ($format) {
                case 'csv':
                    return response()->streamDownload(
                        function () use ($exportData) {
                            echo $exportData;
                        },
                        "microwinds_progress_{$user->id}_" . date('Y-m-d') . '.csv',
                        [
                            'Content-Type' => 'text/csv',
                        ]
                    );
                    
                case 'pdf':
                    return response()->streamDownload(
                        function () use ($exportData) {
                            echo $exportData;
                        },
                        "microwinds_progress_{$user->id}_" . date('Y-m-d') . '.pdf',
                        [
                            'Content-Type' => 'application/pdf',
                        ]
                    );
                    
                default: // json
                    return response()->json([
                        'success' => true,
                        'message' => 'Progress data exported successfully',
                        'data' => $exportData
                    ]);
            }

        } catch (\Exception $e) {
            Log::error('Failed to export progress data', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to export progress data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}