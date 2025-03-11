package com.terranova.terranova.controller;

import com.terranova.terranova.entity.Reserva;
import com.terranova.terranova.service.ReservaService;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping
    public Reserva save(@RequestBody Reserva reserva) { return service.save(reserva); }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) { service.deleteById(id); }

}
