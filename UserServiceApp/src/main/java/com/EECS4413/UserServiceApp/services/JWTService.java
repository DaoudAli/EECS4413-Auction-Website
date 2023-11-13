package com.EECS4413.UserServiceApp.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.EECS4413.UserServiceApp.database.UserRepository;
import com.EECS4413.UserServiceApp.model.User;

@Service
public class JWTService {
    @Autowired
    private UserRepository userRepository; // Inject the UserRepository
    @Value("${jwt.secret.key}")
    private String SECRET_KEY; // Replace with your actual secret key
    private static final long TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds, adjust as needed

    public String generateToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        System.out.println("SECRET KEY " + SECRET_KEY);
        // Decode the secret key
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        Key signingKey = Keys.hmacShaKeyFor(decodedKey);
        System.out.println(SECRET_KEY);
        // Set the JWT Claims
        JwtBuilder builder = Jwts.builder().id(user.getId().toString())
                .issuedAt(now)
                .subject(user.getUserName())
                .signWith(signingKey);

        // Set the expiration
        long expMillis = nowMillis + TOKEN_EXPIRY;
        Date exp = new Date(expMillis);
        builder.expiration(exp);

        return builder.compact();
    }

    public boolean validateToken(String token) {
        SecretKey secret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        try {
            Jwts.parser().verifyWith(secret).build()
                    .parseSignedClaims(token)
                    .getPayload();
            ;
            return true;
        } catch (SignatureException e) {
            // log the exception
            return false;
        }
    }

    public Claims getClaims(String token) {
        SecretKey secret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
        return Jwts.parser()
                .verifyWith(secret)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public User getUserFromToken(String token) {
        Claims claims = getClaims(token);
        String username = claims.getSubject(); // Assuming the username is stored in the subject claim
        System.out.println(claims.getSubject());
        // Fetch the user details based on the username
        return userRepository.findByUserName(username);
    }
}
