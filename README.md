🚀 Proyecto Full Stack - Terranova

Este es un proyecto full stack desarrollado con Java (Spring Boot) para el backend y React (JSX con Vite) para el frontend.



📌 Características principales

✅ Registro e inicio de sesión de usuarios.

🔎 Buscador de productos con filtros.

📄 Detalle del producto con información relevante.

🛒 Reserva y confirmación de pedido.

🔧 Panel de administración para gestionar usuarios y productos.



🛠️ Tecnologías utilizadas

Frontend (React)

React con Vite

Tailwind CSS / Styled Components (si aplicas estilos)

Axios (para consumir la API)

React Router


Backend (Java)

Java con Spring Boot

Spring Data JPA (para acceso a base de datos)

Spring Security (para autenticación)

PostgreSQL / MySQL (Base de Datos)

API REST con JSON



Infraestructura

Docker (opcional, si se usa)

GitHub Actions (CI/CD)

Despliegue en [Vercel, Railway, AWS, etc.]



📂 Estructura del Proyecto
 proyecto-integrador-equipo4
 ├── frontend/   → Código del frontend (React)
 ├── backend/    → Código del backend (Spring Boot)
 ├── database/   → Archivos SQL / Migraciones
 ├── docs/       → Documentación del proyecto
 
 
 
 🚀 Instalación y configuración

1️⃣ Clonar el repositorio

2️⃣ Configurar el Backend (Java)

🔹 Requisitos previos:

Tener instalado JDK 17+ y Maven

Configurar la base de datos en application.properties

🔹 Pasos para ejecutar:
cd backend
mvn spring-boot:run
Accede a la API en: http://localhost:8080


3️⃣ Configurar el Frontend (React)

🔹 Requisitos previos:

Tener Node.js 18+ y npm instalado

🔹 Pasos para ejecutar:
cd frontend
npm install
npm run dev
Accede a la web en: http://localhost:5173

🔗 Endpoints principales de la API
Registro de usuario
Método: POST
Endpoint: /auth/register
Descripción: Permite registrar un nuevo usuario en el sistema.

Inicio de sesión
Método: POST
Endpoint: /auth/login
Descripción: Autentica a un usuario y devuelve un token de acceso.

Listado de productos
Método: GET
Endpoint: /products
Descripción: Obtiene la lista de productos disponibles.

Detalle de un producto
Método: GET
Endpoint: /products/{id}
Descripción: Obtiene los detalles de un producto específico según su ID.

Crear una reserva
Método: POST
Endpoint: /orders
Descripción: Permite a un usuario realizar una reserva o pedido de productos.

