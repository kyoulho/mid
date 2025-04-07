package com.mid.api.auth

data class SignupDTO(
    val email: String,
    val password: String
)

data class LoginDTO(
    val email: String,
    val password: String
)

data class JwtPayload(
    val email: String,
)

data class AccessTokenDTO(
    val accessToken: String,
)

data class Tokens(
    val accessToken: String,
    val refreshToken: String
)
