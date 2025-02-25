package com.terranova.terranova.controller;

import com.terranova.terranova.dto.AuthRequest;
import com.terranova.terranova.dto.AuthResponse;
import com.terranova.terranova.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import com.terranova.terranova.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Endpoint para iniciar sesión y generar un token JWT
     */
    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            System.out.println("Autenticación exitosa para: " + request.getEmail());

            UserDetails userDetails = usuarioService.loadUserByUsername(request.getEmail());
            if (userDetails == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no encontrado");
            }
            String token = jwtUtil.generateToken(request.getEmail());  // Método para generar el token
            return ResponseEntity.ok(new AuthResponse(token));

        } catch (Exception e) {
            System.out.println("Error de autenticación: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    /**
     * Endpoint para cerrar sesión (opcional: se maneja en frontend eliminando el token)
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // No se puede invalidar un JWT en backend, pero el frontend puede eliminarlo
        return ResponseEntity.ok("Sesión cerrada correctamente");
    }
}
