package com.terranova.terranova.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import com.terranova.terranova.entity.TipoDuracion;
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
    @JsonSetter(nulls = Nulls.AS_EMPTY)
    private TipoDuracion tipoDuracion = TipoDuracion.DIAS;
    private int duracion;
    private String descripcion;
    private double precio;
    private String pais;
    private Long categoriaToursId;
    private List<Long> caracteristicasIds; // IDs de características

    // Constructor para transformar una entidad Tour en DTO
    public TourDTO(Tour tour) {
        this.id = tour.getId();
        this.titulo = tour.getTitulo();
        this.tipoDuracion = TipoDuracion.DIAS;
        this.duracion = tour.getDuracion();
        this.descripcion = tour.getDescripcion();
        this.precio = tour.getPrecio();
        this.pais = tour.getPais();
        this.categoriaToursId = tour.getCategoriaTours().getId();
    }
}

