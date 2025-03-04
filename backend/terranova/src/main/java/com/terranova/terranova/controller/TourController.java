package com.terranova.terranova.controller;

import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.service.CategoriaToursService;
import com.terranova.terranova.service.TourService;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/tour")
public class TourController {
@Autowired
private TourService tourService;
private CategoriaToursService categoriaToursService;

@PostMapping
    public ResponseEntity<Tour> guardarTour(@RequestBody Tour tour) throws BadRequestException {
    Optional<Tour> tourBuscado = tourService.consultarTour(tour.getId());
    Optional<CategoriaTours> categoriaToursBuscado = categoriaToursService.buscarCategoriaToursPorId(tour.getCategoriaTours().getId());
    if (tourBuscado.isPresent() && categoriaToursBuscado.isPresent()) {
        tour.setCategoriaTours(categoriaToursBuscado.get());
        tour.setCategoriaTours(categoriaToursBuscado.get());

        return ResponseEntity.ok(tourService.guardarTour(tour));
    }
    return ResponseEntity.badRequest().build();
}
@PutMapping
    public ResponseEntity<String> actualizarTour(@RequestBody Tour tour) throws BadRequestException {
    Optional<Tour> tourBuscado = tourService.consultarTour(tour.getId());
    Optional<CategoriaTours> categoriaToursBuscado = categoriaToursService.buscarCategoriaToursPorId(tour.getCategoriaTours().getId());
    if (tourBuscado.isPresent() && categoriaToursBuscado.isPresent()) {
        tour.setCategoriaTours(categoriaToursBuscado.get());
        tour.setCategoriaTours(categoriaToursBuscado.get());
        tourService.guardarTour(tour);
        return ResponseEntity.ok("Actualizado con éxito");
    }
    throw new BadRequestException("Turno no encontrado por ID");
}

}
