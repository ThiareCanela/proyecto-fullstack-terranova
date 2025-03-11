package com.terranova.terranova.service;

import com.terranova.terranova.entity.Reserva;
import com.terranova.terranova.repository.ReservaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class ReservaService {
    private final ReservaRepository repository;
    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }
    public List<Reserva> findAll() { return repository.findAll(); }
    public Optional<Reserva> findById(Long id) { return repository.findById(id); }
    public Reserva save(Reserva reserva) { return repository.save(reserva); }
    public void deleteById(Long id) { repository.deleteById(id); }
}
