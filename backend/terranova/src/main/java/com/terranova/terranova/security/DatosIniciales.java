package com.terranova.terranova.security;

import com.terranova.terranova.entity.CategoriaTours;
import com.terranova.terranova.entity.Usuario;
import com.terranova.terranova.entity.UsuarioRole;
import com.terranova.terranova.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DatosIniciales implements ApplicationRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

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

        CategoriaTours categoriaTours= new CategoriaTours( "Tours de aventura","http://example.com/icono_actualizado.png" );
    }
}
