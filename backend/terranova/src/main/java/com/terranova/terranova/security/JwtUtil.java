package com.terranova.terranova.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
    public static final String SECRET_KEY = Base64.getEncoder().encodeToString("mY6s3cUr3K3yF0rJWTaUthEnTicAti0N@2024!".getBytes()); // Usa un valor seguro en producción

    // Generar un token JWT
    public String generateToken(String email) {
        System.out.println("JWT Secret Key: " + SECRET_KEY);
        System.out.println("JWT Secret Key Length: " + SECRET_KEY.getBytes().length * 8 + " bits");
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 horas de validez
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // Obtener email desde el token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Verificar si el token es válido
    public boolean validateToken(String token, String userEmail) {
        return (userEmail.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
