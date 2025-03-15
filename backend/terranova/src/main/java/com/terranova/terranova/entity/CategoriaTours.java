package com.terranova.terranova.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "categoria_tours")
public class CategoriaTours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column (name = "nombre", nullable = false)
    private String nombre;
    @Column (name = "url_icono", nullable = false)
    private String urlIcono;

    @OneToMany(mappedBy = "categoriaTours", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Tour> tours;
    /*public CategoriaTours(String nombre, String urlIcono) {
        this.nombre = nombre;
        this.urlIcono = urlIcono;
    }*/

}
