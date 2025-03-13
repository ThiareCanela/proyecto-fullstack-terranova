package com.terranova.terranova.entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "reservas")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    @Column(name= "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;
    @Column(name= "fecha_fin", nullable = false)
    private LocalDate fechaFin;
    @Column(name= "hora_inicio")
    private LocalTime horaInicio;
    @Column(name= "hora_fin")
    private LocalTime horaFin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReserva estado;
    @Column(name= "num_personas", nullable = false)
    private Integer numPersonas;
    @Column(name= "total")
    private double total;
}
