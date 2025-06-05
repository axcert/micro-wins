<?php

namespace App\Http\Controllers;

use App\Models\MicroStep;
use App\Models\Goal;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->middleware('auth:sanctum');
        $this->taskService = $taskService;
    }

    public function complete(Request $request, $stepId)
    {
        $step = MicroStep::findOrFail($stepId);
        $goal = $step->goal;

        $this->authorize('complete', $step);

        $this->taskService->completeStep($step);

        return response()->json([
            'message' => 'Step completed successfully',
            'progress' => $goal->fresh()->progress,
        ]);
    }

    public function skip(Request $request, $stepId)
    {
        $step = MicroStep::findOrFail($stepId);

        $this->authorize('skip', $step);

        $reason = $request->input('reason', 'No reason given');
        $this->taskService->skipStep($step, $reason);

        return response()->json([
            'message' => 'Step skipped',
        ]);
    }

    public function swap(Request $request, $stepId)
    {
        $step = MicroStep::findOrFail($stepId);
        $goal = $step->goal;

        $this->authorize('swap', $step);

        $newStep = $this->taskService->swapStep($step);

        return response()->json([
            'message' => 'Step swapped successfully',
            'step' => $newStep,
        ]);
    }
}