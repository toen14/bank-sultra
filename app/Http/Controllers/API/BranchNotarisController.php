<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;

use App\Models\Branch;
use App\Models\User;

class BranchNotarisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Branch $branch)
    {
        $this->authorize('show', $branch);

        $userLoginned = auth()->user();

        $notaries = User::where('role', UserRole::Notaris->value);

        if ($userLoginned->role !== UserRole::Apraisal->value) {
            $notaries = $notaries->where('cabang_id', $branch->id);
        }

        return response()->json($notaries->paginate(request()->limit ?? 0));
    }
}
