package com.terranova.terranova.security;

import com.terranova.terranova.entity.*;
import com.terranova.terranova.repository.ICategoriaToursRepository;
import com.terranova.terranova.repository.UsuarioRepository;
import com.terranova.terranova.service.CategoriaToursService;
import com.terranova.terranova.service.DisponibilidadTourService;
import com.terranova.terranova.service.ReservaService;
import com.terranova.terranova.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private TourService tourService;
    @Autowired
    private CategoriaToursService categoriaToursService;
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private DisponibilidadTourService disponibilidadTourService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        /*String passSinCifrar= "admin";
        String passCifrado= bCryptPasswordEncoder.encode(passSinCifrar);
        System.out.println("pass cifrado: "+passCifrado);
        Usuario usuario= new Usuario("admin","admin","admin@dh.com",passCifrado, UsuarioRole.ROLE_ADMIN);
        usuarioRepository.save(usuario);

        String passSinCifrar1= "user";
        String passCifrado1= bCryptPasswordEncoder.encode(passSinCifrar1);
        System.out.println("pass cifrado: "+passCifrado1);
        Usuario usuario1= new Usuario("Pedro","Lopez","pedro@dh.com",passCifrado1, UsuarioRole.ROLE_USER);
        usuarioRepository.save(usuario1);

        Optional<CategoriaTours> categoriaOpt = categoriaToursService.buscarCategoriaToursPorNombre("Tours de aventura");
        CategoriaTours categoria;
        if (categoriaOpt.isEmpty()) {
            categoria = new CategoriaTours("Tours de aventura", "http://example.com/icono_actualizado.png");
            categoria = categoriaToursService.guardarCategoriaTours(categoria);
        } else {
            categoria = categoriaOpt.get();
        }

        // Tours
        Tour tour = new Tour();
        tour.setTitulo("Aventura en la montaña");
        tour.setTipoDuracion(TipoDuracion.DIAS);
        tour.setDuracion(3);
        tour.setDescripcion("Explora las montañas y disfruta de paisajes impresionantes.");
        tour.setPrecio(299.99);
        tour.setCategoriaTours(categoria);
        tour = tourService.guardarTour(tour);


        DisponibilidadTour disponibilidad = new DisponibilidadTour();
        disponibilidad.setTour(tour);
        disponibilidad.setFecha(LocalDate.now().plusDays(10));
        disponibilidad.setDisponible(true);
        disponibilidadTourService.save(disponibilidad);

        Reserva reserva = new Reserva();
        reserva.setUsuario(usuario1);
        reserva.setTour(tour);
        reserva.setFechaInicio(LocalDate.now().plusDays(10));
        reserva.setFechaFin(LocalDate.now().plusDays(13));
        reserva.setHoraInicio(null);
        reserva.setHoraFin(null);
        reserva.setEstado(EstadoReserva.CONFIRMADA);
        reserva.setNumPersonas(2);
        reservaService.save(reserva);*/
    }
}
