package com.terranova.terranova.security;

import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.Tour;
import com.terranova.terranova.entity.Usuario;
import com.terranova.terranova.entity.UsuarioRole;
import com.terranova.terranova.repository.ICategoriaToursRepository;
import com.terranova.terranova.repository.UsuarioRepository;
import com.terranova.terranova.service.CategoriaToursService;
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

    @Override
    public void run(ApplicationArguments args) throws Exception {
        String passSinCifrar= "admin";
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
        if (categoria != null) {
            Tour tour1 = new Tour(null, "Excursión en la Montaña", 3, "Recorrido por montañas nevadas", 150.50, categoria);
            Tour tour2 = new Tour(null, "Tour por la Selva", 2, "Exploración de fauna y flora tropical", 200.00, categoria);

            tourService.guardarTour(tour1);
            tourService.guardarTour(tour2);
        } else {
            System.out.println("❌ Error: La categoría no se guardó correctamente, los tours no se insertarán.");
        }
    }
}
