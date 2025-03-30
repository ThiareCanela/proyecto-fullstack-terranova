package com.terranova.terranova.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "caracteristicas_tours")
public class CaracteristicaTour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String descripcion;

    @Column(name= "url_icon",nullable = false)
    private String urlIcono;

    @ManyToMany(mappedBy = "caracteristicas")
    @JsonBackReference
    private List<Tour> tours;
}

