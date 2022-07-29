<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

use App\Http\Controllers\Controller;
use App\Http\Requests\Debitor\StoreDebitorRequest;
use App\Http\Requests\Debitor\UpdateDebitorRequest;
use App\Models\Debitor;
use App\Enums\DebitorStatus;
use App\Enums\UserRole;
use App\Models\Push;
use App\Models\User;

class DebitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(request()->limit ? Debitor::paginate(request()->limit) : Debitor::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Illuminate\Http\Response  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDebitorRequest $request)
    {
        $userLogin = auth()->user();
        $validated = $request->validated();
        $validated['status'] = DebitorStatus::Progress->value;

        $debitor = Debitor::create($validated);
        $debitor->users()->attach($validated['notaris_id']);
        $debitor->save();

        $notarisId = $validated['notaris_id'][0];

        $notaris = User::where('id', $notarisId)->firstOrFail();
        $apraisals = User::where('cabang_id', $notaris->cabang_id)
            ->where('id', '!=', $userLogin->id)
            ->where('role', UserRole::Apraisal->value)->get();
        $admins = User::where('role', UserRole::AdminPusat->value)
            ->where('id', '!=', $userLogin->id)->get();


        $usersCanGetNotif = $apraisals->merge([$notaris])->merge($admins);

        $pushUserIds = [];
        $pushTokens = [];

        foreach ($usersCanGetNotif as $userCanGetNotif) {
            array_push($pushUserIds, $userCanGetNotif->id);
        }

        $pushes = Push::whereIn('user_id', $pushUserIds)->get();

        foreach ($pushes as $push) {
            array_push($pushTokens, $push->push_token);
        }

        Http::withHeaders([
            "Content-Type" => "application/json",
            'Authorization' => 'Bearer ' . env('EXPO_PUSH_TOKEN'),
        ])->post(env('EXPO_URL_NOTIFICATION'), [
            "to" => $pushTokens,
            "title" => 'BANK-SULTRA',
            "body" => $userLogin->name . ' membuat debitur',
        ]);

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
        $debitor = Debitor::with([
            'notes' => function ($query) {
                $query->orderBy('id', 'desc');
            },
            'notes.user',
        ])->findOrFail($id);

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

        if (isset($validated['notaris_id'])) {
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