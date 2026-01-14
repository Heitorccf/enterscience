# EnterScience - Teste Técnico

Este projeto consiste em uma aplicação Fullstack (Laravel + Next.js) que consome a API da Deezer para listar artistas e permite simular a contratação de shows.

## Como Rodar o Projeto

Você pode rodar este projeto de duas formas:

1. **Via Docker (Recomendado):** Ambiente isolado e pré-configurado.
2. **Localmente:** Usando PHP e Node.js instalados na sua máquina.

---

### Pré-requisitos

* Git
* Docker e Docker Compose (para opção Docker)
* PHP 8.2+, Composer, Node.js e MySQL (para opção Local)

---

### Configuração Inicial (Backend)

Independentemente do método escolhido, faça o setup inicial:

1. Clone o repositório:
```bash
git clone https://github.com/Heitorccf/enterscience.git
cd enterscience

```


2. Entre na pasta do backend:
```bash
cd backend

```


3. Copie o arquivo de exemplo de ambiente:
```bash
cp .env.example .env

```



---

### Opção 1: Rodando com Docker (Recomendado)

Nesta opção, tanto o backend quanto o banco de dados rodam dentro de containers.

1. **Configure o `.env` do Backend:**
Abra o arquivo `backend/.env` e garanta que as configurações de banco sejam estas (atenção ao HOST e PORT):
```ini
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=enterscience_db
DB_USERNAME=enterscience_user
DB_PASSWORD=enterscience_pass

CACHE_STORE=file
SESSION_DRIVER=file

```


> **Nota:** Dentro do Docker, o host é o nome do serviço (`db`) e a porta é a interna (`3306`).


2. **Suba os containers:**
Volte para a raiz do projeto (onde está o `docker-compose.yml`) e execute:
```bash
docker-compose up -d

```


3. **Instale as dependências e rode as migrations:**
Execute estes comandos para preparar o Laravel dentro do container:
```bash
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --seed

```


4. O Backend estará rodando em: `http://localhost:8000`

---

### Opção 2: Rodando Localmente (Sem Docker)

Use esta opção se preferir rodar o servidor PHP e o MySQL diretamente na sua máquina.

1. **Configure o `.env` do Backend:**
Abra o arquivo `backend/.env`. Aqui a configuração muda dependendo de onde está seu banco de dados:
* **Cenário A:** Você tem o MySQL instalado no PC (XAMPP, Workbench, etc) na porta padrão:
```ini
DB_HOST=127.0.0.1
DB_PORT=3306

```


* **Cenário B:** Você quer rodar o PHP localmente, mas usar o banco do Docker:
```ini
DB_HOST=127.0.0.1
DB_PORT=3307

```


*(A porta 3307 é exposta pelo Docker Compose para acesso externo).*


2. **Instale as dependências:**
```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --seed

```


3. **Inicie o servidor:**
```bash
php artisan serve

```



---

### Frontend (Next.js)

O Frontend roda fora do Docker (ou pode ser configurado via Dockerfile na pasta frontend, se preferir). Para rodar localmente:

1. Entre na pasta do frontend:
```bash
cd frontend

```


2. Instale as dependências e rode o projeto:
```bash
npm install
npm run dev

```


3. Acesse em: `http://localhost:3000`

---

### Solução de Problemas Comuns

**Erro de conexão com o banco (Connection Refused/Timeout):**

* Se estiver usando **Docker**, verifique se `DB_HOST=db`.
* Se estiver rodando **Localmente** (php artisan serve), verifique se `DB_HOST=127.0.0.1`.
* Verifique se a `DB_PORT` está correta conforme a tabela acima.

**Erro de Sessão/Cache:**
Se o sistema estiver lento ou travando, garanta que no `.env` esteja configurado para usar arquivos, evitando dependência excessiva do banco em ambiente de desenvolvimento:

```ini
SESSION_DRIVER=file
CACHE_STORE=file