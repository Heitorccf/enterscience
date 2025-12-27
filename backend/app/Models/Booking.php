<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Libera esses campos para serem salvos pelo formulário
    protected $fillable = [
        'contractor_name',
        'artist_id',
        'artist_name',
        'artist_image_url',
        'event_date',
        'cache_amount',
        'event_address'
    ];

    // Garante que o cache seja tratado como número e data como data
    protected $casts = [
        'event_date' => 'date',
        'cache_amount' => 'decimal:2'
    ];
}