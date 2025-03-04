package com.terranova.terranova.repository;

import com.terranova.terranova.entity.CategoriaTours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ICategoriaToursRepository extends JpaRepository<CategoriaTours, Long> {
    public Optional<CategoriaTours> findByNombre(String nombre);

}