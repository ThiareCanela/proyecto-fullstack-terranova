package com.terranova.terranova.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(unique = true, name = "titulo",  nullable = false)
    private String titulo;
    @Enumerated(EnumType.STRING)
    private TipoDuracion tipoDuracion;
    @Column(name = "duracion")
    private int duracion;
    @Column(name = "descripcion",columnDefinition = "JSON")
    private String descripcion;
    @Column(name = "precio",  nullable = false)
    private double precio;

    @ManyToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id", nullable = false )
    private CategoriaTours categoriaTours;

}
