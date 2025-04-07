package com.mid.api.account.repo

import com.mid.api.account.entity.Account
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

interface AccountRepository : JpaRepository<Account, UUID> {
    fun findByUserId(userId: UUID): List<Account>
    fun findByIdAndUserId(id: UUID, userId: UUID): Account?
}