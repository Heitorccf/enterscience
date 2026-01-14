FROM node:18-alpine

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Definir variável de ambiente para o build (ajustar se for produção real)
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

# Build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]