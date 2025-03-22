package com.terranova.terranova.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true, nullable = false)
    private Long id;

    @Column(unique = true, name = "titulo",  nullable = false)
    private String titulo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_duracion", nullable = false)
    private TipoDuracion tipoDuracion;

    @Column(nullable = false)
    private int duracion;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descripcion;

    @Column(nullable = false)
    private double precio;

    @Column(nullable = false)
    private String pais;

    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "categoria_id", referencedColumnName = "id", nullable = false )
    private CategoriaTours categoriaTours;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ImagenTour> imagenes;

    @ManyToMany
    @JsonManagedReference
    @JoinTable(
            name = "tours_x_caracteristicas",
            joinColumns = @JoinColumn(name = "tour_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private List<CaracteristicaTour> caracteristicas;
}
