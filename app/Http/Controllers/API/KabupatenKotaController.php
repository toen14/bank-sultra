<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

use App\Models\KabupatenKota;

class KabupatenKotaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(KabupatenKota::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $kabupatenKota = KabupatenKota::findOrFail($id);

        return response()->json(
            $kabupatenKota,
            Response::HTTP_OK,
        );
    }
}
