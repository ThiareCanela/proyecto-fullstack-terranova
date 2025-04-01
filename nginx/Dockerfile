FROM nginx:alpine

# Copiar los archivos del frontend
COPY frontend/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



