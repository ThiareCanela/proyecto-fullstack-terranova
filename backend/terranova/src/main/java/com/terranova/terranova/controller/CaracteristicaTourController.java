package com.terranova.terranova.controller;

import com.terranova.terranova.entity.CaracteristicaTour;
import com.terranova.terranova.service.CaracteristicaTourService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaTourController {
    private final CaracteristicaTourService service;
    public CaracteristicaTourController(CaracteristicaTourService service) {
        this.service = service;
    }
    @GetMapping
    public List<CaracteristicaTour> findAll() { return service.findAll(); }
    @GetMapping("/{id}")
    public Optional<CaracteristicaTour> findById(@PathVariable Long id) { return service.findById(id); }
    @PostMapping
    public CaracteristicaTour save(@RequestBody CaracteristicaTour caracteristica) { return service.save(caracteristica); }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) { service.deleteById(id); }
}
