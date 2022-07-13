<?php

namespace App\Http\Controllers;

use Artisan;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BackupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $filenames = scandir(storage_path('/app/Laravel'), 1);

        // parsing file name
        foreach ($filenames as $index => $filename) {
            if (!str_contains($filename, '.zip')) {
                unset($filenames[$index]);
            } else {
                $filenames[$index] = str_replace('.zip', '', $filename);
            }
        }

        return view('backup.index', compact('filenames'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        Artisan::call('backup:run --only-db');

        return response()->redirectTo(route('backup.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string  $filename
     * @return \Illuminate\Http\Response
     */
    public function destroy($filename)
    {

        $filename = storage_path('app/Laravel/' . $filename . '.zip');

        if (!file_exists($filename)) {
            throw new NotFoundHttpException();
        }

        unlink($filename);

        return response()->redirectTo(route('backup.index'));
    }
}
