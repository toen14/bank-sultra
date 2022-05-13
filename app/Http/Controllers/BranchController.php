<?php

namespace App\Http\Controllers;

use App\Http\Requests\Branch\StoreBranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use Illuminate\Http\Request;

use App\Models\Branch;
use App\Models\KabupatenKota;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $branches = Branch::with('kabupatenKota')->get();

        return view('branch.index', compact('branches'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $kabupatenKota = KabupatenKota::all();

        return view('branch.create', compact('kabupatenKota'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBranchRequest $request)
    {
        $validated = $request->validated();

        Branch::create($validated);

        return response()->redirectTo(route('branches.index'));
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
        $branch =  Branch::with('kabupatenKota')->findOrFail($id);

        $kabupatenKota = KabupatenKota::all();

        return view('branch.edit', compact('branch', 'kabupatenKota'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBranchRequest $request, $id)
    {
        $validated = $request->validated();

        $branch = Branch::findOrFail($id);
        $branch->fill($validated);
        $branch->save();

        return response()->redirectTo(route('branches.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $branch = Branch::findOrFail($id);

        $branch->delete();

        return response()->redirectTo(route('branches.index'));
    }
}
