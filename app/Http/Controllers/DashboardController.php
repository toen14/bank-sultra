<?php

namespace App\Http\Controllers;

use App\Enums\DebitorStatus;
use App\Models\Debitor;
use App\Models\KabupatenKota;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $debitors = Debitor::get('status')->toArray();
        $countDebitor = 0;
        $countDone = 0;
        $countProgress = 0;
        $countPending = 0;

        foreach ($debitors as $debitor) {
            $countDebitor++;

            if ($debitor['status'] === DebitorStatus::Done->value) {
                $countDone++;
            } elseif ($debitor['status'] === DebitorStatus::Progress->value) {
                $countProgress++;
            } else {
                $countPending++;
            }
        }

        $user = auth()->user();

        $totalAllUsers = User::whereNotNull('cabang_id')->count();

        $kabKota = KabupatenKota::with(['branches', 'branches.users'])->get();

        return view('dashboard', compact(
            'countDebitor',
            'countDone',
            'countProgress',
            'countPending',
            'user',
            'kabKota',
            'totalAllUsers',
        ));
    }
}
