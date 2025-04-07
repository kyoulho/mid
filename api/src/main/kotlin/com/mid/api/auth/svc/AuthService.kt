package com.mid.api.auth.svc

import com.mid.api.auth.JwtPayload
import com.mid.api.auth.entity.RefreshToken
import com.mid.api.auth.repo.RefreshTokenRepository
import com.mid.api.auth.Tokens
import com.mid.api.exception.MidApiException
import com.mid.api.user.User
import com.mid.api.user.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val refreshTokenRepository: RefreshTokenRepository,
    private val jwtProvider: JwtProvider,
    private val passwordEncoder: PasswordEncoder
) {

    @Transactional
    fun signUp(email: String, password: String) {
        val user = User(email = email, password = passwordEncoder.encode(password))
        userRepository.save(user)
    }

    @Transactional
    fun login(email: String, rawPassword: String): Tokens {
        val user = userRepository.findByEmail(email)
            ?: throw MidApiException(HttpStatus.UNAUTHORIZED, "존재하지 않는 사용자입니다.")

        if (!passwordEncoder.matches(rawPassword, user.password)) {
            throw MidApiException(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.")
        }

        val accessToken = jwtProvider.generateAccessToken(user.id, JwtPayload(user.email!!))
        val refreshToken = jwtProvider.generateRefreshToken()

        refreshTokenRepository.save(RefreshToken(userId = user.id, token = refreshToken))

        return Tokens(accessToken, refreshToken)
    }

    @Transactional(readOnly = true)
    fun reissue(refreshToken: String): String {
        val saved = refreshTokenRepository.findByToken(refreshToken)
            ?: throw MidApiException(HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다.")

        val user = userRepository.findByIdOrNull(saved.userId)
            ?: throw MidApiException(HttpStatus.UNAUTHORIZED, "유효하지 않은 리프레시 토큰입니다.")

        return jwtProvider.generateAccessToken(saved.userId, JwtPayload(user.email!!))
    }
}