package com.terranova.terranova.dto;

import com.terranova.terranova.entity.EstadoReserva;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.entity.Usuario;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ReservaDTO {
    private Long usuarioId;
    private Long tourId;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Integer numPersonas;
}
