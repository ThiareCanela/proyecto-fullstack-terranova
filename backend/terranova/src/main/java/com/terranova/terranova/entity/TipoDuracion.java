package com.terranova.terranova.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum TipoDuracion {
    HORAS,
    DIAS;
    @JsonCreator
    public static TipoDuracion fromString(String value) {
        if (value == null || value.isEmpty()) {
            return DIAS; // Manejo de valores vacíos
        }
        try {
            return TipoDuracion.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            return DIAS; // Opcional: evitar errores con valores inesperados
        }
    }

}
