package com.terranova.terranova.s3Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    @Value("${AWS_BUCKET_NAME}")
    private String bucketName;

    @Value("${S3_BASE_URL}")
    private String s3BaseUrl;

    private final S3Client s3Client;

    public S3Service(S3Client s3Client){
        this.s3Client = s3Client;
    }

    public String uploadImage(MultipartFile image, Long tourId) throws IOException{
        //generamos un nombre unico para cada imagen del tour
        String imageName = "tours/" + tourId + "/" + UUID.randomUUID().toString() + "-" + image.getOriginalFilename();

        //subimos la imagen al bucket
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(imageName)
                .contentType(image.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image.getBytes()));

        //devolvemos la URL de la imagen en el bucket
        return s3BaseUrl + imageName;
    }
    public String uploadImageTest(MultipartFile image) throws IOException{
        //generamos un nombre unico para cada imagen del tour
        String imageName = "testToursImages/" + UUID.randomUUID().toString() + "-" + image.getOriginalFilename();

        //subimos la imagen al bucket
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(imageName)
                .contentType(image.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(image.getBytes()));

        //devolvemos la URL de la imagen en el bucket
        return s3BaseUrl + imageName;
    }

}
