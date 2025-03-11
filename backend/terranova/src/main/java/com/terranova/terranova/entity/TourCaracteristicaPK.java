package com.terranova.terranova.entity;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TourCaracteristicaPK implements Serializable {
    private Long tour;
    private Long caracteristica;

    public TourCaracteristicaPK() {}

    public TourCaracteristicaPK(Long tour, Long caracteristica) {
        this.tour = tour;
        this.caracteristica = caracteristica;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TourCaracteristicaPK that = (TourCaracteristicaPK) o;
        return Objects.equals(tour, that.tour) &&
                Objects.equals(caracteristica, that.caracteristica);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tour, caracteristica);
    }
}