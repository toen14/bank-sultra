<?php

namespace App\Http\Controllers\UserControllers;

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

        $notifications = Notification::with(['note', 'note.user'])
            ->whereHas('note', function ($query) use ($user) {
                $query->where('user_id', '!=', $user->id);
            })
            ->where('user_id', $user->id)
            ->orderBy('id', 'DESC')
            ->paginate(8);

        return view('user.notification.index', compact('notifications'));
    }

    /**
     * Update status notif.
     *
     * @return \Illuminate\Http\Response
     */
    public function status(User $user, Notification $notification)
    {
        $this->authorize('show', $notification);

        $notification->status = NotificationEnum::Read->value;
        $notification->save();

        return redirect(route('user-debitors.show', ['user' => $user->id, 'debitor' => $notification->note->debitor_id]));
    }
}
