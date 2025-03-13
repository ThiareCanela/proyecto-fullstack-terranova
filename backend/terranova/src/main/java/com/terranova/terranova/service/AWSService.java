package com.terranova.terranova.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AWSService {
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region}")
    private String region;

    @Value("${aws.access-key}")
    private String accessKey;

    @Value("${aws.secret-key}")
    private String secretKey;

    public String subirImagen(MultipartFile imagen) {
        try {
            // Generar un nombre único para la imagen
            String fileName = UUID.randomUUID() + "-" + Paths.get(imagen.getOriginalFilename()).getFileName().toString();

            // Crear el cliente de S3
            S3Client s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)))
                    .build();

            // Subir la imagen a S3
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .acl("public-read")  // Permite acceso público a la imagen
                            .build(),
                    RequestBody.fromBytes(imagen.getBytes()));

            // Retornar la URL de la imagen en S3
            return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen a S3", e);
        }
    }
}