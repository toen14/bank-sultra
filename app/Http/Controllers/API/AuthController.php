<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Attempt to authenticate the request's credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->first();
        if (!$user || !$user->count() || !Hash::check($validated['password'], $user->password)) {
            return response()->json(
                ['message' => 'Email atau password salah!'],
                Response::HTTP_BAD_REQUEST
            );
        }

        return response()->json(
            ['token' => $user->createToken($user->name)->plainTextToken],
            Response::HTTP_CREATED,
        );
    }

    /**
     * Destroy an authenticate token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Berhasil logout!'
        ]);
    }

    /**
     * Destroys an authenticate tokens.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logoutAll(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Berhasil logout!'
        ]);
    }

    /**
     * Get info current user authenticated.
     *
     * @return \Illuminate\Http\Response
     */
    public function me()
    {
        return response()->json(
            ['me' => request()->user()->load(['branch.kabupatenKota'])],
            Response::HTTP_OK,
        );
    }
}
