<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Enums\UserStatus;
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

        $notaries = User::whereHas('notaris', function ($q) {
            $q->where('tanggal_berakhir', '>', now());
        })
            ->where('role', UserRole::Notaris->value)
            ->where('status', UserStatus::Aktif->value)
            ->where('cabang_id', $branch->id);

        return response()->json($notaries->paginate(request()->limit ?? 1000000000));
    }
}
