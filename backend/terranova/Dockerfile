# Etapa 1: Compilación
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /app

# Copiar archivos necesarios para descargar dependencias
COPY .mvn .mvn
COPY mvnw mvnw.cmd pom.xml ./

# Dar permisos de ejecución a Maven Wrapper
RUN chmod +x mvnw

# Descargar dependencias para evitar descargas repetitivas en cambios de código
RUN ./mvnw dependency:go-offline

# Copiar el código fuente y compilar sin pruebas
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Etapa 2: Imagen final más liviana
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copiar solo el .jar compilado desde la etapa anterior
COPY --from=builder /app/target/terranova-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
