# Usar Java 17 como base
FROM eclipse-temurin:17-jdk

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de Maven Wrapper y pom.xml
COPY mvnw mvnw.cmd pom.xml ./

# Descargar dependencias
RUN ./mvnw dependency:go-offline

# Copiar todo el código fuente
COPY . .

# Compilar sin pruebas
RUN ./mvnw clean package -DskipTests

# Exponer el puerto 8080
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "target/terranova-0.0.1-SNAPSHOT.jar"]
