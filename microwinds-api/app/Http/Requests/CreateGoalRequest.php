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
            ],
            'template_id' => [
                'sometimes',
                'integer',
                'exists:goal_templates,id'
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
            'difficulty_preference.in' => 'Please select a valid difficulty level.',
            'template_id.exists' => 'Selected template does not exist.'
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