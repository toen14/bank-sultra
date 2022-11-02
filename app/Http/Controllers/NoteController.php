<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

use App\Enums\NotificationEnum;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Http\Requests\API\Note\StoreNoteRequest;
use App\Http\Requests\API\Note\UpdateNoteRequest;
use App\Models\Debitor;
use App\Models\Notification;
use App\Models\Push;
use App\Models\User;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Note::paginate(request()->limit ?? 0));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNoteRequest $request, User $user)
    {
        $this->authorize('show', $user);

        $note = DB::transaction(function () use ($request) {

            $userLogged = auth()->user();

            $validated = $request->validated();
            $validated['user_id'] = $userLogged->id;

            $note = Note::create($validated);

            $admins = User::where('role', UserRole::AdminPusat->value)->get('id');

            $apraisals = User::where('role', UserRole::Apraisal->value)->where('cabang_id', $note->debitor->cabang_id)->get('id');

            $debitorNotaries = (Debitor::with('users')->findOrFail($validated['debitor_id'], ['id']))->users;

            $noteUsers = [];
            $noteUserIds = [];

            foreach (($debitorNotaries->merge($admins))->merge($apraisals) as $userCanGetNotif) {
                array_push($noteUsers, [
                    'user_id' => $userCanGetNotif->id,
                    'note_id' => $note->id,
                    'status'  => NotificationEnum::Unread->value,
                    'created_at' => date("Y-m-d H:i:s", strtotime('now')),
                    'updated_at' => date("Y-m-d H:i:s", strtotime('now'))
                ]);

                if ($userLogged->id !== $userCanGetNotif->id) {
                    array_push($noteUserIds, $userCanGetNotif->id);
                }
            }

            Notification::insert($noteUsers);

            $pushes = Push::whereIn('user_id', $noteUserIds)->get();

            foreach ($pushes as $push) {

                Http::withHeaders([
                    "Content-Type" => "application/json",
                    'Authorization' => 'key=' . env('FCM_SERVER_KEY'),
                ])->post(env('FCM_URL_PUSH_NOTIFICATION'), [
                    "to" => $push->push_token,
                    "title" => 'BANK-SULTRA',
                    "body" => $userLogged->name . ' membuat note',
                    "notification" => [
                        "title" => 'BANK-SULTRA',
                        "body" => $userLogged->name . ' membuat note',
                    ]
                ]);
            }

            return $note;
        });

        // unset relation has been called
        unset($note['debitor']);

        return redirect(route('user-debitors.show', ['user' => auth()->user()->id, 'debitor' => $request->debitor_id]));
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
