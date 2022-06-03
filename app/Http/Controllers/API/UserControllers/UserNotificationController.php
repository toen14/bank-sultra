<?php

namespace App\Http\Controllers\API\UserControllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;

class UserNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $this->authorize('show', $user);

        $userNotifications = Notification::where('user_id', $user->id)->orderBy('id', 'DESC')->with('note.user')->paginate(request()->limit ?? 0);

        return response()->json($userNotifications);
    }
}
