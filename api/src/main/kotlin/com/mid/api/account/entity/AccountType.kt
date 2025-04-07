package com.mid.api.account.entity

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "account_types")
class AccountType(
    @Id
    val code: String,  // ex: "ISA", "CRYPTO"

    var name: String,  // ex: "ISA 계좌"

)