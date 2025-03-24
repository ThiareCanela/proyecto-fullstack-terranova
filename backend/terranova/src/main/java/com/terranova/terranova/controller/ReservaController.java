package com.terranova.terranova.controller;

import com.terranova.terranova.dto.ReservaDTO;
import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.Reserva;
import com.terranova.terranova.service.ReservaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
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

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Reserva>> obtenerReservasPorUsuario(@PathVariable Long usuarioId) {
        List<Reserva> reservas = service.obtenerReservasPorUsuario(usuarioId);
        if (reservas.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(reservas);
        }
        return ResponseEntity.ok(reservas);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok("Borrado Correctamente");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage())); // Devolvemos un JSON con el error
        }
    }

    // Crear una nueva reserva
    @PostMapping(value = "/crear", consumes = "application/json")
    public ResponseEntity<?> crearReserva(@RequestBody ReservaDTO reservaRequest) {
        try {
            Reserva reserva = service.crearReserva(
                    reservaRequest.getUsuarioId(),
                    reservaRequest.getTourId(),
                    reservaRequest.getFechaInicio(),
                    reservaRequest.getFechaFin(),
                    reservaRequest.getNumPersonas()
            );
            return ResponseEntity.ok(reserva);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", ex.getMessage())); // Devolvemos un JSON con el error
        }
    }

}
