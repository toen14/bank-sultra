<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect(route('login'));
});

Route::middleware(['auth'])->group(function () {
    Route::get('/pdf/debitors', [\App\Http\Controllers\PdfController::class, 'PdfDebitor'])->name('pdf-debitors');
    Route::get('/pdf/users', [\App\Http\Controllers\PdfController::class, 'PdfUser'])->name('pdf-users');
    Route::get('/pdf/branches', [\App\Http\Controllers\PdfController::class, 'PdfBranch'])->name('pdf-branches');

    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/users', \App\Http\Controllers\UserController::class);
    Route::resource('/debitors', \App\Http\Controllers\DebitorController::class);
    Route::resource('/branches', \App\Http\Controllers\BranchController::class);
    Route::resource('/administrasi/backup', \App\Http\Controllers\BackupController::class);

    Route::resource('users/{user}/debitors', \App\Http\Controllers\UserControllers\UserDebitorController::class)->names('user-debitors');
    Route::patch('users/{user}/debitors/{debitor}/status', [\App\Http\Controllers\UserControllers\UserDebitorController::class, 'updateStatus'])->name('user-debitors.status');

    Route::post('notes/users/{user}', [\App\Http\Controllers\NoteController::class, 'store'])->name('note.store');
});

require __DIR__ . '/auth.php';
