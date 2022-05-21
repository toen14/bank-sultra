<?php

use Illuminate\Support\Facades\Route;

Route::post('login', [\App\Http\Controllers\API\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::delete('logout', [\App\Http\Controllers\API\AuthController::class, 'logout']);
    Route::delete('logout-all', [\App\Http\Controllers\API\AuthController::class, 'logoutAll']);
    Route::get('login/me', [\App\Http\Controllers\API\AuthController::class, 'me']);
});
