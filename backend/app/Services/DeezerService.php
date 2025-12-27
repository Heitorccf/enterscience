<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DeezerService
{
    protected string $baseUrl = 'https://api.deezer.com';

    /**
     * Search for artists by name with pagination.
     */
    public function searchArtists(string $query, int $limit = 15, int $index = 0): array
    {
        $response = Http::get("{$this->baseUrl}/search/artist", [
            'q' => $query,
            'limit' => $limit,
            'index' => $index // Define o ponto de partida (offset)
        ]);

        return $response->json();
    }

    public function getArtist(string $id): array
    {
        $response = Http::get("{$this->baseUrl}/artist/{$id}");
        return $response->json();
    }

    /**
     * Get trending artists with pagination.
     */
    public function getTrendingArtists(int $limit = 15, int $index = 0, int $genreId = 0): array
    {
        // A Deezer usa /chart/{genre_id}/artists
        $response = Http::get("{$this->baseUrl}/chart/{$genreId}/artists", [
            'limit' => $limit,
            'index' => $index
        ]);

        return $response->json();
    }
}