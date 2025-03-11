# Etapa 1: Build do aplicativo React
FROM node:18-alpine AS build
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build do React
RUN npm run build

# Etapa 2: Servir a aplicação estática com Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

