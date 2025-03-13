package com.terranova.terranova.controller;

import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.DisponibilidadTourPK;
import com.terranova.terranova.service.DisponibilidadTourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/disponibilidades")
public class DisponibilidadTourController {
    @Autowired
    private DisponibilidadTourService disponibilidadTourService;
    public DisponibilidadTourController(DisponibilidadTourService service) {
        this.disponibilidadTourService = service;
    }
    @GetMapping
    public List<DisponibilidadTour> findAll() { return disponibilidadTourService.findAll(); }

    @GetMapping("/{tourId}")
    public ResponseEntity<List<DisponibilidadTour>> obtenerDisponibilidadPorTour(@PathVariable Long tourId) {
        List<DisponibilidadTour> disponibilidad = disponibilidadTourService.obtenerDisponibilidadPorTour(tourId);
        if (disponibilidad.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(disponibilidad);
    }

    @GetMapping("/{tourId}/{fecha}")
    public ResponseEntity<DisponibilidadTour> findById(@PathVariable Long tourId, @PathVariable String fecha) {
        Optional<DisponibilidadTour> disponibilidad = disponibilidadTourService.findById(new DisponibilidadTourPK(tourId, LocalDate.parse(fecha)));

        return disponibilidad.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping
    public DisponibilidadTour save(@RequestBody DisponibilidadTour disponibilidad) { return disponibilidadTourService.save(disponibilidad); }
    @DeleteMapping("/{tourId}/{fecha}")
    public void deleteById(@PathVariable Long tourId, @PathVariable String fecha) {
        disponibilidadTourService.deleteById(new DisponibilidadTourPK(tourId, LocalDate.parse(fecha)));
    }
}
