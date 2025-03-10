-- Usar la base de datos o crearla
CREATE DATABASE IF NOT EXISTS terranova_db;
USE terranova_db;

-- Crear la tabla de categorías
CREATE TABLE IF NOT EXISTS categoria_tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    url_icon VARCHAR(255) NOT NULL
);

-- Crear la tabla de tours
CREATE TABLE IF NOT EXISTS tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo_duracion ENUM('horas', 'dias') NOT NULL DEFAULT 'dias',
    duracion INT NOT NULL,
    descripcion JSON NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria_tours(id)
);

-- Crear la tabla de imágenes de los tours
CREATE TABLE IF NOT EXISTS imagenes_tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

-- Crear la tabla de características
CREATE TABLE IF NOT EXISTS caracteristicas_tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    url_icon VARCHAR(255) NOT NULL
);

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    usuario_role ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER'
);

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    tour_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA') DEFAULT 'PENDIENTE',
    num_personas INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (tour_id) REFERENCES tours(id)
);

CREATE TABLE IF NOT EXISTS tours_x_caracteristicas (
    tour_id INT NOT NULL,
    caracteristica_id INT NOT NULL,
    PRIMARY KEY (tour_id, caracteristica_id),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id) REFERENCES caracteristicas_tours(id) ON DELETE CASCADE
);

-- Crear la tabla de disponibilidad
CREATE TABLE IF NOT EXISTS disponibilidades_tours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tour_id INT NOT NULL,
    fecha DATE NOT NULL,
    disponible BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (tour_id) REFERENCES tours(id),
    UNIQUE (tour_id, fecha)
);

-- Insertar categorías
INSERT INTO categoria_tours (nombre, url_icon) VALUES
('Aventura', 'https://terranova-tours-images.s3.amazonaws.com/icon-aventura.png'),
('Cultural', 'https://terranova-tours-images.s3.amazonaws.com/icon-cultural.png'),
('Playa', 'https://terranova-tours-images.s3.amazonaws.com/icon-playa.png'),
('Montaña', 'https://terranova-tours-images.s3.amazonaws.com/icon-montana.png');

-- Insertar tours
INSERT INTO tours (titulo, tipo_duracion, duracion, descripcion, precio, categoria_id) VALUES
('Tour en la Selva', 'dias', 3, '{"detalle": "Explora la selva tropical"}', 250.00, 1),
('Tour en Pirámides', 'horas', 5, '{"detalle": "Visita guiada por pirámides"}', 120.00, 2),
('Tour en la Playa', 'dias', 2, '{"detalle": "Relájate en una playa paradisíaca"}', 180.00, 3),
('Tour en la Montaña', 'dias', 4, '{"detalle": "Escalada y camping en montaña"}', 300.00, 4);

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, email, password, usuario_role) VALUES
('Admin', 'admin', 'admin@dh.com', 'admin', 'ROLE_ADMIN'),
('Pedro', 'Lopez', 'pedro@dh.com', 'user', 'ROLE_USER');

-- Insertar una reserva
INSERT INTO reservas (usuario_id, tour_id, fecha_inicio, fecha_fin, num_personas, estado) VALUES
(2, 1, '2025-04-10', '2025-04-12', 3, 'confirmada');

-- Insertar fechas ocupadas en disponibilidades
INSERT INTO disponibilidades_tours (tour_id, fecha) VALUES
(1, '2025-04-10'), (1, '2025-04-11'), (1, '2025-04-12');

