<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        // Authenticate and get the guard name
        $successfulGuard = $request->authenticate();

        // Get the authenticated user
        $user = Auth::guard($successfulGuard)->user();

        if (!$user) {
            return response()->json(['message' => 'Authentication failed or user not found.'], 401);
        }

        // Regenerate session
        $request->session()->regenerate();

        // Ensure the role is explicitly set based on guard
        $userData = $user->toArray();
        
        // Manually set the role based on the guard for certainty
        $role = match($successfulGuard) {
            'admin' => 'admin',
            'web' => 'student', // Assuming 'web' guard is for students
            'teacher' => 'teacher',
            default => 'student'
        };

        // Add role to user data
        $userData['role'] = $role;

        return response()->json([
            'user' => $userData,
            'token' => $user->createToken('api', [$successfulGuard])->plainTextToken,
        ]);
    }

    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
}