<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\BookingController;

// Prefixo automático '/api' já é adicionado pelo Laravel

Route::prefix('artists')->group(function () {
    Route::get('/trending', [ArtistController::class, 'trending']);
    Route::get('/search', [ArtistController::class, 'index']);
    Route::get('/{id}', [ArtistController::class, 'show']);
});

Route::prefix('bookings')->group(function () {
    Route::get('/', [BookingController::class, 'index']);
    Route::post('/', [BookingController::class, 'store']);
});