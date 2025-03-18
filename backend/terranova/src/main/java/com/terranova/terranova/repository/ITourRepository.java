package com.terranova.terranova.repository;

import com.terranova.terranova.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    Optional<Tour> findByTitulo(String titulo);
    boolean existsByTitulo(String titulo);

    // Buscar por caracteristicas
    @Query("SELECT t FROM Tour t JOIN t.caracteristicas c WHERE c.id IN :caracteristicaIds GROUP BY t HAVING COUNT(DISTINCT c.id) = :cantidad")
    List<Tour> findByCaracteristicas(@Param("caracteristicaIds") List<Long> caracteristicaIds, @Param("cantidad") Long cantidad);

    // Búsqueda de tours por pais
    List<Tour> findByPaisContainingIgnoreCase(String pais);

    // Búsqueda de tours por pais y disponibilidad en un rango de fechas
    @Query("SELECT t FROM Tour t JOIN DisponibilidadTour d ON t.id = d.tour.id " +
            "WHERE t.pais IN :pais " +
            "AND d.fecha BETWEEN :fechaInicio AND :fechaFin AND d.disponible = true")
    List<Tour> findByPaisAndDisponibilidad(@Param("pais") List<String> pais,
                                                @Param("fechaInicio") LocalDate fechaInicio,
                                                @Param("fechaFin") LocalDate fechaFin);
}
