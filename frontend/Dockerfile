# Etapa 1: Construcción
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar archivos de configuración y bajar dependencias
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copiar el código fuente y construir el proyecto
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción con Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar solo los archivos estáticos generados por Vite
COPY --from=builder /app/dist .

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
