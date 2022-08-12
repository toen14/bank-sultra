<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\Branch;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\Notaris;
use App\Models\Note;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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


        DB::transaction(function () use ($validated) {
            $user = User::create($validated);

            if ($validated['role'] === UserRole::Notaris->value) {
                Notaris::create([
                    'user_id'           => $user->id,
                    'tanggal_berakhir'  => $validated['tanggal_berakhir'],
                ]);
            }
        });

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
        $user = User::with('branch')->findOrFail($id);
        $notes = Note::with('debitor')->where('user_id', $user->id)->orderBy('id', 'desc')->get()->groupBy('debitor_id');

        return view('user.show', compact('user', 'notes'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with('notaris')->findOrFail($id);
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

        if (!isset($validated['password'])) {
            unset($validated['password']);
        }

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        DB::transaction(function () use ($validated, $user) {
            $user->fill($validated);
            $user->save();

            if ($user->role === UserRole::Notaris->value) {
                Notaris::updateOrCreate(['user_id' => $user->id], $validated);
            }
        });

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
        $user = User::findOrFail($id);

        $user->delete();

        return response()->redirectTo(route('users.index'));
    }
}
