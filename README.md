# EnterScience

Sistema de contratação de artistas com integração à API Deezer.
Stack: Laravel 11 (Backend) e Next.js 14 (Frontend).

## Requisitos

- Git
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL ou MariaDB

## Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/Heitorccf/enterscience.git
cd enterscience
```

### 2. Configurar Backend

```bash
cd backend
composer install
```

Crie o arquivo `.env` na pasta `backend` com o seguinte conteúdo:

```
APP_NAME=EnterScience
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=enterscience_db
DB_USERNAME=enterscience_user
DB_PASSWORD=enterscience_pass

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

Gere a chave de segurança:

```bash
php artisan key:generate
```

### 3. Configurar Banco de Dados

Acesse o MySQL como superusuário:

```bash
sudo mysql
```

Execute os comandos SQL para criar o banco e usuário:

```sql
CREATE DATABASE enterscience_db;
CREATE USER 'enterscience_user'@'localhost' IDENTIFIED BY 'enterscience_pass';
GRANT ALL PRIVILEGES ON enterscience_db.* TO 'enterscience_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Nota: Se preferir usar senha diferente, altere `enterscience_pass` no SQL acima e no arquivo `.env`.

Execute as migrations:

```bash
php artisan migrate
```

### 4. Configurar Frontend

```bash
cd ../frontend
npm install
```

Opcionalmente, crie o arquivo `.env.local` na pasta `frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Execução

Execute backend e frontend simultaneamente em terminais separados.

**Terminal 1 - Backend:**

```bash
cd backend
php artisan serve
```

API disponível em: `http://localhost:8000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Aplicação disponível em: `http://localhost:3000`

## Estrutura

```
enterscience/
├── backend/     # Laravel 11 API
├── frontend/    # Next.js 14 App
└── README.md
```

## Endpoints da API

- `GET /api/artists/trending` - Artistas em alta
- `GET /api/artists/search?q={query}` - Busca artistas por nome
- `GET /api/artists/{id}` - Detalhes do artista
- `GET /api/bookings` - Lista contratações
- `POST /api/bookings` - Cria contratação

## Funcionalidades

- Busca de artistas em tempo real
- Filtros por gênero musical
- Formulário de contratação com validação
- Histórico de contratações
- Design responsivo com Tailwind CSS