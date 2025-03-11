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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tour")
public class TourController {
    @Autowired
    private TourService tourService;
    @Autowired
    private CategoriaToursService categoriaToursService;

    @GetMapping
    public ResponseEntity<List<Tour>> listarTodosLosTours() {
        List<Tour> tours = tourService.listarTodosLosTour();
        return ResponseEntity.ok(tours);
    }

/*    @GetMapping("/buscar")
    public ResponseEntity<List<Tour>> buscarTours(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) LocalDate fechaInicio,
            @RequestParam(required = false) LocalDate fechaFin) {
        List<Tour> resultados = tourService.buscarTours(keyword, fechaInicio, fechaFin);
        return ResponseEntity.ok(resultados);
    }
*/
    @PostMapping
    public ResponseEntity<Tour> guardarTour(@RequestBody Tour tour) {
        if (tour.getCategoriaTours() == null || tour.getCategoriaTours().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<CategoriaTours> categoriaToursBuscado = categoriaToursService.buscarCategoriaToursPorId(tour.getCategoriaTours().getId());

        if (categoriaToursBuscado.isPresent()) {
            tour.setCategoriaTours(categoriaToursBuscado.get());
            Tour nuevoTour = tourService.guardarTour(tour);
            return ResponseEntity.ok(nuevoTour);
        }

        return ResponseEntity.badRequest().body(null);
    }
    @PutMapping
    public ResponseEntity<String> actualizarTour(@RequestBody Tour tour) {
        Optional<Tour> tourBuscado = tourService.consultarTour(tour.getId());
        Optional<CategoriaTours> categoriaToursBuscado = categoriaToursService.buscarCategoriaToursPorId(tour.getCategoriaTours().getId());

        if (tourBuscado.isPresent() && categoriaToursBuscado.isPresent()) {
            tour.setCategoriaTours(categoriaToursBuscado.get());
            tourService.guardarTour(tour);
            return ResponseEntity.ok("Actualizado con éxito");
        }
        return ResponseEntity.badRequest().body("Tour no encontrado por ID");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarTour(@PathVariable Long id) {
        Optional<Tour> tourBuscado = tourService.consultarTour(id);
        if (tourBuscado.isPresent()) {
            tourService.eliminarTour(id);
            return ResponseEntity.ok("Tour eliminado con éxito");
        }
        return ResponseEntity.badRequest().body("Tour no encontrado");
    }
}
