<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Http\Requests\Branch\StoreBranchRequest;
use App\Http\Requests\Branch\UpdateBranchRequest;
use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $branches = Branch::orderBy('id', 'DESC');

        if (request()->search) {
            $search = request()->search;
            $branches->where('name', 'LIKE', "%$search%");
        }

        return response()->json($branches->paginate(request()->limit ?? 100));
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

        return response()->json(
            Branch::create($validated),
            Response::HTTP_CREATED,
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        error_log($id);
        $kabupatenKota = Branch::findOrFail($id);

        return response()->json(
            $kabupatenKota,
            Response::HTTP_OK,
        );
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

        $kabupatenKota = Branch::findOrFail($id);

        $kabupatenKota->update($validated);

        return response()->json(
            $kabupatenKota,
            Response::HTTP_OK,
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kabupatenKota = Branch::findOrFail($id);

        $kabupatenKota->delete();

        return response()->json(
            $kabupatenKota,
            Response::HTTP_OK,
        );
    }
}
