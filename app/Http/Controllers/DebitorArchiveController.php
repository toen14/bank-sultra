<?php

namespace App\Http\Controllers;

use App\Models\Debitor;

class DebitorArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $debitors = Debitor::onlyTrashed()->with(['users', 'branch'])->get();

        return view('debitor.archive.index', compact('debitors'));
    }

    /**
     * Restore softdeleted a resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {

        Debitor::onlyTrashed()->findOrFail($id)->restore();

        return view('debitor.index');
    }
}
