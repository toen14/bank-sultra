<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\ChangePasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('user.change-password');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ChangePasswordRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validated();

        $isValidPass = Hash::check($validated['old_password'], $user->password);

        if (!$isValidPass) {
            abort(403);
        }

        $user->fill(['password' => Hash::make($validated['new_password'])]);
        $user->save();

        return redirect(route('profile.index'));
    }
}
