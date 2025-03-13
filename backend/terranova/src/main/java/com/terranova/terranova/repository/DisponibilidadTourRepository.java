package com.terranova.terranova.repository;

import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.DisponibilidadTourPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DisponibilidadTourRepository  extends JpaRepository<DisponibilidadTour, DisponibilidadTourPK> {
    @Query("SELECT d FROM DisponibilidadTour d WHERE d.tour.id = :tourId")
    List<DisponibilidadTour> findByTourId(@Param("tourId") Long tourId);
}