package com.terranova.terranova.service;

import com.terranova.terranova.entity.ImagenTour;
import com.terranova.terranova.repository.ImagenTourRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}