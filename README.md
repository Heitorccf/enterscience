# EnterScience

Sistema de contratação de artistas com integração à API Deezer. Stack: Laravel 11 (backend) e Next.js 14 (frontend).

## Requisitos

- Git
- Node.js 18+
- PHP 8.2+
- Composer
- MySQL

## Instalação

Clone o repositório:

```bash
git clone https://github.com/Heitorccf/enterscience.git
cd enterscience
```

## Execução

Execute backend e frontend simultaneamente em terminais separados:

**Terminal 1 - Backend:**
```bash
cd backend
# Siga instruções em backend/README.md
```

**Terminal 2 - Frontend:**
```bash
cd frontend
# Siga instruções em frontend/README.md
```

## Estrutura

```
enterscience/
├── backend/     # Laravel API
├── frontend/    # Next.js App
└── README.md
```
```

---

# backend/README.md

```markdown
# Backend - Laravel API

API RESTful para busca de artistas (Deezer) e gestão de contratações.

## Instalação

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

## Configuração do Banco de Dados

Crie o banco de dados MySQL:

```sql
CREATE DATABASE enterscience_db;
```

Configure as credenciais no arquivo `.env`:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=enterscience_db
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
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

## Endpoints

- `GET /api/artists/trending` - Artistas em alta
- `GET /api/artists/search?q=query` - Busca artistas
- `GET /api/artists/{id}` - Detalhes do artista
- `GET /api/bookings` - Lista contratações
- `POST /api/bookings` - Cria contratação
```

---

# frontend/README.md

```markdown
# Frontend - Next.js

Interface para busca de artistas e gestão de contratações.

## Instalação

```bash
cd frontend
npm install
```

## Configuração (Opcional)

Por padrão, a API está configurada para `http://localhost:8000`. Para alterar, crie `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Execução

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:3000`

## Funcionalidades

- Busca de artistas via Deezer API
- Filtros por gênero musical
- Formulário de contratação
- Histórico de contratações
- Design responsivo com Tailwind CSS

## Páginas

- `/` - Homepage com busca e trending artists
- `/booking/[artistId]` - Formulário de contratação
- `/history` - Histórico de contratações