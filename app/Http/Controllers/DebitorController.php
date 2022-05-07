<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Debitor;
use App\Models\User;
use App\Enums\UserRole;
use App\Enums\DebitorStatus;
use App\Http\Requests\Debitor\StoreDebitorRequest;
use App\Models\Branch;

class DebitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $debitors = Debitor::with('users')->get();

        return view('debitor.index', compact('debitors'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $notaries = User::where('role', '=', UserRole::Notaris->value)->get();
        $branches = Branch::all();

        return view('debitor.create', compact('notaries', 'branches'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDebitorRequest $request)
    {
        $validated = $request->validated();
        $validated['status'] = DebitorStatus::Progress->value;

        $debitor = Debitor::create($validated);
        $debitor->users()->attach($validated['notaris_id']);
        $debitor->save();

        return response()->redirectTo(route('debitors.index'));
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
