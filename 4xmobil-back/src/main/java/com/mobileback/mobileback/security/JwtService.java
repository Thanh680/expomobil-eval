package com.mobileback.mobileback.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    public String generateToken(AppUserDetails user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("client", user.getUtilisateur() != null ? user.getUtilisateur().getId() : null)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "azerty")
                .compact();

    }

    public String getSubjectFromJwt(String jwt) {

        return Jwts.parser()
                .setSigningKey("azerty")
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();


    }
}
