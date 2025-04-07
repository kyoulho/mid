package com.mid.api.auth.repo

import com.mid.api.auth.entity.RefreshToken
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface RefreshTokenRepository : CrudRepository<RefreshToken, UUID> {
    fun findByToken(token: String): RefreshToken?
}