package com.terranova.terranova.service;

import com.terranova.terranova.entity.CaracteristicaTour;
import com.terranova.terranova.repository.CaracteristicaTourRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class CaracteristicaTourService {
    private final CaracteristicaTourRepository repository;
    public CaracteristicaTourService(CaracteristicaTourRepository repository) {
        this.repository = repository;
    }
    public List<CaracteristicaTour> findAll() { return repository.findAll(); }
    public Optional<CaracteristicaTour> findById(Long id) { return repository.findById(id); }
    public CaracteristicaTour save(CaracteristicaTour caracteristica) { return repository.save(caracteristica); }
    public void deleteById(Long id) { repository.deleteById(id); }

    public List<CaracteristicaTour> obtenerPorIds(List<Long> ids) {
        return repository.findAllById(ids);
    }
}