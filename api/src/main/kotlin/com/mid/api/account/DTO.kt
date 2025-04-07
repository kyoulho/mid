package com.mid.api.account

import com.mid.api.account.entity.Account
import com.mid.api.account.entity.AccountType
import java.util.*

data class UpsertAccountDTO(
    val name: String,
    val number: String,
    val type: AccountType,
    val institution: String,
)

data class GetAccountDTO(
    val id: UUID,
    val name: String,
    val number: String,
    val type: AccountType,
    val institution: String
) {
    companion object {
        fun from(account: Account) = with(account) {
            GetAccountDTO(
                id = id,
                name = name,
                number = number,
                type = type,
                institution = institution
            )
        }
    }
}

data class UpsertAccountTypeDTO(
    val code: String,
    val name: String,
)

data class GetAccountTypeDTO(
    val code: String,
    val name: String,
) {
    companion object {
        fun from(entity: AccountType): GetAccountTypeDTO = GetAccountTypeDTO(
            code = entity.code,
            name = entity.name,
        )
    }
}