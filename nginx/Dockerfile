# Imagen base de Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copiar el frontend compilado desde el contenedor builder
COPY --from=builder /app/dist .

# Copiar la configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
