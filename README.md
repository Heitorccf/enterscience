# EnterScience - Teste Técnico

Este projeto consiste em uma aplicação Fullstack (Laravel + Next.js) que consome a API da Deezer para listar artistas e permite simular a contratação de shows, salvando os dados em um banco MySQL.

## Como Rodar o Projeto

### Pré-requisitos

* Git
* Docker e Docker Compose (Recomendado)

### Passo a Passo (Docker)

1. **Clone o repositório:**
```bash
git clone https://github.com/Heitorccf/enterscience.git
cd enterscience
```


2. **Configuração Inicial:**
Copie o arquivo de exemplo de ambiente na pasta backend:
```bash
cd backend
cp .env.example .env
cd ..
```


3. **Ajuste do `.env`:**
Abra o arquivo `backend/.env` e configure a conexão com o banco para funcionar no Docker:
```ini
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=enterscience_db
DB_USERNAME=enterscience_user
DB_PASSWORD=enterscience_pass
```


4. **Subir o Ambiente:**
Na raiz do projeto, execute:
```bash
docker-compose up -d
```


5. **Instalação e Migração:**
Instale as dependências e crie as tabelas do banco:
```bash
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
```


6. **Acesse:**
* Frontend: `http://localhost:3000`
* Backend (API): `http://localhost:8000`



---

## Comandos Úteis e Solução de Problemas

Se você encontrar erros de permissão ou banco de dados, use os comandos abaixo na raiz do projeto:

### 1. Corrigir Permissões de Pasta (Erro 500 no Linux)

O Laravel precisa escrever pastas de log e cache. Se você receber um "Internal Server Error", rode isto para liberar a escrita:

```bash
sudo chmod -R 777 backend/storage backend/bootstrap/cache
```

### 2. Criar Tabelas no Banco (Table not found)

Se o banco de dados for reiniciado ou apagado, você precisa recriar a estrutura das tabelas:

```bash
docker-compose exec app php artisan migrate
```

### 3. Limpar Cache da Aplicação (Alterações não aparecem)

Se você mudou o `.env` ou configurações e nada mudou, limpe o cache do Laravel:

```bash
docker-compose exec app php artisan optimize:clear
```

### 4. Reiniciar do Zero

Para apagar tudo (banco e containers) e recomeçar limpo:

```bash
docker-compose down -v
docker-compose up -d --build
```

---

## Estrutura do Projeto

* **backend/**: API em Laravel 11.
* **frontend/**: Interface em Next.js (React).
* **docker/**: Configurações do Nginx e Dockerfiles.