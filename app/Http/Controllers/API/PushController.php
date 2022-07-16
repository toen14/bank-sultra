<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Response;

use App\Http\Controllers\Controller;
use App\Http\Requests\Push\StorePushRequest;
use App\Models\Push;

class PushController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePushRequest $request)
    {
        error_log($request->push_token);
        $validated = $request->validated();
        $validated['user_id'] = request()->user()->id;


        Push::updateOrCreate(['push_token' => $validated['push_token']], $validated);

        return response()->json(
            ['message' => 'success'],
            Response::HTTP_CREATED,
        );
    }
}
