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
import java.util.Arrays;
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

    @PostMapping(value = "/agregar-con-imagenes", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> agregarTourConImagenes(
            @RequestPart("tour") String tourJson,
            @RequestPart("imagenes") MultipartFile[] imagenes) throws JsonProcessingException {

        // Convertimos el JSON a un objeto DTO
        TourDTO tourDTO = new ObjectMapper().readValue(tourJson, TourDTO.class);

        System.out.println("Tour recibido: " + tourDTO);

        // Validar si el tour ya existe por título (ignorando mayúsculas y espacios)
        boolean existeTour = tourService.existePorTitulo(tourDTO.getTitulo().trim().toLowerCase());
        if (existeTour) {
            return ResponseEntity.badRequest().body("Error: Ya existe un tour con el nombre '" + tourDTO.getTitulo() + "'.");
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

        // Validación de imágenes: máx. 3 imágenes permitidas
        if (imagenes.length > 3) {
            return ResponseEntity.badRequest().body("Error: Solo se permiten hasta 3 imágenes por tour.");
        }

        System.out.println("Características obtenidas: " + caracteristicas);

        try {
            // Crear objeto `Tour` desde `TourDTO`
            Tour tour = new Tour();
            tour.setTitulo(tourDTO.getTitulo());
            tour.setTipoDuracion(TipoDuracion.valueOf(tourDTO.getTipoDuracion()));
            tour.setDuracion(tourDTO.getDuracion());
            tour.setDescripcion(tourDTO.getDescripcion());  //AHORA SOLO ES TEXTO
            tour.setPrecio(tourDTO.getPrecio());
            tour.setPais(tourDTO.getPais());
            tour.setCategoriaTours(categoriaOpt.get());
            tour.setCaracteristicas(caracteristicas);

            // Guardar el tour y las imágenes
            Tour nuevoTour = tourService.guardarTourEImagenes(tour, imagenes);

            System.out.println("Tour guardado con éxito: " + nuevoTour.getId());

            //buscamos el tour guardado para obtener todas las relaciones
            Optional<Tour> tourGuardado = tourService.buscarPorId(nuevoTour.getId());

            if (tourGuardado.isEmpty()) {
                return ResponseEntity.status(500).body("Error al obtener el tour guardado.");
            }

            // Asegurar que las imágenes están cargadas antes de devolver el objeto
            Tour tourFinal = tourGuardado.get();

            return ResponseEntity.ok(tourFinal);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error en los datos del tour: " + e.getMessage());
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

    //actualizar categoria de un tour
    @PatchMapping("/actualizar-categoria")
    public ResponseEntity<?> actualizarCategoriaTour(
            @RequestParam Long tourId,
            @RequestParam Long categoriaId) {

        // Validar si el tour existe
        Optional<Tour> tourOptional = tourService.consultarTour(tourId);
        if (tourOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: Tour con ID " + tourId + " no encontrado.");
        }

        //Validar si la categoría existe
        Optional<CategoriaTours> categoriaOptional = categoriaToursService.buscarCategoriaToursPorId(categoriaId);
        if (categoriaOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error: Categoría con ID " + categoriaId + " no encontrada.");
        }

        // Actualizar la categoría del tour
        Tour tour = tourOptional.get();
        tour.setCategoriaTours(categoriaOptional.get());
        tourService.guardarTour(tour);

        return ResponseEntity.ok("Categoría del tour actualizada correctamente.");
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
            @RequestParam(required = false) List<String> pais,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

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




    @GetMapping("/disponibles")
    public ResponseEntity<?> findToursDisponibles(
            @RequestParam String paisStr,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin) {

        try {
            // Llamar al servicio para obtener los tours disponibles
            List<Tour> toursDisponibles = tourService.findToursDisponibles(paisStr, fechaInicio, fechaFin);

            // Verificar si hay resultados
            if (toursDisponibles.isEmpty()) {
                return ResponseEntity.ok("No hay tours disponibles para el país y el período especificado.");
            }

            // Devolver los tours disponibles como respuesta
            return ResponseEntity.ok(toursDisponibles);

        } catch (IllegalArgumentException e) {
            // Capturar errores de validación y devolver un mensaje claro
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Capturar errores inesperados y devolver un mensaje genérico
            e.printStackTrace(); // Registrar el error completo en los logs
            return ResponseEntity.status(500).body("Error interno del servidor: " + e.getMessage());
        }
    }
}
