package com.terranova.terranova.controller;

import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.DisponibilidadTourPK;
import com.terranova.terranova.service.DisponibilidadTourService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/disponibilidades")
public class DisponibilidadTourController {
    private final DisponibilidadTourService service;
    public DisponibilidadTourController(DisponibilidadTourService service) {
        this.service = service;
    }
    @GetMapping
    public List<DisponibilidadTour> findAll() { return service.findAll(); }
    @GetMapping("/{tourId}/{fecha}")
    public Optional<DisponibilidadTour> findById(@PathVariable Long tourId, @PathVariable String fecha) {
        return service.findById(new DisponibilidadTourPK(tourId, LocalDate.parse(fecha)));
    }
    @PostMapping
    public DisponibilidadTour save(@RequestBody DisponibilidadTour disponibilidad) { return service.save(disponibilidad); }
    @DeleteMapping("/{tourId}/{fecha}")
    public void deleteById(@PathVariable Long tourId, @PathVariable String fecha) {
        service.deleteById(new DisponibilidadTourPK(tourId, LocalDate.parse(fecha)));
    }
}
