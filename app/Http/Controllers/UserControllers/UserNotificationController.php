<?php

namespace App\Http\Controllers\API\UserControllers;

use Illuminate\Http\Request;

use App\Enums\NotificationEnum;
use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Validation\Rules\Enum;

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

    /**
     * Update status notif.
     *
     * @return \Illuminate\Http\Response
     */
    public function status(User $user, Notification $notification, Request $request)
    {
        $validated = $request->validate(['status' => ['required', new Enum(NotificationEnum::class)]]);
        
        $this->authorize('show', $notification);

        $notification->status = $validated['status'];
        $notification->save();
        
        return response()->json($notification);
    }
}
