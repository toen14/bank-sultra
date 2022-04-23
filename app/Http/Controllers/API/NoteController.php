<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Models\Note;
use App\Http\Requests\API\Note\StoreNoteRequest;
use App\Http\Requests\API\Note\UpdateNoteRequest;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Note::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteRequest $request)
    {
        $validated = $request->validated();

        return response()->json(
            Note::create($validated),
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
        $note = Note::findOrFail($id);

        return response()->json(
            $note,
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
    public function update(UpdateNoteRequest $request, $id)
    {
        $validated = $request->validated();

        $note = Note::findOrFail($id);

        $note->update($validated);

        return response()->json(
            $note,
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
        $note = Note::findOrFail($id);

        $note->delete();

        return response()->json(
            $note,
            Response::HTTP_OK,
        );
    }
}
