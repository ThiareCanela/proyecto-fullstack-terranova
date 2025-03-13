package com.terranova.terranova.service;

import com.terranova.terranova.entity.ImagenTour;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.repository.ImagenTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ImagenTourService {
    private final ImagenTourRepository repository;
    public ImagenTourService(ImagenTourRepository repository) {
        this.repository = repository;
    }
    public List<ImagenTour> findAll() { return repository.findAll(); }
    public Optional<ImagenTour> findById(Long id) { return repository.findById(id); }
    public ImagenTour save(ImagenTour imagen) { return repository.save(imagen); }
    public void deleteById(Long id) { repository.deleteById(id); }

    public void guardarImagenesTour(Tour tour, List<String> urls) {
        for (String url : urls) {
            ImagenTour imagenTour = new ImagenTour();
            imagenTour.setTour(tour);
            imagenTour.setUrlImagen(url);
            repository.save(imagenTour);
        }
    }
}