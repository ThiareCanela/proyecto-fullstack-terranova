package com.terranova.terranova.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.terranova.terranova.dto.TourDTO;
import com.terranova.terranova.entity.CaracteristicaTour;
import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.TipoDuracion;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.exception.ResourceNotFoundException;
import com.terranova.terranova.service.CaracteristicaTourService;
import com.terranova.terranova.service.CategoriaToursService;
import com.terranova.terranova.service.ImagenTourService;
import com.terranova.terranova.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
        tour.setPais(tourDTO.getPais());
        tour.setCategoriaTours(categoriaOpt.get());
        tour.setCaracteristicas(caracteristicas);

        // Guardar el tour
        Tour nuevoTour = tourService.guardarTour(tour);
        return ResponseEntity.ok(new TourDTO(nuevoTour)); // Devolver el DTO en la respuesta
    }

    @PostMapping(value = "/agregar-con-imagenes", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> agregarTourConImagenes(
            @RequestPart("tour") String tourJson,
            @RequestPart("imagenes") MultipartFile[] imagenes) throws JsonProcessingException {

        //covertimos el JSON a un objeto DTO
        TourDTO tourDTO = new ObjectMapper().readValue(tourJson, TourDTO.class);

        // Validar si el tour ya existe por título
        if (tourService.existePorTitulo(tourDTO.getTitulo())) {
            return ResponseEntity.badRequest().body("Error: El nombre del tour ya existe.");
        }

        // Validar si la categoría existe
        Optional<CategoriaTours> categoriaOpt = categoriaToursService.buscarCategoriaToursPorId(tourDTO.getCategoriaToursId());
        if (categoriaOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Categoría no encontrada.");
        }

        // ✅ Validar si las características existen
        List<CaracteristicaTour> caracteristicas = caracteristicaTourService.obtenerPorIds(tourDTO.getCaracteristicasIds());
        if (caracteristicas.isEmpty() || caracteristicas.size() != tourDTO.getCaracteristicasIds().size()) {
            return ResponseEntity.badRequest().body("Error: Una o más características no existen.");
        }

        try {
            // Crear objeto `Tour` desde `TourDTO`
            Tour tour = new Tour();
            tour.setTitulo(tourDTO.getTitulo());
            tour.setTipoDuracion(TipoDuracion.valueOf(tourDTO.getTipoDuracion()));
            tour.setDuracion(tourDTO.getDuracion());
            tour.setDescripcion(tourDTO.getDescripcion().toString());
            tour.setPrecio(tourDTO.getPrecio());
            tour.setPais(tourDTO.getPais());
            tour.setCategoriaTours(categoriaOpt.get());
            tour.setCaracteristicas(caracteristicas);

            // Guardar el tour y las imágenes
            Tour nuevoTour = tourService.guardarTourEImagenes(tour, imagenes);

            // Devolver el tour completo como respuesta
            return ResponseEntity.ok(new TourDTO(nuevoTour));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el tour: " + e.getMessage());
        }
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

    //endpoint para agregar o modificar categoria a un tour
    @PutMapping("/agregar-categoria")
    public ResponseEntity<String> actualizarCategoriaTour(
            @RequestParam Long tourId,
            @RequestParam Long categoriaId) {

        Optional<Tour> tourOptional = tourService.consultarTour(tourId);
        if (tourOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Tour no encontrado");
        }

        Optional<CategoriaTours> categoriaOptional = categoriaToursService.buscarCategoriaToursPorId(categoriaId);
        if (categoriaOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Categoría no encontrada");
        }

        Tour tour = tourOptional.get();
        tour.setCategoriaTours(categoriaOptional.get());
        tourService.guardarTour(tour);

        return ResponseEntity.ok("Categoría actualizada correctamente");
    }


    @GetMapping("/buscar/{id}")
    public ResponseEntity<Optional<Tour>> buscarPorId(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Tour> tourBuscado = tourService.buscarPorId(id);
        if (tourBuscado.isPresent()){
            return new ResponseEntity<>(tourBuscado, HttpStatus.OK);
        }
        throw new ResourceNotFoundException("Tour no encontrado por ID");
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

    // Endpoint para buscar tours por pais
    @GetMapping("/buscar/pais")
    public ResponseEntity<List<Tour>> buscarPorPais(@RequestParam List<String> pais) {
        List<Tour> tours = tourService.filtrarToursPorPais(pais);
        return ResponseEntity.ok(tours);
    }

    // Endpoint para buscar tours por pais y rango de fechas disponibles
    @GetMapping("/buscar/pais-fechas")
    public ResponseEntity<List<Tour>> buscarPorPaisYFechas(
            @RequestParam List<String> pais,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {
        List<Tour> tours = tourService.buscarToursPorPaisYFechas(pais, fechaInicio, fechaFin);
        return ResponseEntity.ok(tours);
    }

    @GetMapping("/buscar/fechas")
    public ResponseEntity<List<Tour>> filtrarToursPorFechas(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        List<Tour> tours = tourService.filtrarToursPorFechas(fechaInicio, fechaFin);
        return ResponseEntity.ok(tours);
    }
}
