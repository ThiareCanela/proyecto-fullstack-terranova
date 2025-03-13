package com.terranova.terranova.controller;

import com.terranova.terranova.entity.CaracteristicaTour;
import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.service.CaracteristicaTourService;
import com.terranova.terranova.service.CategoriaToursService;
import com.terranova.terranova.service.ImagenTourService;
import com.terranova.terranova.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private CaracteristicaTourService caracteristicaTourService;
    @Autowired
    private ImagenTourService imagenTourService;

    @GetMapping
    public ResponseEntity<List<Tour>> listarTodosLosTours() {
        List<Tour> tours = tourService.listarTodosLosTour();
        return ResponseEntity.ok(tours);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Tour>> buscarTours(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) LocalDate fechaInicio,
            @RequestParam(required = false) LocalDate fechaFin) {
        List<Tour> resultados = tourService.buscarTours(keyword, fechaInicio, fechaFin);
        return ResponseEntity.ok(resultados);
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregarTour(
            @RequestParam String titulo,
            @RequestParam String descripcion,
            @RequestParam Long categoriaId,
            @RequestParam List<Long> caracteristicasIds,
            @RequestParam("imagenes") List<MultipartFile> imagenes) {

        if (tourService.existePorTitulo(titulo)) {
            return ResponseEntity.badRequest().body("Error: El nombre del tour ya existe.");
        }

        Optional<CategoriaTours> categoriaOpt = categoriaToursService.buscarCategoriaToursPorId(categoriaId);
        if (categoriaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Categoría no encontrada.");
        }

        List<CaracteristicaTour> caracteristicas = caracteristicaTourService.obtenerPorIds(caracteristicasIds);
        if (caracteristicas.isEmpty() || caracteristicas.size() != caracteristicasIds.size()) {
            return ResponseEntity.badRequest().body("Error: Una o más características no existen.");
        }

        Tour nuevoTour = new Tour();
        nuevoTour.setTitulo(titulo);
        nuevoTour.setDescripcion(descripcion);
        nuevoTour.setCategoriaTours(categoriaOpt.get());
        nuevoTour.setCaracteristicas(caracteristicas);
        Tour tourGuardado = tourService.guardarTour(nuevoTour);

        List<String> urlsImagenes = imagenTourService.subirImagenesAWS(imagenes);
        imagenTourService.guardarImagenesTour(tourGuardado, urlsImagenes);

        return ResponseEntity.ok("Tour agregado exitosamente.");
    }
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
    @PutMapping("/{tourId}")
    public ResponseEntity<String> actualizarTour(@PathVariable Long tourId, @RequestBody Tour tour) {
        Optional<Tour> tourBuscado = tourService.consultarTour(tourId);
        if (tourBuscado.isPresent()) {
            tour.setId(tourId);
            tourService.guardarTour(tour);
            return ResponseEntity.ok("Actualizado con éxito");
        }
        return ResponseEntity.badRequest().body("Tour no encontrado por ID");
    }

    @DeleteMapping("/{tourId}")
    public ResponseEntity<String> eliminarTour(@PathVariable Long tourId) {
        Optional<Tour> tourBuscado = tourService.consultarTour(tourId);
        if (tourBuscado.isPresent()) {
            tourService.eliminarTour(tourId);
            return ResponseEntity.ok("Tour eliminado con éxito");
        }
        return ResponseEntity.badRequest().body("Tour no encontrado");
    }

    @PutMapping("/{tourId}/categoria/{categoriaId}")
    public ResponseEntity<String> asignarCategoriaATour(@PathVariable Long tourId, @PathVariable Long categoriaId) {
        Optional<Tour> tourBuscado = tourService.consultarTour(tourId);
        Optional<CategoriaTours> categoriaBuscada = categoriaToursService.buscarCategoriaToursPorId(categoriaId);

        if (tourBuscado.isPresent() && categoriaBuscada.isPresent()) {
            Tour tour = tourBuscado.get();
            tour.setCategoriaTours(categoriaBuscada.get());
            tourService.guardarTour(tour);
            return ResponseEntity.ok("Categoría asignada con éxito al tour");
        }
        return ResponseEntity.badRequest().body("Error: Tour o categoría no encontrados");
    }

    // Endpoint para buscar tours por ubicación
    @GetMapping("/buscar/ubicacion")
    public ResponseEntity<List<Tour>> buscarPorUbicacion(@RequestParam String ubicacion) {
        List<Tour> tours = tourService.buscarToursPorUbicacion(ubicacion);
        return ResponseEntity.ok(tours);
    }

    // Endpoint para buscar tours por ubicación y rango de fechas disponibles
    @GetMapping("/buscar/ubicacion-fechas")
    public ResponseEntity<List<Tour>> buscarPorUbicacionYFechas(
            @RequestParam String ubicacion,
            @RequestParam LocalDate fechaInicio,
            @RequestParam LocalDate fechaFin) {
        List<Tour> tours = tourService.buscarToursPorUbicacionYFechas(ubicacion, fechaInicio, fechaFin);
        return ResponseEntity.ok(tours);
    }
}
