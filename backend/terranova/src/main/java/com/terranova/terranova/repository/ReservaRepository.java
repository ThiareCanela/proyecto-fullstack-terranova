package com.terranova.terranova.repository;

import com.terranova.terranova.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Buscar reservas activas en una fecha específica para un tour
    @Query("SELECT r FROM Reserva r WHERE r.tour.id = :tourId AND r.fechaInicio = :fecha AND r.estado = 'CONFIRMADA'")
    List<Reserva> findReservasByTourAndFecha(@Param("tourId") Long tourId, @Param("fecha") LocalDate fecha);
}