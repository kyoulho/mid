package com.mid.api.account.svc

import com.mid.api.account.repo.AccountRepository
import com.mid.api.account.GetAccountDTO
import com.mid.api.account.UpsertAccountDTO
import com.mid.api.account.entity.Account
import com.mid.api.exception.MidApiException
import com.mid.api.user.User
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class AccountService(
    private val accountRepository: AccountRepository
) {

    @Transactional(readOnly = true)
    fun getAccountsByUserId(userId: UUID): List<GetAccountDTO> {
        return accountRepository.findByUserId(userId)
            .map(GetAccountDTO.Companion::from)
    }

    @Transactional(readOnly = true)
    fun getAccountByUserId(userId: UUID, accountId: UUID): GetAccountDTO {
        val account = accountRepository.findByIdAndUserId(userId, accountId)
            ?: throw MidApiException(HttpStatus.BAD_REQUEST, "계좌를 찾을 수 없습니다.")
        return GetAccountDTO.Companion.from(account)
    }

    @Transactional
    fun createAccount(userId: UUID, dto: UpsertAccountDTO) {
        val account = Account(
            name = dto.name,
            number = dto.number,
            type = dto.type,
            institution = dto.institution,
            user = User.ofId(userId)
        )
        accountRepository.save(account)
    }

    @Transactional
    fun updateAccount(userId: UUID, accountId: UUID, dto: UpsertAccountDTO) {
        val account = accountRepository.findByIdAndUserId(userId, accountId)
            ?: throw MidApiException(HttpStatus.BAD_REQUEST, "계좌를 찾을 수 없습니다.")

        account.apply {
            name = dto.name
            number = dto.number
            type = dto.type
            institution = dto.institution
        }
    }
}
