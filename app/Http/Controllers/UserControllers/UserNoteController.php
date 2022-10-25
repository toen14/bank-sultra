<?php

namespace App\Http\Controllers\API\UserControllers;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;

class UserNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $this->authorize('show', $user);

        return Note::where('user_id', $user->id)->paginate(request()->limit ?? 0);
    }
}
