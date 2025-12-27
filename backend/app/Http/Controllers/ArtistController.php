<?php

namespace App\Http\Controllers;

use App\Services\DeezerService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArtistController extends Controller
{
    protected DeezerService $deezerService;

    // Inject DeezerService dependency
    public function __construct(DeezerService $deezerService)
    {
        $this->deezerService = $deezerService;
    }

    /**
     * Search artists based on query param.
     */
    public function index(Request $request): JsonResponse
    {
        $query = $request->input('q');

        if (!$query) {
            return response()->json(['data' => []], 200);
        }

        $result = $this->deezerService->searchArtists($query);

        return response()->json($result);
    }

    /**
     * Get trending artists for the homepage.
     */
    public function trending(): JsonResponse
    {
        $result = $this->deezerService->getTrendingArtists();
        return response()->json($result);
    }

    /**
     * Get details of a specific artist.
     */
    public function show(string $id): JsonResponse
    {
        $result = $this->deezerService->getArtist($id);
        return response()->json($result);
    }
}