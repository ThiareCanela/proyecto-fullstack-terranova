package com.terranova.terranova.service;

import com.terranova.terranova.dto.TourDTO;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.repository.ITourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
import java.util.Optional;

@Service
public class TourService {
    @Autowired
    private ITourRepository tourRepository;

    public Tour guardarTour(Tour tour) {
        return (Tour) tourRepository.save(tour);
    }

    public List<Tour> listarTodosLosTour() {
        return tourRepository.findAll();
    }
    public Optional<Tour> consultarTour(Long id) {
        return tourRepository.findById(id);
    }
    public void eliminarTour(Long id) {
        tourRepository.deleteById(id);
    }

    public List<Tour> buscarTourPorCategoria(Long id) {
        return tourRepository.findByCategoriaToursId(id);
    }





}
