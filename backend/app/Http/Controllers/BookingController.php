<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Http\Requests\StoreBookingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * List all bookings with pagination.
     */
    public function index(Request $request): JsonResponse
    {
        // Filter by artist or contractor if search query exists
        $query = Booking::query();

        if ($search = $request->input('q')) {
            $query->where('artist_name', 'like', "%{$search}%")
                  ->orWhere('contractor_name', 'like', "%{$search}%");
        }

        // Return paginated results, latest first
        $bookings = $query->latest()->paginate(10);

        return response()->json($bookings);
    }

    /**
     * Store a new booking in the database.
     */
    public function store(StoreBookingRequest $request): JsonResponse
    {
        // Validated data comes from StoreBookingRequest
        $data = $request->validated();

        // Create booking record
        $booking = Booking::create($data);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking
        ], 201);
    }
}