<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\Debitor;

class PdfController extends Controller
{
    public function PdfDebitor()
    {
        $debitors = Debitor::with('users')->get();

        $pdf = PDF::loadView('pdf.debitor', compact('debitors'))->setPaper('legal', 'landscape');
        return $pdf->download('debitur.pdf');

        return view('debitor.index', );
    }
}
