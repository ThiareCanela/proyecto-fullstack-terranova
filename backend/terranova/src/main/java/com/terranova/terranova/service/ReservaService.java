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
        List<DisponibilidadTour> fechasNoDisponibles = disponibilidadTourRepository
                .findFechasNoDisponibles(tourId, fechaInicio, fechaFin);

        return fechasNoDisponibles.isEmpty();
    }

    public Reserva crearReserva(Long usuarioId, Long tourId, LocalDate fechaInicio, LocalDate fechaFin, Integer numPersonas) {
        if (!verificarDisponibilidad(tourId, fechaInicio, fechaFin)) {
            throw new IllegalArgumentException("No hay disponibilidad en esa fecha");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new IllegalArgumentException("Tour no encontrado"));

       
        // Marcar todas las fechas del rango como no disponibles
        LocalDate fecha = fechaInicio;
        while (!fecha.isAfter(fechaFin)) {
            DisponibilidadTour disp = disponibilidadTourRepository.findDisponibilidadFecha(tourId, fecha);
    
            if (disp == null) {
                // Si no existe, creamos una nueva disponibilidad como no disponible
                disp = new DisponibilidadTour();
                disp.setTour(tour);
                disp.setFecha(fecha);
                disp.setDisponible(false);
            } else if (!disp.isDisponible()) {
                // Si ya existe pero está ocupada, lanzamos error
                throw new IllegalArgumentException("No hay disponibilidad en la fecha: " + fecha);
            } else {
                // Si existe y está disponible, la marcamos como ocupada
                disp.setDisponible(false);
            }

            disponibilidadTourRepository.save(disp);
            fecha = fecha.plusDays(1);
        }


        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario);
        reserva.setTour(tour);
        reserva.setFechaInicio(fechaInicio);
        reserva.setFechaFin(fechaFin);
        reserva.setNumPersonas(numPersonas);
        reserva.setEstado(EstadoReserva.CONFIRMADA);
        reserva.setTotal(numPersonas * tour.getPrecio());

        return repository.save(reserva);
    }

    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }

    public List<Reserva> findAll() {
        return repository.findAll();
    }

    public Optional<Reserva> findById(Long id) {
        return repository.findById(id);
    }

    public Reserva save(Reserva reserva) {
        return repository.save(reserva);
    }

    public void deleteById(Long id) {
        try {
            Reserva reserva = repository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

            Long tourId = reserva.getTour().getId();
            LocalDate fechaInicio = reserva.getFechaInicio();
            LocalDate fechaFin = reserva.getFechaFin();

            // Liberar las fechas del rango
            LocalDate fecha = fechaInicio;
            while (!fecha.isAfter(fechaFin)) {
                DisponibilidadTour disp = disponibilidadTourRepository.findDisponibilidadFecha(tourId, fecha);
                if (disp != null) {
                    disp.setDisponible(true);
                    disponibilidadTourRepository.save(disp);
                }
                fecha = fecha.plusDays(1);
            }

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
