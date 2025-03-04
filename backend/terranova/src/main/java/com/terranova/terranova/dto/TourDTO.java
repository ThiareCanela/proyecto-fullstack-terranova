package com.terranova.terranova.dto;

import com.terranova.terranova.entity.Tour;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourDTO {
    private Long id;
    private String titulo;
    private int duracion;
    private Object descripcion;
    private double precio;
    private Long categoriaToursId;

    // Constructor que acepta un objeto Tour
    public TourDTO(Tour tour) {
        this.id = tour.getId();
        this.titulo = tour.getTitulo();
        this.duracion = tour.getDuracion();
        this.descripcion = tour.getDescripcion();
        this.precio = tour.getPrecio();
    }
}
