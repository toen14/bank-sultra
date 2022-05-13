<?php

namespace App\Http\Controllers\API\UserControllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;

class UserNotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $userId)
    {
        $userNotifications = Notification::where('user_id', $userId)->paginate(request()->limit ?? 0);
        
        return response()->json($userNotifications);
    }
}
