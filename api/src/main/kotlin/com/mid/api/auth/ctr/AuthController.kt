package com.mid.api.auth.ctr

import com.mid.api.auth.AccessTokenDTO
import com.mid.api.auth.svc.AuthService
import com.mid.api.auth.LoginDTO
import com.mid.api.auth.SignupDTO
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.servlet.http.Cookie
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@Tag(name = "인증")
@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {

    @PostMapping
    fun signup(@RequestBody requestBody: SignupDTO) {
        authService.signUp(requestBody.email, requestBody.password)
    }

    @PostMapping("/login")
    fun login(
        @RequestBody body: LoginDTO,
        request: HttpServletRequest,
        response: HttpServletResponse
    ): AccessTokenDTO {
        val tokens = authService.login(body.email, body.password)

        // httpOnly 쿠키에 refreshToken 설정
        val cookie = Cookie("refreshToken", tokens.refreshToken).apply {
            isHttpOnly = true
            secure = request.isSecure
            path = request.contextPath.ifBlank { "/" }
            maxAge = 60 * 60 * 24 * 1
        }

        response.addCookie(cookie)

        return AccessTokenDTO(tokens.accessToken)
    }

    @PostMapping("/reissue")
    fun reissue(@CookieValue("refreshToken") refreshToken: String): AccessTokenDTO {
        val accessToken = authService.reissue(refreshToken)
        return AccessTokenDTO(accessToken)
    }
}