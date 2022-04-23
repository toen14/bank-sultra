<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('debitors', [\App\Http\Controllers\API\DebitorController::class, 'index']);
Route::post('debitors', [\App\Http\Controllers\API\DebitorController::class, 'store']);
Route::get('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'show']);
Route::patch('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'update']);
Route::delete('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'destroy']);

Route::get('notes', [\App\Http\Controllers\API\NoteController::class, 'index']);
Route::post('notes', [\App\Http\Controllers\API\NoteController::class, 'store']);
Route::get('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'show']);
Route::patch('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'update']);
Route::delete('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'destroy']);
