<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExportProgressRequest;
use App\Http\Resources\DashboardSummaryResource;
use App\Http\Resources\StreakResource;
use App\Http\Resources\TimelineResource;
use App\Http\Resources\StatsResource;
use App\Http\Resources\AchievementResource;
use App\Services\ProgressService;
use App\Services\AnalyticsService;
use App\Services\AchievementService;
use App\Singletons\LogManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ProgressController extends Controller
{
    protected ProgressService $progressService;
    protected AnalyticsService $analyticsService;
    protected AchievementService $achievementService;
    protected LogManager $logger;

    public function __construct(
        ProgressService $progressService,
        AnalyticsService $analyticsService,
        AchievementService $achievementService
    ) {
        $this->progressService = $progressService;
        $this->analyticsService = $analyticsService;
        $this->achievementService = $achievementService;
        $this->logger = LogManager::getInstance();
        $this->middleware('auth:sanctum');
    }

    /**
     * Get dashboard summary for the authenticated user
     */
    public function dashboard(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $period = $request->get('period', 'week'); // week, month, year
            
            $summary = $this->progressService->getDashboardSummary($user->id, $period);
            
            $this->logger->logUserActivity($user->id, 'viewed_dashboard', [
                'period' => $period
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Dashboard summary retrieved successfully',
                'data' => new DashboardSummaryResource($summary)
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to fetch dashboard summary', $e, [
                'user_id' => Auth::id(),
                'period' => $request->get('period')
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard summary',
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
            $goalId = $request->get('goal_id'); // Optional: get streaks for specific goal
            
            $streaks = $this->progressService->getUserStreaks($user->id, $goalId);
            
            $this->logger->logUserActivity($user->id, 'viewed_streaks', [
                'goal_id' => $goalId
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Streaks retrieved successfully',
                'data' => StreakResource::collection($streaks)
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to fetch streaks', $e, [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve streaks'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get progress timeline
     */
    public function timeline(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $startDate = $request->get('start_date', now()->subDays(30)->format('Y-m-d'));
            $endDate = $request->get('end_date', now()->format('Y-m-d'));
            $goalId = $request->get('goal_id');
            
            $timeline = $this->progressService->getProgressTimeline(
                $user->id,
                $startDate,
                $endDate,
                $goalId
            );
            
            $this->logger->logUserActivity($user->id, 'viewed_timeline', [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'goal_id' => $goalId
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Timeline retrieved successfully',
                'data' => new TimelineResource($timeline)
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to fetch timeline', $e, [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve timeline'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get progress statistics
     */
    public function stats(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $period = $request->get('period', 'all'); // week, month, year, all
            $compareWithCommunity = $request->boolean('compare_with_community', false);
            
            $stats = $this->analyticsService->getUserStats(
                $user->id,
                $period,
                $compareWithCommunity
            );
            
            $this->logger->logUserActivity($user->id, 'viewed_stats', [
                'period' => $period,
                'community_comparison' => $compareWithCommunity
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Statistics retrieved successfully',
                'data' => new StatsResource($stats)
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to fetch statistics', $e, [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get user's achievements
     */
    public function achievements(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $category = $request->get('category'); // milestone, streak, special
            
            $achievements = $this->achievementService->getUserAchievements(
                $user->id,
                $category
            );
            
            $this->logger->logUserActivity($user->id, 'viewed_achievements', [
                'category' => $category
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Achievements retrieved successfully',
                'data' => AchievementResource::collection($achievements),
                'summary' => [
                    'total_earned' => $achievements->where('earned', true)->count(),
                    'total_available' => $achievements->count(),
                    'points_earned' => $achievements->where('earned', true)->sum('points')
                ]
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to fetch achievements', $e, [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve achievements'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Export user's progress data
     */
    public function export(ExportProgressRequest $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $format = $request->get('format', 'json'); // json, csv, pdf
            $dateRange = $request->get('date_range', 'all'); // all, last_month, last_year
            $includeGoals = $request->boolean('include_goals', true);
            $includeSteps = $request->boolean('include_steps', true);
            $includeStats = $request->boolean('include_stats', true);
            
            $exportData = $this->progressService->exportUserData(
                $user->id,
                $format,
                $dateRange,
                [
                    'include_goals' => $includeGoals,
                    'include_steps' => $includeSteps,
                    'include_stats' => $includeStats
                ]
            );
            
            $this->logger->logUserActivity($user->id, 'exported_data', [
                'format' => $format,
                'date_range' => $dateRange
            ]);

            if ($format === 'json') {
                return response()->json([
                    'success' => true,
                    'message' => 'Data exported successfully',
                    'data' => $exportData
                ]);
            }

            // For CSV and PDF, return download URL
            return response()->json([
                'success' => true,
                'message' => 'Export generated successfully',
                'download_url' => $exportData['download_url'],
                'expires_at' => $exportData['expires_at']
            ]);

        } catch (\Exception $e) {
            $this->logger->logError('Failed to export data', $e, [
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to export data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}