<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KelasController; // Import controller Anda

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/kelas', [KelasController::class, 'index']);
Route::get('/kelas/{slug}', [KelasController::class, 'show']);