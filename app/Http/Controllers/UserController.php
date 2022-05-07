<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Branch;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('branch')->get();

        return view('user.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $branches = Branch::all();
        $roles = [
            [
                'name'  => Str::ucfirst(UserRole::Apraisal->value),
                'value' => UserRole::Apraisal->value
            ],
            [
                'name'  => Str::ucfirst(UserRole::Notaris->value),
                'value' => UserRole::Notaris->value
            ],
        ];

        return view('user.create', compact('branches', 'roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        
        User::create($validated);

        return response()->redirectTo(route('users.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::findOrFail($id);
        $branches = Branch::all();
        $roles = [
            [
                'name'  => Str::ucfirst(UserRole::Apraisal->value),
                'value' => UserRole::Apraisal->value
            ],
            [
                'name'  => Str::ucfirst(UserRole::Notaris->value),
                'value' => UserRole::Notaris->value
            ],
        ];

        return view('user.edit', compact('user', 'branches', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $validated = $request->validated();
        
        $user = User::findOrFail($id);

        if ($validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->fill($validated);
        $user->save();

        return response()->redirectTo(route('users.edit', $id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
