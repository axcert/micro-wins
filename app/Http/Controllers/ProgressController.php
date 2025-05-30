<?php

namespace App\Http\Controllers;

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
     * Get user's progress dashboard data
     */
    public function getDashboardData(Request $request): JsonResponse
    {
        try {
            $userId = Auth::id();
            $data = $this->progressService->getDashboardData($userId);
            
            return response()->json([
                'success' => true,
                'message' => 'Progress data retrieved successfully',
                'data' => $data
            ]);

        } catch (\Exception $e) {
            Log::error('Failed to fetch progress data', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve progress data',
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}