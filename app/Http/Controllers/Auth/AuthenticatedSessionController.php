<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {

        try {
            $request->authenticate();

            $request->session()->regenerate();

            $user = $request->user();
            $token = $user->createToken($user->name)->plainTextToken;

            session(['token' => $token]);

            return redirect()->intended(RouteServiceProvider::HOME);
        } catch (\Exception $e) {
            return redirect()->back()->withInput($request->all())->withErrors($e->validator);
        }
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        $request->session()->forget('token');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        Auth::guard('web')->logout();


        // // Session::forget('token');

        // $currentUserSession = DB::table('sessions')->where('user_id',  $request->user()->id)->first();
        // if ($currentUserSession) {
        //     $decoded = unserialize(base64_decode($currentUserSession->payload));
        //     unset($decoded['token']);

        //     $encoded = base64_encode(json_encode($decoded));

        //     DB::table('sessions')
        //         ->where('user_id', $request->user()->id)
        //         ->update(['payload' => $encoded]);

        //     dd(base64_decode(DB::table('sessions')->where('user_id',  $request->user()->id)->first()->payload));
        // }

        // Session::regenerateToken();

        return redirect('/');
    }
}
