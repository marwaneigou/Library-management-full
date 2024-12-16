<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/upload-image', [BookController::class, 'uploadImage']);
Route::post('/books/{id}', [BookController::class, 'update']);
Route::apiResource('books', BookController::class);
