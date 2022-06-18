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
        } else if ($userLoginned->role === UserRole::Notaris->value) {
            $debitors = $user->debitors()->orderBy('id', 'DESC');
        } else {
            $debitors = Debitor::orderBy('id', 'DESC');
        }

        if (request()->search) {
            $search = request()->search;
            $debitors->where('name', 'LIKE', "%$search%");
        }

        return $debitors->with('branch')->paginate(request()->limit ?? 0);
    }
}
