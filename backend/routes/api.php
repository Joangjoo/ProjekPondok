<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EnrollmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\KelasController;
use App\Http\Controllers\Api\MyCoursesController;

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/kelas', [KelasController::class, 'index']);
Route::get('/kelas/{id}', [KelasController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });
});

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{id}', [ArticleController::class, 'show'])->name('api.articles.show');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/enroll/{kelas}', [EnrollmentController::class, 'store']);
    Route::get('/my-courses', [MyCoursesController::class, 'index']);
});
