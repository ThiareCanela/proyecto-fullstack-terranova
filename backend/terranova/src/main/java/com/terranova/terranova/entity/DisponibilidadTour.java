package com.terranova.terranova.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.IdClass;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "disponibilidades_tours")
@IdClass(DisponibilidadTourPK.class)
public class DisponibilidadTour {
    @Id
    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Id
    @Column(nullable = false)
    private LocalDate fecha;
    @Column(nullable = false)
    private boolean disponible;
}
