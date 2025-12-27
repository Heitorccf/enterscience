<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class DeezerService
{
    protected string $baseUrl = 'https://api.deezer.com';

    /**
     * Search for artists by name.
     */
    public function searchArtists(string $query): array
    {
        // Fetch artists from Deezer search endpoint
        $response = Http::get("{$this->baseUrl}/search/artist", [
            'q' => $query,
            'limit' => 12
        ]);

        return $response->json();
    }

    /**
     * Get specific artist details.
     */
    public function getArtist(string $id): array
    {
        // Fetch artist details by ID
        $response = Http::get("{$this->baseUrl}/artist/{$id}");
        
        return $response->json();
    }

    /**
     * Get trending artists (using Chart endpoint).
     */
    public function getTrendingArtists(): array
    {
        // Fetch top artists from Deezer charts
        $response = Http::get("{$this->baseUrl}/chart/0/artists", [
            'limit' => 12
        ]);

        return $response->json();
    }
}