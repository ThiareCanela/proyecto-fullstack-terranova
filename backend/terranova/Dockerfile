# Usar Java 17 como base
FROM eclipse-temurin:17-jdk

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del Wrapper de Maven necesarios para compilar
COPY .mvn .mvn
COPY mvnw mvnw.cmd pom.xml ./

# Dar permisos de ejecución a mvnw
RUN chmod +x mvnw

# Descargar dependencias antes de copiar el codigo fuente
RUN ./mvnw dependency:go-offline

# Copiar todo el código fuente
COPY . .

# Compilar sin pruebas
RUN ./mvnw clean package -DskipTests

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "target/terranova-0.0.1-SNAPSHOT.jar"]

