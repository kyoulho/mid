package com.mid.api.auth.svc

import com.mid.api.auth.JwtPayload
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.crypto.SecretKey
import kotlin.time.Duration

@Component
class JwtProvider(
    @Value("\${jwt.secret}") private val secretKey: String,
    @Value("\${jwt.exp.access}") private val accessTokenValidity: Duration,
    @Value("\${jwt.exp.refresh}") private val refreshTokenValidity: Duration,
) {
    private val key: SecretKey = Keys.hmacShaKeyFor(secretKey.toByteArray())

    fun generateAccessToken(userId: UUID, payload: JwtPayload): String {
        val now = Date()
        val expiry = Date(now.time + accessTokenValidity.inWholeMilliseconds)

        return Jwts.builder()
            .setSubject(userId.toString())
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun generateRefreshToken(): String {
        val now = Date()
        val expiry = Date(now.time + refreshTokenValidity.inWholeMilliseconds)

        return Jwts.builder()
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(key, SignatureAlgorithm.HS256)
            .compact()
    }

    fun extractUserId(token: String): UUID {
        val subject = Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token).body.subject
        return UUID.fromString(subject)
    }
}
