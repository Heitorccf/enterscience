<?php
namespace App\Http\Controllers;
use App\Services\DeezerService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArtistController extends Controller
{
    protected DeezerService $deezerService;

    public function __construct(DeezerService $deezerService)
    {
        $this->deezerService = $deezerService;
    }

    public function index(Request $request): JsonResponse
    {
        $query = $request->input('q');
        $limit = $request->input('limit', 15);
        $index = $request->input('index', 0);

        if (!$query) {
            return response()->json(['data' => []], 200);
        }

        $result = $this->deezerService->searchArtists($query, $limit, $index);
        return response()->json($result);
    }

    public function trending(Request $request): JsonResponse
    {
        $limit = $request->input('limit', 15);
        $index = $request->input('index', 0);
        $genreId = $request->input('genre_id', 0); // 0 = all genres

        $result = $this->deezerService->getTrendingArtists($limit, $index, $genreId);
        return response()->json($result);
    }

    public function show(string $id): JsonResponse
    {
        $result = $this->deezerService->getArtist($id);
        return response()->json($result);
    }
}