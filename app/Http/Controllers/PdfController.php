<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\Debitor;
use App\Models\User;

class PdfController extends Controller
{
    public function PdfDebitor()
    {
        $debitors = Debitor::with('users')->get();

        $pdf = PDF::loadView('pdf.debitor', compact('debitors'))->setPaper('legal', 'landscape');
        return $pdf->download('debitur.pdf');
    }

    public function PdfUser()
    {
        $users = User::with('branch')->get();

        $pdf = PDF::loadView('pdf.user', compact('users'))->setPaper('legal', 'landscape');
        return $pdf->download('pengguna.pdf');
    }

    public function PdfBranch()
    {
        $branches = Branch::with('kabupatenKota')->get();

        $pdf = PDF::loadView('pdf.branch', compact('branches'))->setPaper('legal', 'landscape');
        return $pdf->download('pengguna.pdf');
    }
}
