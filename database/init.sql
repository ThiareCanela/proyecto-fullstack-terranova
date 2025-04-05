-- Crear la base de datos con utf8
CREATE DATABASE IF NOT EXISTS terranova_db
CHARACTER SET utf8
COLLATE utf8_general_ci;
USE terranova_db;

-- Configurar el juego de caracteres y la collation para la sesión actual
SET NAMES 'utf8';
SET CHARACTER SET utf8;

-- Crear la tabla de categorías
CREATE TABLE IF NOT EXISTS categoria_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
    url_icono VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de tours con descripcion como TEXT en lugar de JSON
CREATE TABLE IF NOT EXISTS tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    tipo_duracion ENUM('HORAS', 'DIAS') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'DIAS',
    duracion INT NOT NULL,
    descripcion TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    pais ENUM('MÉXICO','COLOMBIA','ARGENTINA','BRASIL','JAMAICA','URUGUAY','COSTA RICA','CHILE','PERÚ') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'MÉXICO',
    categoria_id BIGINT NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categoria_tours(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de imágenes de los tours
CREATE TABLE IF NOT EXISTS imagenes_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT NOT NULL,
    url_imagen VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    descripcion VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de características
CREATE TABLE IF NOT EXISTS caracteristicas_tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    url_icon VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de relación tours_x_caracteristicas
CREATE TABLE IF NOT EXISTS tours_x_caracteristicas (
    tour_id BIGINT NOT NULL,
    caracteristica_id BIGINT NOT NULL,
    PRIMARY KEY (tour_id, caracteristica_id),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id) REFERENCES caracteristicas_tours(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    apellido VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    email VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL UNIQUE,
    password VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
    usuario_role ENUM('ROLE_USER', 'ROLE_ADMIN') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'ROLE_USER'
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de reservas
CREATE TABLE IF NOT EXISTS reservas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    tour_id BIGINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    hora_inicio TIME,
    hora_fin TIME,
    estado ENUM('PENDIENTE', 'CONFIRMADA', 'CANCELADA') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'PENDIENTE',
    num_personas INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

-- Crear la tabla de disponibilidades
CREATE TABLE IF NOT EXISTS disponibilidades_tours (
    tour_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    disponible BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (tour_id, fecha),
    FOREIGN KEY (tour_id) REFERENCES tours(id) ON DELETE CASCADE
) CHARACTER SET utf8 COLLATE utf8_general_ci;

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

-- Insertar tours con descripcion como STRING
INSERT INTO tours (titulo, tipo_duracion, duracion, descripcion, precio, pais, categoria_id) VALUES
('Tour en la Selva', 'DIAS', 3, 'Sumérgete en la exuberante belleza de la selva tropical con este tour de 3 días diseñado para los amantes de la naturaleza y la aventura. Este paquete incluye un guía profesional que te acompañará mientras exploras senderos vírgenes, observas animales exóticos en su hábitat natural y descubres paisajes impresionantes. Además, el transporte está completamente cubierto desde tu punto de partida hasta el corazón de la selva. Durante tu estadía, tendrás la oportunidad de participar en emocionantes actividades al aire libre, como caminatas guiadas, navegación por ríos y visitas a comunidades locales. Este tour es perfecto para quienes buscan desconectar de la rutina urbana y reconectar con la naturaleza en su estado más puro.', 250.00, 'MÉXICO', 1),
('Tour en Pirámides', 'DIAS', 1, 'Viaja en el tiempo con este fascinante tour de 1 día que te llevará a las majestuosas pirámides históricas de México. Este recorrido incluye transporte desde tu hotel, lo que garantiza comodidad y conveniencia durante toda la experiencia. Acompañado por un guía experto, aprenderás sobre la rica cultura ancestral que dio origen a estas imponentes estructuras. Desde conocer las técnicas arquitectónicas empleadas hasta escuchar relatos mitológicos y ceremoniales, este tour te permitirá apreciar la grandeza de una de las civilizaciones más avanzadas de la historia. Ideal para entusiastas de la historia y curiosos culturales, esta excursión ofrece una mezcla equilibrada de educación y asombro.', 120.00, 'MÉXICO', 2),
('Tour en la Playa', 'DIAS', 2, 'Escápate a un paraíso playero con este relajante tour de 2 días en Colombia. Relájate en arenas doradas bañadas por aguas cristalinas mientras disfrutas de un ambiente paradisíaco. Este paquete incluye deliciosas comidas gourmet y bebidas refrescantes para consentir tu paladar mientras te desconectas del estrés diario. Si prefieres algo más activo, también podrás participar en emocionantes deportes acuáticos como surf, paddleboarding o snorkel. Ya sea que desees tomar el sol, nadar en aguas tranquilas o simplemente disfrutar de atardeceres inolvidables, este tour promete una experiencia única frente al mar.', 180.00, 'COLOMBIA', 3),
('Tour en la Montaña', 'DIAS', 4, 'Prepárate para una aventura inolvidable de 4 días en las montañas chilenas. Este tour combina escalada, camping y senderismo guiado con vistas panorámicas absolutamente impresionantes. Un guía turístico experimentado te acompañará en cada paso, asegurando tu seguridad mientras exploras picos nevados, valles verdes y lagunas escondidas. Este paquete es ideal tanto para principiantes como para expertos en montañismo, ya que se adapta a diferentes niveles de habilidad. Además, tendrás la oportunidad de acampar bajo cielos estrellados y despertar rodeado de la serenidad de la naturaleza. Perfecto para quienes buscan desafiar sus límites y conectar con paisajes impresionantes.', 300.00, 'CHILE', 4),
('Tour Gastronómico', 'DIAS', 1, 'Disfruta de una experiencia culinaria auténtica con este tour gastronómico de 1 día que celebra los sabores locales de México. Visitarás mercados tradicionales donde degustarás platillos típicos preparados con ingredientes frescos y técnicas ancestrales. A lo largo del recorrido, un experto en gastronomía compartirá contigo la historia detrás de cada bocado, explicando cómo la comida ha sido parte integral de la cultura mexicana a lo largo de los siglos. Este tour no solo satisface el paladar, sino que también ofrece una mirada profunda a las raíces culinarias del país. Perfecto para foodies y curiosos culturales, esta experiencia dejará un sabor duradero en tu memoria.', 90.00, 'MÉXICO', 5),
('Tour de Relajación', 'DIAS', 1, 'Encuentra paz interior con este exclusivo tour de 1 día centrado en el bienestar y la relajación. Ubicado en un entorno tranquilo y privado en Chile, este paquete incluye sesiones de spa, masajes relajantes, yoga y meditación guiada. El ambiente calmado y las instalaciones de alta calidad están diseñados para ofrecer una experiencia holística que revitalice cuerpo y mente. Sea cual sea tu nivel de experiencia en prácticas de bienestar, este tour está adaptado para proporcionarte herramientas útiles para manejar el estrés y mejorar tu calidad de vida. Ideal para quienes buscan escapar de la agitación cotidiana y encontrar equilibrio personal.', 400.00, 'CHILE', 6),
('Tour en el Desierto', 'DIAS', 2, 'Descubre la magia del desierto con este tour de 2 días lleno de experiencias únicas en México. Explora vastas dunas de arena dorada mientras disfrutas de un emocionante paseo en camello que te llevará a través de paisajes surrealistas. Por la noche, acampa bajo un manto de estrellas brillantes y vive la serenidad del silencio absoluto. Este paquete ofrece una combinación perfecta de aventura y contemplación, permitiéndote desconectar del mundo moderno y conectarte con la naturaleza en su forma más pura. Ideal para viajeros intrépidos que buscan nuevas perspectivas y momentos inolvidables.', 200.00, 'MÉXICO', 1),
('Tour Histórico', 'DIAS', 4, 'Embárcate en un viaje educativo y cultural con este tour histórico de 4 días en Chile. Este recorrido te llevará a través de museos emblemáticos, monumentos icónicos y sitios patrimoniales, acompañado por un guía experto en historia. Cada parada está cuidadosamente seleccionada para ofrecerte una visión completa del pasado del país, desde su legado colonial hasta eventos contemporáneos. Las entradas a todos los lugares están incluidas, lo que facilita una experiencia sin preocupaciones. Este tour es ideal para quienes desean profundizar su comprensión de la historia y apreciar la evolución cultural del destino.', 150.00, 'CHILE', 2),
('Tour Acuático', 'DIAS', 6, 'Sumérgete en las aguas cristalinas del Perú con este emocionante tour acuático de 6 días. Diseñado para los amantes del océano, este paquete incluye actividades como snorkel y buceo, con equipo completo proporcionado para garantizar tu seguridad y comodidad. Acompañado por un guía especializado en vida marina, explorarás arrecifes vibrantes, cuevas submarinas y ecosistemas únicos mientras aprendes sobre la biodiversidad local. Este tour es perfecto para quienes buscan una mezcla de diversión, aprendizaje y conexión con la naturaleza marina.', 170.00, 'PERÚ', 3),
('Tour de Aventura Extrema', 'DIAS', 3, 'Si buscas adrenalina pura, este tour de aventura extrema de 3 días en México es exactamente lo que necesitas. Desde emocionantes saltos en paracaídas hasta descensos en rappel, cada actividad está diseñada para poner a prueba tus límites y brindarte una dosis de emoción inigualable. Todo el equipamiento necesario está certificado y provisto por profesionales, asegurando tu seguridad en cada paso del camino. Este paquete es ideal para aquellos que buscan vivir experiencias fuera de lo común y crear recuerdos inolvidables en compañía de otros aventureros.', 350.00, 'MÉXICO', 4);


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
(2, 1, '2025-04-10', '2025-04-12', 3, 750.00, 'CONFIRMADA'),
(2, 2, '2025-05-15', '2025-05-15', 2, 240.00, 'PENDIENTE'),
(2, 3, '2025-06-20', '2025-06-21', 4, 720.00, 'CONFIRMADA'),
(2, 4, '2025-07-01', '2025-07-04', 2, 600.00, 'CANCELADA'),
(2, 5, '2025-08-10', '2025-08-10', 1, 90.00, 'CONFIRMADA'),
(2, 6, '2025-09-05', '2025-09-05', 2, 800.00, 'PENDIENTE'),
(2, 2, '2025-02-05', '2025-02-05', 2, 240.00, 'CONFIRMADA'),
(2, 5, '2025-02-01', '2025-02-01', 2, 240.00, 'CONFIRMADA');


-- Disponibilidad para el tour 1 (ocupado del 2025-04-10 al 2025-04-12)
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(1, '2025-04-10', FALSE),
(1, '2025-04-11', FALSE),
(1, '2025-04-12', FALSE);

-- Disponibilidad para el tour 2 (ocupado el 2025-05-15) PERO LA FECHA ESTA DISPONIBLE YA QUE LA RESERVA ESTA PENDIENTE AUN NO CONFIRMADA
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(2, '2025-05-15', TRUE);

-- Disponibilidad para el tour 2 fecha pasada (ocupado el 2025-02-05) 
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(2, '2025-02-05', FALSE);


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
-- Disponibilidad para el tour 5 (ocupado el 2025-02-01) reserva en tiempo pasado 
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(5, '2025-02-01', FALSE);

-- Disponibilidad para el tour 6 (ocupado del 2025-09-05 al 2025-09-09) PASA A TRUE DISPONIBLE POR QUE LA RESERVA ESTA PENDIENTE
INSERT INTO disponibilidades_tours (tour_id, fecha, disponible) VALUES
(6, '2025-09-05', TRUE);