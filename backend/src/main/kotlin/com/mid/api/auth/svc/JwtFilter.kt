package com.mid.api.auth.svc

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.util.*

@Component
class JwtFilter(
    private val jwtProvider: JwtProvider
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val authHeader = request.getHeader("Authorization")
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            val token = authHeader.substring(7)

            try {
                val userId: UUID = jwtProvider.extractUserId(token)

                SecurityContextHolder.getContext().authentication = UsernamePasswordAuthenticationToken(
                    userId, null, emptyList()
                ).apply { details = WebAuthenticationDetailsSource().buildDetails(request) }
            } catch (e: Exception) {
                logger.warn("JWT 인증 실패: ${e.message}")
            }
        }

        filterChain.doFilter(request, response)
    }
}
