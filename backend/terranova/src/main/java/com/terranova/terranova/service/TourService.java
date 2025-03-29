package com.terranova.terranova.service;

import com.terranova.terranova.dto.TourDTO;
import com.terranova.terranova.entity.ImagenTour;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.repository.ITourRepository;
import com.terranova.terranova.repository.ImagenTourRepository;
import com.terranova.terranova.s3Config.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {
    @Autowired
    private ITourRepository tourRepository;

    @Autowired
    private ImagenTourRepository imagenTourRepository;

    @Autowired
    private S3Service s3Service;

    public Tour guardarTour(Tour tour) {
        return tourRepository.save(tour);
    }

    public List<Tour> listarTodosLosTour() {
        return tourRepository.findAll();
    }

    @Transactional(readOnly = true)
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
    public Tour guardarTourEImagenes(Tour tour, MultipartFile[] imagenes) throws IOException {
        if (imagenes.length > 3 || imagenes.length < 1 ){
            throw  new IllegalArgumentException("Solo se permiten hasta 3 imagenes por tour y minimo una imagne por tour");
        }

        //se guarda el tour primero
        Tour nuevoTour = tourRepository.save(tour);

        //como segundo paso subimos las imagenes al S3 y obtenemos su URL
        for(MultipartFile imagen : imagenes){
            String urlImagen = s3Service.uploadImage(imagen, nuevoTour.getId());

            //creamos los objetos para la tabla imagen tour
            ImagenTour imagenTour = new ImagenTour();
            imagenTour.setTour(nuevoTour);
            imagenTour.setUrlImagen(urlImagen);
            imagenTour.setDescripcion(nuevoTour.getTitulo());

            //por ultimo agregamos la entidad a la base de datos

            imagenTourRepository.save(imagenTour);
        }

        return nuevoTour;
    }
    public void actualizarCaracteristicaTour(Tour tour){
        tourRepository.save(tour);
    }

    public Optional<Tour> buscarPorId(Long id){
        return tourRepository.findById(id);
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
    public Tour actualizarTour(Tour tour) {
        if (!tourRepository.existsById(tour.getId())) {
            throw new IllegalArgumentException("No se encontró un tour con el ID: " + tour.getId());
        }
        return tourRepository.save(tour);
    }
    public boolean existePorTitulo(String titulo) {
        return tourRepository.existsByTituloIgnoreCase(titulo.trim());
    }


    // Buscar tours por pais
    public List<Tour> filtrarToursPorPais(List<String> pais) {
        return tourRepository.findToursByPais(pais);
    }
    // Buscar tours por pais y fechas de disponibilidad
    public List<Tour> buscarToursPorPaisYFechas(List<String> pais, LocalDate fechaInicio, LocalDate fechaFin) {
        List<String> paisesValidos = (pais == null || pais.isEmpty()) ? null : pais;
        LocalDate fechaInicioValida = (fechaInicio == null) ? null : fechaInicio;
        LocalDate fechaFinValida = (fechaFin == null) ? null : fechaFin;

        return tourRepository.findByPaisAndDisponibilidad(paisesValidos, fechaInicioValida, fechaFinValida);
    }

    public List<Tour> filtrarToursPorFechas(LocalDate fechaInicio, LocalDate fechaFin) {
        return tourRepository.findByDisponibilidadEntreFechas(fechaInicio, fechaFin);
    }


    // Lista de países permitidos (en minúsculas para facilitar la comparación)
    private static final List<String> PAISES_PERMITIDOS = Arrays.asList(
            "méxico", "colombia", "argentina", "brasil", "jamaica",
            "uruguay", "costa rica", "chile", "perú"
    );

    public List<Tour> findToursDisponibles(String paisStr, LocalDate fechaInicio, LocalDate fechaFin) {
        // Validar que las fechas sean coherentes
        if (fechaInicio.isAfter(fechaFin)) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin.");
        }

        // Normalizar el país a minúsculas para evitar problemas de formato
        String paisNormalizado = paisStr.trim().toLowerCase();

        // Validar que el país sea uno de los valores permitidos
        if (!PAISES_PERMITIDOS.contains(paisNormalizado)) {
            throw new IllegalArgumentException("El país proporcionado no es válido. Los valores permitidos son: " +
                    String.join(", ", PAISES_PERMITIDOS).toUpperCase());
        }

        // Llamar al repositorio para obtener los tours disponibles
        return tourRepository.findToursDisponiblesPorPaisYFechas(
                paisNormalizado.toUpperCase(), fechaInicio, fechaFin
        );
    }

}
