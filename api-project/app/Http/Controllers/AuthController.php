<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json(['message' => 'Login successful', 'user' => $user]);
    }

    public function register(Request $request)
{
    try {
        // Validate the request data
        $validatedData = $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        // Create the user
        $user = User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Return success response
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201); // 201 Created status code
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation error response
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422); // 422 Unprocessable Entity status code
    } catch (\Exception $e) {
        // Return general error response
        return response()->json([
            'message' => 'An unexpected error occurred',
            'error' => $e->getMessage()
        ], 500); // 500 Internal Server Error status code
    }
}

}
