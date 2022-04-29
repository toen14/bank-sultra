<?php

namespace App\Http\Controllers\API;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;

use App\Models\User;

class NotarisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $notaries = User::where('role', '=', UserRole::Notaris->value)->get();
        
        return response()->json($notaries);
    }
}
