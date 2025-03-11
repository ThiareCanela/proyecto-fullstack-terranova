package com.terranova.terranova.controller;

import com.terranova.terranova.entity.ImagenTour;
import com.terranova.terranova.service.ImagenTourService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/imagenes")
public class ImagenTourController {
    private final ImagenTourService service;
    public ImagenTourController(ImagenTourService service) {
        this.service = service;
    }
    @GetMapping
    public List<ImagenTour> findAll() { return service.findAll(); }
    @GetMapping("/{id}")
    public Optional<ImagenTour> findById(@PathVariable Long id) { return service.findById(id); }
    @PostMapping
    public ImagenTour save(@RequestBody ImagenTour imagen) { return service.save(imagen); }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) { service.deleteById(id); }
}
