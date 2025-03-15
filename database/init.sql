-- Usar la base de datos o crearla
CREATE DATABASE IF NOT EXISTS terranova_db;
USE terranova_db;

-- Crear la tabla de categorías
CREATE TABLE IF NOT EXISTS categoria_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    url_icono VARCHAR(255) NOT NULL
);

-- Crear la tabla de tours
CREATE TABLE IF NOT EXISTS tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo_duracion ENUM('horas', 'dias') NOT NULL DEFAULT 'dias',
    duracion INT NOT NULL,
    descripcion JSON NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    ubicacion VARCHAR(255), -- NUEVO CAMPO: Ubicación del tour
    categoria_id BIGINT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria_tours(id) ON DELETE CASCADE
);

-- Crear la tabla de imágenes de los tours
CREATE TABLE IF NOT EXISTS imagenes_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Crear la tabla de características
CREATE TABLE IF NOT EXISTS caracteristicas_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    url_icon VARCHAR(255) NOT NULL
);

-- Crear la tabla de relación tours_x_caracteristicas
CREATE TABLE IF NOT EXISTS tours_x_caracteristicas (
    tour_id BIGINT NOT NULL,
    caracteristica_id BIGINT NOT NULL,
    PRIMARY KEY (tour_id, caracteristica_id),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id) REFERENCES caracteristicas_tours(id) ON DELETE CASCADE
);

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    usuario_role ENUM('ROLE_USER', 'ROLE_ADMIN') DEFAULT 'ROLE_USER'
);

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    tour_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA') DEFAULT 'PENDIENTE',
    num_personas INT NOT NULL,
    total DECIMAL(10,2) NOT NULL, -- NUEVO CAMPO: Total de la reserva
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Crear la tabla de disponibilidades (sin columna redundante)
CREATE TABLE IF NOT EXISTS disponibilidades_tours (
    tour_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    disponible BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (tour_id, fecha),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
);

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, email, password, usuario_role) VALUES
('Admin', 'admin', 'admin@dh.com', '$2a$10$5pNnGarTmGjQfNe3FhGEK.bAZskRzn01FWctQcGFXj8SKVNFi28mK', 'ROLE_ADMIN'),
('Pedro', 'Lopez', 'pedro@dh.com', '$2a$10$7fVH2J0U9z0kjOB5OrLySOVEo5xdaJObTT2phvZTxdHZraG5AMsqq', 'ROLE_USER');

-- Insertar categorías
INSERT INTO categoria_tours (nombre, url_icono) VALUES
('Aventura', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-aventura.png'),
('Cultural', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-cultural.png'),
('Playa', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-playa.png'),
('Montaña', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-montana.png'),
('Gastronomía', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-gastronomia.png'),
('Relajación', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-relajacion.png');

-- Insertar características
INSERT INTO caracteristicas_tours (descripcion, url_icon) VALUES
('Guía turístico profesional', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-guia.png'),
('Transporte incluido', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-transporte.png'),
('Comida incluida', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-comida.png'),
('Actividades al aire libre', 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/icon-actividades.png');

-- Insertar tours
INSERT INTO tours (titulo, tipo_duracion, duracion, descripcion, precio, ubicacion, categoria_id) VALUES
('Tour en la Selva', 'dias', 3, '{"detalles": ["Explora la selva tropical.", "Incluye guía profesional y transporte.", "Disfruta de actividades al aire libre."]}', 250.00, 'Amazonas', 1),
('Tour en Pirámides', 'horas', 5, '{"detalles": ["Visita guiada por pirámides históricas.", "Transporte incluido desde el hotel.", "Aprende sobre la cultura ancestral."]}', 120.00, 'Egipto', 2),
('Tour en la Playa', 'dias', 2, '{"detalles": ["Relájate en una playa paradisíaca.", "Incluye comida gourmet y bebidas.", "Disfruta de deportes acuáticos."]}', 180.00, 'Maldivas', 3),
('Tour en la Montaña', 'dias', 4, '{"detalles": ["Escalada y camping en montaña.", "Guía turístico experimentado.", "Vistas panorámicas impresionantes."]}', 300.00, 'Los Andes', 4),
('Tour Gastronómico', 'horas', 3, '{"detalles": ["Degusta platillos locales auténticos.", "Visita mercados tradicionales.", "Aprende sobre la historia culinaria."]}', 90.00, 'Italia', 5),
('Tour de Relajación', 'dias', 5, '{"detalles": ["Spa y masajes relajantes.", "Ambiente tranquilo y privado.", "Incluye yoga y meditación."]}', 400.00, 'Bali', 6),
('Tour en el Desierto', 'dias', 2, '{"detalles": ["Explora dunas de arena dorada.", "Paseo en camello incluido.", "Noche bajo las estrellas."]}', 200.00, 'Sahara', 1),
('Tour Histórico', 'horas', 4, '{"detalles": ["Recorrido por museos y monumentos.", "Guía experto en historia.", "Entradas incluidas."]}', 150.00, 'Roma', 2),
('Tour Acuático', 'horas', 6, '{"detalles": ["Actividades como snorkel y buceo.", "Equipo completo proporcionado.", "Guía especializado en vida marina."]}', 170.00, 'Australia', 3),
('Tour de Aventura Extrema', 'dias', 3, '{"detalles": ["Paracaidismo y rappel.", "Equipamiento seguro y certificado.", "Adrenalina garantizada."]}', 350.00, 'Nueva Zelanda', 4);

-- Insertar imágenes de los tours
INSERT INTO imagenes_tours (tour_id, url_imagen, descripcion) VALUES
(1, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/1.jpeg', 'Selva amazónica vista desde el río'),
(1, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/2.jpg', 'Animales exóticos en su hábitat natural'),
(1, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/3.jpg', 'Cabañas en medio de la selva'),
(2, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/4.jpg', 'Pirámides de Egipto al atardecer'),
(2, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/5.jpg', 'Interior de la Gran Pirámide'),
(2, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/6.jpeg', 'Guía explicando la historia egipcia'),
(3, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/7.jpeg', 'Playa paradisíaca con aguas cristalinas'),
(3, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/8.jpeg', 'Deportes acuáticos en la playa'),
(3, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/9.jpg', 'Atardecer en la playa'),
(4, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/10.jpg', 'Montañas nevadas al amanecer'),
(4, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/11.jpg', 'Camping en la montaña'),
(4, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/12.jpg', 'Senderismo en la montaña'),
(5, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/13.jpg', 'Selva amazónica vista desde el río'),
(5, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/14.jpg', 'Animales exóticos en su hábitat natural'),
(5, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/15.jpg', 'Cabañas en medio de la selva'),
(6, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/16.jpg', 'Pirámides de Egipto al atardecer'),
(6, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/17.jpeg', 'Interior de la Gran Pirámide'),
(6, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/18.jpg', 'Guía explicando la historia egipcia'),
(7, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/19.jpg', 'Playa paradisíaca con aguas cristalinas'),
(7, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/20.jpeg', 'Deportes acuáticos en la playa'),
(7, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/21.jpg', 'Atardecer en la playa'),
(8, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/22.jpeg', 'Montañas nevadas al amanecer'),
(8, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/23.jpg', 'Camping en la montaña'),
(8, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/24.jpg', 'Senderismo en la montaña'),
(9, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/25.jpg', 'Playa paradisíaca con aguas cristalinas'),
(9, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/26.jpg', 'Deportes acuáticos en la playa'),
(9, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/27.jpg', 'Atardecer en la playa'),
(10, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/28.jpg', 'Montañas nevadas al amanecer'),
(10, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/29.jpg', 'Camping en la montaña'),
(10, 'https://terranova-tours-images.s3.us-east-1.amazonaws.com/prueba/30.jpg', 'Senderismo en la montaña');

-- Insertar relación entre tours y características
INSERT INTO tours_x_caracteristicas (tour_id, caracteristica_id) VALUES
(1, 1), (1, 2), (1, 4),
(2, 1), (2, 2),
(3, 2), (3, 3), (3, 4),
(4, 1), (4, 4),
(5, 1), (5, 3),
(6, 3), (6, 4),
(7, 1), (7, 4),
(8, 1), (8, 2),
(9, 2), (9, 4),
(10, 1), (10, 4);

-- Insertar reservas
INSERT INTO reservas (usuario_id, tour_id, fecha_inicio, fecha_fin, num_personas, total, estado) VALUES
(2, 1, '2025-04-10', '2025-04-12', 3, 750.00, 'confirmada'),
(2, 2, '2025-05-15', '2025-05-15', 2, 240.00, 'pendiente'),
(2, 3, '2025-06-20', '2025-06-21', 4, 720.00, 'confirmada'),
(2, 4, '2025-07-01', '2025-07-04', 2, 600.00, 'cancelada'),
(2, 5, '2025-08-10', '2025-08-10', 1, 90.00, 'confirmada'),
(2, 6, '2025-09-05', '2025-09-09', 2, 800.00, 'pendiente');

-- Disponibilidad para el tour 1 (ocupado del 2025-04-10 al 2025-04-12)
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(1, '2025-04-10', FALSE),
(1, '2025-04-11', FALSE),
(1, '2025-04-12', FALSE);

-- Disponibilidad para el tour 2 (ocupado el 2025-05-15) PERO LA FECHA ESTA DISPONIBLE YA QUE LA RESERVA ESTA PENDIENTE AUN NO CONFIRMADA
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(2, '2025-05-15', TRUE);

-- Disponibilidad para el tour 3 (ocupado del 2025-06-20 al 2025-06-21)
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(3, '2025-06-20', FALSE),
(3, '2025-06-21', FALSE);

-- Disponibilidad para el tour 4 (ocupado del 2025-07-01 al 2025-07-04) PERO COMO LA RESERVA ESTA CANCELADA DISPONIBLE PASA A TRUE
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(4, '2025-07-01', TRUE),
(4, '2025-07-02', TRUE),
(4, '2025-07-03', TRUE),
(4, '2025-07-04', TRUE);

-- Disponibilidad para el tour 5 (ocupado el 2025-08-10)
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(5, '2025-08-10', FALSE);

-- Disponibilidad para el tour 6 (ocupado del 2025-09-05 al 2025-09-09) PASA A TRUE DISPONIBLE POR QUE LA RESERVA ESTA PENDIENTE
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(6, '2025-09-05', TRUE),
(6, '2025-09-06', TRUE),
(6, '2025-09-07', TRUE),
(6, '2025-09-08', TRUE),
(6, '2025-09-09', TRUE);
