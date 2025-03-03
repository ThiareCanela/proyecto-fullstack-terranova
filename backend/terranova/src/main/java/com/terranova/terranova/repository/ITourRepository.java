package com.terranova.terranova.repository;

import com.terranova.terranova.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITourRepository extends JpaRepository {
    List<Tour> findByCategoriaToursId(Long id);
}
