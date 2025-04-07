package com.mid.api.auth.entity

import org.springframework.data.annotation.Id
import org.springframework.data.redis.core.RedisHash
import java.io.Serializable
import java.util.UUID

@RedisHash(value = "refresh_token", timeToLive = 60 * 60 * 24 * 1) // 1 일
data class RefreshToken(
    @Id
    val userId: UUID,
    val token: String
) : Serializable