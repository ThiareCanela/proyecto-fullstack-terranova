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
    @Column(name = "titulo")
    private String titulo;
    @Column(name = "duracion")
    private int duracion;
    @Column(name = "descripcion")
    private Object descripcion;
    @Column(name = "precio")
    private double precio;

    @ManyToOne (cascade = CascadeType.ALL)
    @JoinColumn(name = "categoria_id", referencedColumnName = "id" )
    private CategoriaTours categoriaTours;

}
