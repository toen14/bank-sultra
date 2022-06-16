<?php

namespace App\Http\Controllers\API\UserControllers;

use App\Http\Controllers\Controller;
use App\Enums\UserRole;
use App\Models\Debitor;
use App\Models\User;

class UserDebitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        $this->authorize('show', $user);

        $debitors = null;

        $userLoginned = auth()->user();

        if ($userLoginned->role === UserRole::Apraisal->value) {
            $debitors = Debitor::where('cabang_id', $user->cabang_id)->orderBy('id', 'DESC');
        }

        if ($userLoginned->role === UserRole::Notaris->value) {
            $debitors = $user->debitors()->orderBy('id', 'DESC');
        }

        return $debitors
            ?  $debitors->with('branch')->paginate(request()->limit ?? 0)
            :  Debitor::with('branch')->orderBy('id', 'DESC')->paginate(request()->limit ?? 0);
    }
}
