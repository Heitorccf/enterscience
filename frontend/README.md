# Frontend - Next.js

Interface para busca de artistas e gestão de contratações. Stack: Next.js 14, TypeScript, Tailwind CSS.

## Requisitos

Backend Laravel rodando em `http://localhost:8000`

## Instalação

```bash
cd frontend
npm install
```

## Configuração

Crie `.env.local` na raiz do frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Se não configurado, usa `http://localhost:8000` por padrão.

## Execução

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:3000`

## Stack Tecnológica

- Next.js 14 (Pages Router)
- TypeScript
- Tailwind CSS v3
- Axios (HTTP client)
- React Hook Form (validação)
- React Hot Toast (notificações)
- Lucide React (ícones)
- Framer Motion (animações)

## Funcionalidades

- Busca em tempo real com debounce
- Filtros por gênero musical
- Scroll infinito com paginação
- Formulário com máscara de moeda (R$)
- Date picker nativo
- Design responsivo (mobile-first)
- Loading states e feedbacks visuais

## Estrutura de Páginas

```
pages/
├── index.tsx          # Homepage - busca e trending
├── booking/
│   └── [artistId].tsx # Formulário de contratação
└── history.tsx        # Histórico de contratações
```

## Build para Produção

```bash
npm run build
npm start
```