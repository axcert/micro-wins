<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuthService;
use App\Services\EmailService;
use App\Singletons\LogManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    protected AuthService $authService;
    protected EmailService $emailService;
    protected LogManager $logger;

    public function __construct(AuthService $authService, EmailService $emailService)
    {
        $this->authService = $authService;
        $this->emailService = $emailService;
        $this->logger = LogManager::getInstance();
        
        // Apply auth middleware except for public endpoints
        $this->middleware('auth:sanctum')->except([
            'register',
            'login',
            'forgotPassword',
            'resetPassword',
            'verifyEmail'
        ]);
        
        // Apply rate limiting
        $this->middleware('throttle:auth')->only([
            'register',
            'login',
            'forgotPassword',
            'resetPassword'
        ]);
    }

    /**
     * Register a new user
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            
            // Create user through service
            $user = $this->authService->register($validatedData);
            
            // Generate auth token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            // Send verification email
            $this->emailService->sendVerificationEmail($user);
            
            // Log user registration
            $this->logger->logUserActivity($user->id, 'user_registered', [
                'email' => $user->email,
                'name' => $user->name
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Registration successful. Please check your email to verify your account.',
                'data' => [
                    'user' => new UserResource($user),
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], Response::HTTP_CREATED);
            
        } catch (\Exception $e) {
            Log::error('User registration failed', [
                'email' => $request->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Login user
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $credentials = $request->validated();
            
            // Attempt login
            if (!Auth::attempt($credentials)) {
                $this->logger->logUserActivity(null, 'login_failed', [
                    'email' => $credentials['email'],
                    'ip' => $request->ip()
                ]);
                
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid email or password.'
                ], Response::HTTP_UNAUTHORIZED);
            }
            
            $user = Auth::user();
            
            // Check if email is verified
            if (!$user->hasVerifiedEmail()) {
                Auth::logout();
                
                return response()->json([
                    'success' => false,
                    'message' => 'Please verify your email before logging in.',
                    'error_code' => 'EMAIL_NOT_VERIFIED'
                ], Response::HTTP_FORBIDDEN);
            }
            
            // Revoke previous tokens
            $user->tokens()->delete();
            
            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            // Log successful login
            $this->logger->logUserActivity($user->id, 'user_logged_in', [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent()
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'data' => [
                    'user' => new UserResource($user),
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Login failed', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Login failed. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            // Revoke current access token
            $request->user()->currentAccessToken()->delete();
            
            // Log logout
            $this->logger->logUserActivity($user->id, 'user_logged_out');
            
            return response()->json([
                'success' => true,
                'message' => 'Successfully logged out.'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Logout failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Logout failed.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Refresh token
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            // Revoke current token
            $request->user()->currentAccessToken()->delete();
            
            // Create new token
            $token = $user->createToken('auth_token')->plainTextToken;
            
            $this->logger->logUserActivity($user->id, 'token_refreshed');
            
            return response()->json([
                'success' => true,
                'message' => 'Token refreshed successfully.',
                'data' => [
                    'access_token' => $token,
                    'token_type' => 'Bearer'
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Token refresh failed', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Token refresh failed.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Request password reset
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $email = $request->validated()['email'];
            
            // Process password reset request
            $result = $this->authService->processForgotPassword($email);
            
            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message']
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $this->logger->logUserActivity(null, 'password_reset_requested', [
                'email' => $email
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Password reset link has been sent to your email.'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Password reset request failed', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to process password reset request.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Reset password
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $validatedData = $request->validated();
            
            // Process password reset
            $result = $this->authService->resetPassword($validatedData);
            
            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message']
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $this->logger->logUserActivity($result['user']->id, 'password_reset_completed');
            
            return response()->json([
                'success' => true,
                'message' => 'Password has been reset successfully.'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Password reset failed', [
                'email' => $request->email,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to reset password.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Verify email address
     */
    public function verifyEmail(Request $request, string $token): JsonResponse
    {
        try {
            // Verify email token
            $result = $this->authService->verifyEmail($token);
            
            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => $result['message']
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $this->logger->logUserActivity($result['user']->id, 'email_verified');
            
            return response()->json([
                'success' => true,
                'message' => 'Email verified successfully.',
                'data' => [
                    'user' => new UserResource($result['user'])
                ]
            ]);
            
        } catch (\Exception $e) {
            Log::error('Email verification failed', [
                'token' => $token,
                'error' => $e->getMessage()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Email verification failed.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}