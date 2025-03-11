# Etapa 1: Build do aplicativo React
FROM node:18-alpine as build
WORKDIR /app

# Copia apenas os arquivos de dependência primeiro para aproveitar cache
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto (incluindo public, src, etc.)
COPY . .

# Executa o build do React
RUN npm run build

# Etapa 2: Servir a aplicação estática com Nginx
FROM nginx:alpine
# Remove o conteúdo padrão do Nginx (opcional) e copia o build do React para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
