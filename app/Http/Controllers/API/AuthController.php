<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Notaris;
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

        $user = User::with('branch')->where('email', $validated['email'])->first();
        if (!$user || !$user->count() || !Hash::check($validated['password'], $user->password)) {
            return response()->json(
                ['message' => 'Email atau password salah!'],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (
            $user->status === UserStatus::NonAktif->value && 
            ($user->role === UserRole::Notaris->value || 
            $user->role === UserRole::Apraisal->value)
            ) {
                return response()->json(
                    ['message' => 'Akun anda sudah non aktif!'],
                    Response::HTTP_BAD_REQUEST
                );
        }

        if ($user->role === UserRole::Notaris->value) {
            $notaris = Notaris::where('user_id', $user->id)->whereDate('tanggal_berakhir', '>', now())->first();

            if (!$notaris) {
                return response()->json(
                    ['message' => 'Masa berlaku notaris sudah berakhir!'],
                    Response::HTTP_BAD_REQUEST
                );
            }
        }

        return response()->json(
            [
                'user' => $user,
                'token' => $user->createToken($user->name)->plainTextToken
            ],
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