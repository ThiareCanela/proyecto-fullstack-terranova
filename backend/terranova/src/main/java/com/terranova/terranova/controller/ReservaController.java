package com.terranova.terranova.controller;

import com.terranova.terranova.entity.Reserva;
import com.terranova.terranova.service.ReservaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/reservas")
public class ReservaController {
    private final ReservaService service;
    public ReservaController(ReservaService service) {
        this.service = service;
    }
    @GetMapping
    public List<Reserva> findAll() { return service.findAll(); }
    @GetMapping("/{id}")
    public Optional<Reserva> findById(@PathVariable Long id) { return service.findById(id); }
    //@PostMapping
    //public Reserva save(@RequestBody Reserva reserva) { return service.save(reserva); }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) { service.deleteById(id); }

    // Crear una nueva reserva
    @PostMapping("/crear")
    public ResponseEntity<Reserva> crearReserva(
            @RequestParam Long usuarioId,
            @RequestParam Long tourId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin,
            @RequestParam Integer numPersonas) {

        Reserva reserva = service.crearReserva(usuarioId, tourId, fechaInicio, fechaFin, numPersonas);
        return ResponseEntity.ok(reserva);
    }
}
