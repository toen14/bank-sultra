<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

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

require __DIR__ . '/api/auth.php';

Route::get('notif', function () {
    // $response = Http::withHeaders([
    //     "Content-Type" => "application/json"
    // ])->post('https://exp.host/--/api/v2/push/send', [
    //     "to" => "ExponentPushToken[HIWuJYIxbnD1YmQthFGa5R]",
    //     "title" => "from",
    //     "body" => "laravel"
    // ]);
    $db = DB::query('BACKUP DATABASE bank_sultra');
    var_dump($db);

    return 'Nice';
});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('debitors', [\App\Http\Controllers\API\DebitorController::class, 'index']);
    Route::post('debitors', [\App\Http\Controllers\API\DebitorController::class, 'store']);
    Route::get('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'show']);
    Route::patch('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'update']);
    Route::delete('debitors/{id}', [\App\Http\Controllers\API\DebitorController::class, 'destroy']);

    Route::get('notes', [\App\Http\Controllers\API\NoteController::class, 'index']);
    Route::post('notes/users/{user}', [\App\Http\Controllers\API\NoteController::class, 'store']);
    Route::get('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'show']);
    Route::patch('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'update']);
    Route::delete('notes/{id}', [\App\Http\Controllers\API\NoteController::class, 'destroy']);

    Route::get('notifications', [\App\Http\Controllers\API\NotificationController::class, 'index']);
    Route::post('notifications', [\App\Http\Controllers\API\NotificationController::class, 'store']);
    Route::get('notifications/{id}', [\App\Http\Controllers\API\NotificationController::class, 'show']);
    Route::patch('notifications/{id}', [\App\Http\Controllers\API\NotificationController::class, 'update']);
    Route::delete('notifications/{id}', [\App\Http\Controllers\API\NotificationController::class, 'destroy']);

    Route::get('kabupaten-kota', [\App\Http\Controllers\API\KabupatenKotaController::class, 'index']);
    Route::get('kabupaten-kota/{id}', [\App\Http\Controllers\API\KabupatenKotaController::class, 'show']);

    Route::get('branches', [\App\Http\Controllers\API\BranchController::class, 'index']);
    Route::post('branches', [\App\Http\Controllers\API\BranchController::class, 'store']);
    Route::get('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'show']);
    Route::patch('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'update']);
    Route::delete('branches/{id}', [\App\Http\Controllers\API\BranchController::class, 'destroy']);

    Route::get('branches/{branch}/notaris', [\App\Http\Controllers\API\BranchNotarisController::class, 'index']);

    Route::get('users', [\App\Http\Controllers\API\UserController::class, 'index']);
    Route::post('users', [\App\Http\Controllers\API\UserController::class, 'store']);
    Route::get('users/{id}', [\App\Http\Controllers\API\UserController::class, 'show']);
    Route::patch('users/{id}', [\App\Http\Controllers\API\UserController::class, 'update']);
    Route::delete('users/{id}', [\App\Http\Controllers\API\UserController::class, 'destroy']);

    Route::get('users/{user}/notifications', [\App\Http\Controllers\API\UserControllers\UserNotificationController::class, 'index']);
    Route::post('users/{user}/notifications/{notification}/status', [\App\Http\Controllers\API\UserControllers\UserNotificationController::class, 'status']);

    Route::get('users/{user}/debitors', [\App\Http\Controllers\API\UserControllers\UserDebitorController::class, 'index']);

    Route::get('users/{user}/notes', [\App\Http\Controllers\API\UserControllers\UserNoteController::class, 'index']);

    Route::get('notaris', [\App\Http\Controllers\API\NotarisController::class, 'index']);

    Route::post('push', [\App\Http\Controllers\API\PushController::class, 'store']);
});
