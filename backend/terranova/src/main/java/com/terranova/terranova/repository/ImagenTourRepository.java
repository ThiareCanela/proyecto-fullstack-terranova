package com.terranova.terranova.repository;

import com.terranova.terranova.entity.ImagenTour;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagenTourRepository extends JpaRepository<ImagenTour, Long> {
    List<ImagenTour> findByTourId(Long tourId);
}
