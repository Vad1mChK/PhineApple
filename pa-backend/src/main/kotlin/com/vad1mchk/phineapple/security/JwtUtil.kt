// JwtUtil.kt
package com.vad1mchk.phineapple.security

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import javax.crypto.SecretKey
import java.util.Date

@Component
class JwtUtil(
    @Value("\${jwt.secret:DefaultSecretKeyClassifiedNoUnauthorizedPersonnelAllowed}") secret: String,
    @Value("\${jwt.expiration}") private val expirationMs: Long
) {
    private val key: SecretKey = Keys.hmacShaKeyFor(secret.toByteArray())

    fun generate(username: String): String =
        Jwts.builder()
            .subject(username)                              // new builder API :contentReference[oaicite:6]{index=6}
            .issuedAt(Date())                               // instead of setIssuedAt() :contentReference[oaicite:7]{index=7}
            .expiration(Date(System.currentTimeMillis() + expirationMs))
            .signWith(key)                                  // infers HS256 :contentReference[oaicite:8]{index=8}
            .compact()

    fun extractUsername(token: String): String? =
        runCatching {
            Jwts.parser()                                  // parserBuilder() removed; parser() returns builder :contentReference[oaicite:9]{index=9}
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body
                .subject
        }.getOrNull()

    fun validate(token: String, username: String): Boolean =
        extractUsername(token) == username &&
                runCatching {
                    Jwts.parser()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(token)
                        .body
                        .expiration
                        .after(Date())
                }.getOrDefault(false)
}
