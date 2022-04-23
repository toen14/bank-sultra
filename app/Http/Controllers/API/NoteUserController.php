<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Models\NoteUser;
use App\Http\Requests\API\NoteUser\StoreNoteUserRequest;
use App\Http\Requests\API\NoteUser\UpdateNoteUserRequest;

class NoteUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(NoteUser::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteUserRequest $request)
    {
        $validated = $request->validated();

        return response()->json(
            NoteUser::create($validated),
            Response::HTTP_CREATED
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
        $noteUser = NoteUser::findOrFail($id);

        return response()->json(
            $noteUser,
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
    public function update(UpdateNoteUserRequest $request, $id)
    {
        $validated = $request->validated();

        $noteUser = NoteUser::findOrFail($id);

        $noteUser->update($validated);

        return response()->json(
            $noteUser,
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
        $noteUser = NoteUser::findOrFail($id);

        $noteUser->delete();

        return response()->json(
            $noteUser,
            Response::HTTP_OK,
        );
    }
}
