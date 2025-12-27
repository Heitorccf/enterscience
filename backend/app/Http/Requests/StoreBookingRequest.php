<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Validation rules as per requirements
            'contractor_name' => 'required|string|min:3|max:255',
            'artist_id'       => 'required|string',
            'artist_name'     => 'required|string',
            'artist_image_url'=> 'nullable|string',
            'cache_amount'    => 'nullable|numeric|min:0',
            'event_date'      => 'required|date|after:yesterday', // Cannot be past date
            'event_address'   => 'nullable|string|max:500',
        ];
    }
}