# Backend - Laravel API

API RESTful para integração com Deezer e gestão de contratações. Stack: Laravel 11, MySQL.

## Requisitos

- PHP 8.2+
- Composer
- MySQL

## Instalação

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

## Configuração do Banco de Dados

Crie o banco de dados:

```sql
CREATE DATABASE enterscience_db;
```

Configure as credenciais no `.env`:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=enterscience_db
DB_USERNAME=root
DB_PASSWORD=
```

Execute as migrations:

```bash
php artisan migrate
```

## Execução

```bash
php artisan serve
```

Servidor disponível em: `http://localhost:8000`

## Endpoints da API

### Artists
- `GET /api/artists/trending` - Artistas em alta
- `GET /api/artists/search?q={query}` - Busca artistas
- `GET /api/artists/{id}` - Detalhes do artista

### Bookings
- `GET /api/bookings` - Lista contratações
- `POST /api/bookings` - Cria contratação

## Estrutura do Projeto

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── ArtistController.php
│   │   └── BookingController.php
│   └── Requests/
│       └── StoreBookingRequest.php
├── Models/
│   └── Booking.php
└── Services/
    └── DeezerService.php
```

## Integração Deezer

A API utiliza endpoints públicos da Deezer sem necessidade de autenticação:
- Chart: `https://api.deezer.com/chart`
- Search: `https://api.deezer.com/search/artist`
- Artist: `https://api.deezer.com/artist/{id}`