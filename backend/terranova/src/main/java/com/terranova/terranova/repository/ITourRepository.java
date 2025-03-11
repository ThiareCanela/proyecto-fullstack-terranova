package com.terranova.terranova.repository;

import com.terranova.terranova.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ITourRepository extends JpaRepository <Tour, Long> {
    List<Tour> findByCategoriaToursId(Long id);

    // Buscar por palabra clave en título o descripción
    List<Tour> findByTituloContainingOrDescripcionContaining(String titulo, String descripcion);

    // Buscar por rango de fechas usando la disponibilidad de los tours
    @Query("SELECT t FROM Tour t JOIN DisponibilidadTour d ON t.id = d.tour.id WHERE d.fecha BETWEEN :fechaInicio AND :fechaFin AND d.disponible = true")
    List<Tour> findByDisponibilidadEntreFechas(@Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    // Buscar por palabra clave y rango de fechas
    @Query("SELECT t FROM Tour t JOIN DisponibilidadTour d ON t.id = d.tour.id WHERE (t.titulo LIKE %:keyword% OR t.descripcion LIKE %:keyword%) AND d.fecha BETWEEN :fechaInicio AND :fechaFin AND d.disponible = true")
    List<Tour> findByKeywordAndDisponibilidadEntreFechas(@Param("keyword") String keyword, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);
}
