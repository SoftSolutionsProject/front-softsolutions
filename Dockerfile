# Etapa 1: Build da aplicação Angular
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=aws

# Etapa 2: Servir com NGINX
FROM nginx:alpine

# Copia o build do Angular (A PASTA browser!)
COPY --from=builder /app/dist/soft-solutions-app/browser /usr/share/nginx/html

# Copia configuração do nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
