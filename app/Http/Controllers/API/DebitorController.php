<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Http\Requests\Debitor\StoreDebitorRequest;
use App\Http\Requests\Debitor\UpdateDebitorRequest;
use App\Models\Debitor;
use App\Enums\DebitorStatus;

class DebitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $debitors = Debitor::paginate(request()->limit ?? 0);

        return response()->json($debitors, Response::HTTP_OK,);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Illuminate\Http\Response  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDebitorRequest $request)
    {
        $validated = $request->validated();
        $validated['status'] = DebitorStatus::Progress->value;

        $debitor = Debitor::create($validated);
        $debitor->users()->attach($validated['notaris_id']);
        $debitor->save();

        return response()->json(
            $debitor,
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
        $debitor = Debitor::findOrFail($id);

        return response()->json(
            $debitor,
            Response::HTTP_OK,
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Illuminate\Support\Facades\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDebitorRequest $request, $id)
    {
        $validated = $request->validated();

        $debitor = Debitor::findOrFail($id);
        $debitor->fill($validated);

        if ($validated['notaris_id']) {
            // get current notaris ids
            $currentUserDebitor = array_map(
                fn ($userDebitor) => $userDebitor['id'],
                $debitor->users()->get()->toArray()
            );

            // update relations
            $debitor->users()->sync($validated['notaris_id'] + $currentUserDebitor);
        }

        $debitor->save();

        return response()->json(
            $debitor,
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
        $debitor = Debitor::findOrFail($id);

        $debitor->delete();

        return response()->json(
            $debitor,
            Response::HTTP_OK,
        );
    }
}
