<?php
namespace App\Http\Controllers;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::query();

        // Filter by search term
        if ($search = $request->input('q')) {
            $query->where(function ($q) use ($search) {
                $q->where('artist_name', 'like', "%{$search}%")
                  ->orWhere('contractor_name', 'like', "%{$search}%");
            });
        }

        $bookings = $query->orderBy('created_at', 'desc')->paginate(9);
        return response()->json($bookings);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'contractor_name' => 'required|string|max:255',
            'artist_id' => 'required|string',
            'artist_name' => 'required|string',
            'artist_image_url' => 'required|string',
            'event_date' => 'required|date',
            'cache_amount' => 'required|numeric',
            'event_address' => 'nullable|string'
        ]);

        $booking = Booking::create($validated);
        return response()->json($booking, 201);
    }
}