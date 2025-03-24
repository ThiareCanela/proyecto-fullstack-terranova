package com.terranova.terranova.service;

import com.terranova.terranova.entity.*;
import com.terranova.terranova.repository.DisponibilidadTourRepository;
import com.terranova.terranova.repository.ITourRepository;
import com.terranova.terranova.repository.ReservaRepository;
import com.terranova.terranova.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
public class ReservaService {
    @Autowired
    private ReservaRepository repository;

    @Autowired
    private DisponibilidadTourRepository disponibilidadTourRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ITourRepository tourRepository;

    public boolean verificarDisponibilidad(Long tourId, LocalDate fechaInicio, LocalDate fechaFin) {
        // Buscar fechas no disponibles dentro del rango
        List<DisponibilidadTour> fechasNoDisponibles = disponibilidadTourRepository
                .findFechasNoDisponibles(tourId, fechaInicio, fechaFin);

        return fechasNoDisponibles.isEmpty(); // Si no hay fechas no disponibles, se puede reservar
    }

    public Reserva crearReserva(Long usuarioId, Long tourId, LocalDate fechaInicio, LocalDate fechaFin, Integer numPersonas) {
        if (!verificarDisponibilidad(tourId, fechaInicio, fechaFin)) {
            throw new IllegalArgumentException("No hay disponibilidad en esa fecha");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new IllegalArgumentException("Tour no encontrado"));

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setTour(tour);
        reserva.setFechaInicio(fechaInicio);
        reserva.setFechaFin(fechaFin); // Puede ser el mismo día
        reserva.setNumPersonas(numPersonas);
        reserva.setEstado(EstadoReserva.CONFIRMADA);
        reserva.setTotal(numPersonas * tour.getPrecio());

        try {
            DisponibilidadTour disp = disponibilidadTourRepository.findDisponibilidadFecha(tourId, fechaInicio);
            disp.setDisponible(false);
            disponibilidadTourRepository.save(disp);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return repository.save(reserva);
    }
    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }
    public List<Reserva> findAll() { return repository.findAll(); }
    public Optional<Reserva> findById(Long id) { return repository.findById(id); }
    public Reserva save(Reserva reserva) { return repository.save(reserva); }
    public void deleteById(Long id) {
        try {
            Reserva reserva = repository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

            Long tourId = reserva.getTour().getId();
            LocalDate fechaInicio = reserva.getFechaInicio();

            // Actualizar la disponibilidad del tour
            DisponibilidadTour disp = disponibilidadTourRepository.findDisponibilidadFecha(tourId, fechaInicio);
            if (disp != null) {
                disp.setDisponible(true); // Se vuelve a marcar como disponible
                disponibilidadTourRepository.save(disp);
            }

            // Eliminar la reserva
            repository.deleteById(id);
        } catch (Exception ex) {
            throw new RuntimeException("Error al eliminar la reserva: " + ex.getMessage(), ex);
        }
    }
    public List<Reserva> obtenerReservasPorUsuario(Long usuarioId) {
        try {
            return repository.findByUsuarioId(usuarioId);
        } catch (Exception ex) {
            throw new RuntimeException("Error al encontrar las reservas: " + ex.getMessage(), ex);
        }
    }
}
