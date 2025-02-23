package com.terranova.terranova.controller;

import com.terranova.terranova.entity.Usuario;
import com.terranova.terranova.exception.ResourceNotFoundException;
import com.terranova.terranova.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Endpoint para registrar un nuevo usuario
    @PostMapping("/registrar")
    public ResponseEntity<String> registrarUsuario(
            @RequestParam String nombre,
            @RequestParam String apellido,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String password2) {
        try {
            usuarioService.registrar(nombre, apellido, email, password, password2);
            return ResponseEntity.ok("Usuario registrado con éxito");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint para actualizar datos de un usuario
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(
            @PathVariable Long id,
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String password2) {
        try {
            usuarioService.actualizar(id, nombre, email, password, password2);
            return ResponseEntity.ok("Usuario actualizado con éxito");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint para obtener la lista de usuarios
    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Endpoint para obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.getOne(id);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint para cambiar el rol de un usuario
    @PutMapping("/cambiarRol/{id}")
    public ResponseEntity<String> cambiarRol(@PathVariable Long id) {
        usuarioService.cambiarRol(id);
        return ResponseEntity.ok("Rol cambiado con éxito");
    }

    // Endpoint para obtener datos del usuario autenticado
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> obtenerPerfil(@AuthenticationPrincipal UserDetails userDetails) throws ResourceNotFoundException {
        if (userDetails != null) {
            String email = userDetails.getUsername();
            Usuario usuario = usuarioService.buscarPorEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(401).build();
    }
}