package com.terranova.terranova.service;

import com.terranova.terranova.dto.TourDTO;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.repository.ITourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {
    @Autowired
    private ITourRepository tourRepository;

    public Tour guardarTour(Tour tour) {
        return tourRepository.save(tour);
    }

    public List<Tour> listarTodosLosTour() {
        return tourRepository.findAll();
    }
    public Optional<Tour> consultarTour(Long id) {
        return tourRepository.findById(id);
    }
    public boolean eliminarTour(Long id) {
        if (tourRepository.existsById(id)) {
            tourRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Tour> buscarTourPorCategoria(Long id) {
        return tourRepository.findByCategoriaToursId(id);
    }
    public List<Tour> buscarTours(String keyword, LocalDate fechaInicio, LocalDate fechaFin) {
        if (keyword != null && fechaInicio != null && fechaFin != null) {
            return tourRepository.findByKeywordAndDisponibilidadEntreFechas(keyword, fechaInicio, fechaFin);
        } else if (keyword != null) {
            return tourRepository.findByTituloContainingOrDescripcionContaining(keyword, keyword);
        } else if (fechaInicio != null && fechaFin != null) {
            return tourRepository.findByDisponibilidadEntreFechas(fechaInicio, fechaFin);
        } else {
            return tourRepository.findAll();
        }
    }
    public boolean actualizarTour(Tour tour) {
        if (tourRepository.existsById(tour.getId())) {
            tour.setId(tour.getId());
            tourRepository.save(tour);
            return true;
        }
        return false;
    }
    public boolean existePorTitulo(String titulo) {
        return tourRepository.existsByTitulo(titulo);
    }


    // Buscar tours por ubicación
    public List<Tour> buscarToursPorUbicacion(String ubicacion) {
        return tourRepository.findByUbicacionContainingIgnoreCase(ubicacion);
    }

    // Buscar tours por ubicación y fechas de disponibilidad
    public List<Tour> buscarToursPorUbicacionYFechas(String ubicacion, LocalDate fechaInicio, LocalDate fechaFin) {
        return tourRepository.findByUbicacionAndDisponibilidad(ubicacion, fechaInicio, fechaFin);
    }
}
