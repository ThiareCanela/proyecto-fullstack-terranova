package com.terranova.terranova.controller;

import com.terranova.terranova.entity.Usuario;
import com.terranova.terranova.repository.UsuarioRepository;
import com.terranova.terranova.exception.ResourceNotFoundException;
import com.terranova.terranova.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // ✅ Endpoint para registrar un nuevo usuario usando @RequestBody
    @PostMapping("/registrar")
    public ResponseEntity<Map<String, Object>> registrarUsuario(@RequestBody Map<String, String> parametros) {
        System.out.println("🔹 Datos recibidos en el backend:");
        parametros.forEach((clave, valor) -> System.out.println(clave + ": " + valor));

        if (!parametros.containsKey("nombre") || !parametros.containsKey("apellido") ||
            !parametros.containsKey("email") || !parametros.containsKey("password")) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "❌ Faltan parámetros en la solicitud."));
        }

        // Registrar usuario en la base de datos
        try {
            usuarioService.registrar(
                parametros.get("nombre"),
                parametros.get("apellido"),
                parametros.get("email"),
                parametros.get("password")
            );
            return ResponseEntity.ok(Map.of("success", true, "message", "✅ Usuario registrado con éxito"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "❌ Error en el registro: " + e.getMessage()));
        }
    }

    // ✅ Endpoint para cambiar el rol de un usuario
    @PutMapping("/cambiarRol/{id}")
    public ResponseEntity<String> cambiarRol(@PathVariable Long id) {
        usuarioService.cambiarRol(id);
        return ResponseEntity.ok("✅ Rol cambiado con éxito");
    }

    // ✅ Endpoint para actualizar datos de un usuario
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarUsuario(
            @PathVariable Long id,
            @RequestParam String nombre,
            @RequestParam String email,
            @RequestParam(required = false) String password) {
        try {
            usuarioService.actualizar(id, nombre, email, password);
            return ResponseEntity.ok("✅ Usuario actualizado con éxito");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ✅ Endpoint para obtener la lista de usuarios
    @GetMapping("/listar")
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // ✅ Endpoint para obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.getOne(id);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Endpoint para obtener los datos del usuario autenticado
    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfil(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("success", false, "message", "❌ No autorizado"));
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            Usuario usuario = usuarioRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            Map<String, Object> userData = Map.of(
                    "id", usuario.getId(),
                    "nombre", usuario.getNombre(),
                    "apellido", usuario.getApellido(),
                    "email", usuario.getEmail(),
                    "usuarioRole", usuario.getUsuarioRole()
            );

            return ResponseEntity.ok(userData);
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("success", false, "message", "❌ Acceso denegado"));
    }
}
