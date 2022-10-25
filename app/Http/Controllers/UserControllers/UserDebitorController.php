<?php

namespace App\Http\Controllers\UserControllers;

use App\Http\Controllers\Controller;
use App\Enums\UserRole;
use App\Http\Requests\Debitor\UpdateStatusDebitorRequest;
use App\Models\Debitor;
use App\Models\User;

class UserDebitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $this->authorize('show', $user);

        $debitors = null;

        $userLoginned = auth()->user();

        if ($userLoginned->role === UserRole::Apraisal->value) {
            $debitors = Debitor::where('cabang_id', $user->cabang_id)->orderBy('id', 'DESC');
        } else if ($userLoginned->role === UserRole::Notaris->value) {
            $debitors = $user->debitors()->orderBy('id', 'DESC');
        } else {
            $debitors = Debitor::orderBy('id', 'DESC');
        }

        if (request()->search) {
            $search = request()->search;
            $debitors->where('name', 'LIKE', "%$search%");
        }

        if (request()->date) {
            $date = request()->date;
            $debitors->where('created_at', '>=', date($date));
        }

        if (request()->status) {
            $status = request()->status;
            $debitors->where('status', $status);
        }

        $debitors = $debitors->with('branch')->paginate(request()->limit ?? 10);

        return view('user.debitor.index', compact('debitors'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId, $debitorId)
    {
        $debitor = Debitor::with([
            'notes' => function ($query) {
                $query->orderBy('id', 'asc');
            },
            'notes.user',
            'branch',
            'users',
            'users.notaris' => function ($query) {
                $query->where('tanggal_berakhir', '>', now());
            },
        ])->findOrFail($debitorId);

        return view('user.debitor.show', compact('debitor'));
    }

    /**
     * Update status the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(User $user, Debitor $debitor, UpdateStatusDebitorRequest $request)
    {
        $this->authorize('show', $user);
        $this->authorize('updateStatus', $debitor);

        $validated = $request->validated();

        $debitor->update($validated);

        return redirect()->back();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
