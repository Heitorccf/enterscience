<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\BookingController;

// Rotas de Artistas
Route::get('/artists/trending', [ArtistController::class, 'trending']);
Route::get('/artists/search', [ArtistController::class, 'index']);
Route::get('/artists/{id}', [ArtistController::class, 'show']);

// Rotas de Contratação (Booking)
Route::post('/bookings', [BookingController::class, 'store']); // Salvar
Route::get('/bookings', [BookingController::class, 'index']);  // Histórico