package com.terranova.terranova.service;
import com.terranova.terranova.entity.DisponibilidadTour;
import com.terranova.terranova.entity.DisponibilidadTourPK;
import com.terranova.terranova.repository.DisponibilidadTourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DisponibilidadTourService {
    @Autowired
    private DisponibilidadTourRepository repository;
    public DisponibilidadTourService(DisponibilidadTourRepository repository) {

        this.repository = repository;
    }

    public List<DisponibilidadTour> obtenerDisponibilidadPorTour(Long tourId) {
        return repository.findByTourId(tourId);
    }
    public List<DisponibilidadTour> findAll() {
        return repository.findAll(); }
    public Optional<DisponibilidadTour> findById(DisponibilidadTourPK id) {
        return repository.findById(id);
    }
    public DisponibilidadTour save(DisponibilidadTour disponibilidad) {
        return repository.save(disponibilidad); }
    public void deleteById(DisponibilidadTourPK id) {
        repository.deleteById(id); }

    public List<DisponibilidadTour> obtenerDisponibilidades() {
        return repository.findByDisponibleTrue(); }
}
