package com.terranova.terranova.dto;

import com.terranova.terranova.entity.Tour;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor // Necesario para la deserialización
public class TourDTO {
    private Long id;
    private String titulo;
    private String tipoDuracion;
    private int duracion;
    private Object descripcion;
    private double precio;
    private String ubicacion;
    private Long categoriaToursId;
    private List<Long> caracteristicasIds; // IDs de características

    // Constructor para transformar una entidad Tour en DTO
    public TourDTO(Tour tour) {
        this.id = tour.getId();
        this.titulo = tour.getTitulo();
        this.tipoDuracion = tour.getTipoDuracion().name();
        this.duracion = tour.getDuracion();
        this.descripcion = tour.getDescripcion();
        this.precio = tour.getPrecio();
        this.ubicacion = tour.getUbicacion();
        this.categoriaToursId = tour.getCategoriaTours().getId();
    }
}

