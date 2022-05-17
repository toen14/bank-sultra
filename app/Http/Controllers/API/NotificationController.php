<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Models\Notification;
use App\Http\Requests\API\Notification\StoreNotificationRequest;
use App\Http\Requests\API\Notification\UpdateNotificationRequest;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Notification::with('note.user')->paginate(request()->limit ?? 0));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNotificationRequest $request)
    {
        $validated = $request->validated();

        return response()->json(
            Notification::create($validated),
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
        $noteUser = Notification::findOrFail($id);

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
    public function update(UpdateNotificationRequest $request, $id)
    {
        $validated = $request->validated();

        $noteUser = Notification::findOrFail($id);

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
        $noteUser = Notification::findOrFail($id);

        $noteUser->delete();

        return response()->json(
            $noteUser,
            Response::HTTP_OK,
        );
    }
}
