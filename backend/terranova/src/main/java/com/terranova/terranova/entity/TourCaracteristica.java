package com.terranova.terranova.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tours_x_caracteristicas")
@IdClass(TourCaracteristicaPK.class)
public class TourCaracteristica {
    @Id
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Id
    @ManyToOne
    @JoinColumn(name = "caracteristica_id", nullable = false)
    private CaracteristicaTour caracteristica;
}
