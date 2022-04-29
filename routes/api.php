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

Route::get('note-users', [\App\Http\Controllers\API\NoteUserController::class, 'index']);
Route::post('note-users', [\App\Http\Controllers\API\NoteUserController::class, 'store']);
Route::get('note-users/{id}', [\App\Http\Controllers\API\NoteUserController::class, 'show']);
Route::patch('note-users/{id}', [\App\Http\Controllers\API\NoteUserController::class, 'update']);
Route::delete('note-users/{id}', [\App\Http\Controllers\API\NoteUserController::class, 'destroy']);

Route::get('kabupaten-kota', [\App\Http\Controllers\API\KabupatenKotaController::class, 'index']);
Route::get('kabupaten-kota/{id}', [\App\Http\Controllers\API\KabupatenKotaController::class, 'show']);

Route::get('branches', [\App\Http\Controllers\API\BranchController::class, 'index']);
Route::post('branches', [\App\Http\Controllers\API\BranchController::class, 'store']);
Route::get('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'show']);
Route::patch('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'update']);
Route::delete('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'destroy']);

Route::get('users', [\App\Http\Controllers\API\UserController::class, 'index']);
Route::post('users', [\App\Http\Controllers\API\UserController::class, 'store']);
Route::get('users/{id}', [\App\Http\Controllers\API\UserController::class, 'show']);
Route::patch('users/{id}', [\App\Http\Controllers\API\UserController::class, 'update']);
Route::delete('users/{id}', [\App\Http\Controllers\API\UserController::class, 'destroy']);

Route::get('notaris', [\App\Http\Controllers\API\NotarisController::class, 'index']);
