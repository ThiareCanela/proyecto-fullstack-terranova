package com.terranova.terranova.s3Config;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/upload/image")
public class ImageTestController {
    private final  S3Service s3Service;

    public ImageTestController(S3Service s3Service){
        this.s3Service = s3Service;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadImage(@RequestParam("image")MultipartFile image){
        try {
            //subimos la imagen a S3
            String imagenUrl = s3Service.uploadImageTest(image);
            return ResponseEntity.ok("Imagen subida a S3 correctamente: " + imagenUrl);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al subir la Imagen");
        }
    }
}
