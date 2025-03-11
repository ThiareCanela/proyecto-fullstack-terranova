package com.terranova.terranova.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Embeddable
public class DisponibilidadTourPK implements Serializable {
    private Long tour;
    private LocalDate fecha;

    public DisponibilidadTourPK() {}

    public DisponibilidadTourPK(Long tour, LocalDate fecha) {
        this.tour = tour;
        this.fecha = fecha;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DisponibilidadTourPK that = (DisponibilidadTourPK) o;
        return Objects.equals(tour, that.tour) &&
                Objects.equals(fecha, that.fecha);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tour, fecha);
    }
}