# Etapa de construção
FROM node:18 as builder

WORKDIR /app

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos de build do aplicativo React para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração do Nginx para lidar com as rotas do React
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 8080 (alterada da porta 80)
EXPOSE 8080

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]