```php
// StepController.php
// ...

/**
 * Complete a micro-step
 */
public function complete(int $stepId): JsonResponse
{
    try {
        $user = Auth::user();
        $step = MicroStep::findOrFail($stepId);

        // Check step ownership
        if ($step->goal->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Step not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Complete step
        $result = $this->goalService->completeStep($step, $user);

        return response()->json([
            'success' => true,
            'message' => 'Step completed successfully',
            'data' => $result
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to complete step',
            'error' => config('app.debug') ? $e->getMessage() : null
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

/**
 * Skip a micro-step
 */
public function skip(int $stepId): JsonResponse 
{
    try {
        $user = Auth::user();
        $step = MicroStep::findOrFail($stepId);

        // Check step ownership  
        if ($step->goal->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Step not found'
            ], Response::HTTP_NOT_FOUND);
        }
        
        // Skip step
        $result = $this->goalService->skipStep($step, $user);

        return response()->json([
            'success' => true,
            'message' => 'Step skipped successfully',
            'data' => $result  
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to skip step',
            'error' => config('app.debug') ? $e->getMessage() : null
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

/**
 * Swap a micro-step
 */
public function swap(int $stepId): JsonResponse
{
    try {
        $user = Auth::user();
        $step = MicroStep::findOrFail($stepId);
        
        // Check step ownership
        if ($step->goal->user_id !== $user->id) {
            return response()->json([
                'success' => false, 
                'message' => 'Step not found'
            ], Response::HTTP_NOT_FOUND);
        }

        // Swap step  
        $result = $this->goalService->swapStep($step, $user);
        
        return response()->json([
            'success' => true,
            'message' => 'Step swapped successfully',
            'data' => $result
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Failed to swap step',
            'error' => config('app.debug') ? $e->getMessage() : null  
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
```