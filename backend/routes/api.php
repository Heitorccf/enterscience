<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\BookingController;

// Artist routes
Route::get('/artists/trending', [ArtistController::class, 'trending']);
Route::get('/artists/search', [ArtistController::class, 'index']);
Route::get('/artists/{id}', [ArtistController::class, 'show']);

// Booking routes
Route::post('/bookings', [BookingController::class, 'store']); // Create booking
Route::get('/bookings', [BookingController::class, 'index']);  // List bookings
Route::get('/bookings/{id}', [BookingController::class, 'show']);   // Show single booking
Route::put('/bookings/{id}', [BookingController::class, 'update']); // Update booking
Route::delete('/bookings/{id}', [BookingController::class, 'destroy']); // Delete booking