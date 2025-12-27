export interface Artist {
    id: number | string;
    name: string;
    picture_medium: string; // URL da imagem vindo da Deezer
    nb_fan?: number; // Número de fãs (opcional dependendo do endpoint)
    type: 'artist';
}

export interface Booking {
    id: number;
    contractor_name: string;
    artist_name: string;
    event_date: string;
    cache_amount: number;
    created_at: string;
}