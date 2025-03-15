package com.terranova.terranova.controller;

import com.terranova.terranova.dto.TourDTO;
import com.terranova.terranova.entity.CaracteristicaTour;
import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.TipoDuracion;
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
    public ResponseEntity<?> agregarTour(@RequestBody TourDTO tourDTO) {
        // Validar si el tour ya existe por título
        if (tourService.existePorTitulo(tourDTO.getTitulo())) {
            return ResponseEntity.badRequest().body("Error: El nombre del tour ya existe.");
        }

        // Validar si la categoría existe
        Optional<CategoriaTours> categoriaOpt = categoriaToursService.buscarCategoriaToursPorId(tourDTO.getCategoriaToursId());
        if (categoriaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Categoría no encontrada.");
        }

        // Validar si las características existen
        List<CaracteristicaTour> caracteristicas = caracteristicaTourService.obtenerPorIds(tourDTO.getCaracteristicasIds());
        if (caracteristicas.isEmpty() || caracteristicas.size() != tourDTO.getCaracteristicasIds().size()) {
            return ResponseEntity.badRequest().body("Error: Una o más características no existen.");
        }

        // Crear objeto `Tour` desde `TourDTO`
        Tour tour = new Tour();
        tour.setTitulo(tourDTO.getTitulo());
        tour.setTipoDuracion(TipoDuracion.valueOf(tourDTO.getTipoDuracion())); // Convertir String a Enum
        tour.setDuracion(tourDTO.getDuracion());
        tour.setDescripcion(tourDTO.getDescripcion().toString());
        tour.setPrecio(tourDTO.getPrecio());
        tour.setUbicacion(tourDTO.getUbicacion());
        tour.setCategoriaTours(categoriaOpt.get());
        tour.setCaracteristicas(caracteristicas);

        // Guardar el tour
        Tour nuevoTour = tourService.guardarTour(tour);
        return ResponseEntity.ok(new TourDTO(nuevoTour)); // Devolver el DTO en la respuesta
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
