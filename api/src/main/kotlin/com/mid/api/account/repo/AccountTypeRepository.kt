package com.mid.api.account.repo

import com.mid.api.account.entity.AccountType
import org.springframework.data.jpa.repository.JpaRepository

interface AccountTypeRepository : JpaRepository<AccountType, String>
