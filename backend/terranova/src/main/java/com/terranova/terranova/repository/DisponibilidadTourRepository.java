package com.terranova.terranova.repository;

import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.DisponibilidadTourPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DisponibilidadTourRepository  extends JpaRepository<DisponibilidadTour, DisponibilidadTourPK> {
    @Query("SELECT d FROM DisponibilidadTour d WHERE d.tour.id = :tourId")
    List<DisponibilidadTour> findByTourId(@Param("tourId") Long tourId);

    List<DisponibilidadTour> findByDisponibleTrue();
    List<DisponibilidadTour> findByDisponibleFalse();

    // Verifica si existe disponibilidad para un tour en una fecha específica
    boolean existsByTourIdAndFechaAndDisponibleTrue(Long tourId, LocalDate fecha);

    @Query("SELECT d FROM DisponibilidadTour d WHERE d.tour.id = :tourId " +
            "AND d.fecha BETWEEN :fechaInicio AND :fechaFin " +
            "AND d.disponible = false")
    List<DisponibilidadTour> findFechasNoDisponibles(@Param("tourId") Long tourId,
                                                     @Param("fechaInicio") LocalDate fechaInicio,
                                                     @Param("fechaFin") LocalDate fechaFin);
}