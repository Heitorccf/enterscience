export interface Artist {
    id: number | string;
    name: string;
    picture_medium: string;
    nb_fan?: number;
    type: 'artist';
}

export interface Booking {
    id: number;
    contractor_name: string;
    artist_name: string;
    artist_image_url: string;
    event_date: string;
    cache_amount: number;
    event_address?: string;
    created_at: string;
}

// Laravel Pagination Structure
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}