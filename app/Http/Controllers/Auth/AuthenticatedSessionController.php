<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
   public function store(LoginRequest $request): \Illuminate\Http\JsonResponse
{
    // 1. Run the authentication and capture the name of the successful guard.
    // The updated authenticate() method should now return 'admin', 'web', etc.
    // If authentication fails, it throws a ValidationException.
    $successfulGuard = $request->authenticate();

    // 2. Retrieve the user ONLY from the successful guard.
    $user = Auth::guard($successfulGuard)->user();

    // Check if user was actually retrieved (should always be true here, but good practice)
    if (!$user) {
        // This scenario is highly unlikely if authenticate() passed, but handle it defensively
        return response()->json(['message' => 'Authentication failed or user not found.'], 401);
    }
    
    // 3. Regenerate the session.
    $request->session()->regenerate();

    // 4. Return the user and token.
    // Use the $successfulGuard name as the ability/scope for the token.
    return response()->json([
        'user' => $user,
        // Using $successfulGuard ensures the token reflects the user's role/guard
        
        'token' => $user->createToken('api', [$successfulGuard])->plainTextToken, 
    ]);
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
