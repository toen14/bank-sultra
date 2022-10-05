<?php

namespace App\Http\Controllers;

use App\Enums\DebitorStatus;
use App\Models\Debitor;

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

        return view('dashboard', compact(
            'countDebitor',
            'countDone',
            'countProgress',
            'countPending',
            'user'
        ));
    }
}
