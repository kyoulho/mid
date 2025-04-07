package com.mid.api.account.svc

import com.mid.api.account.AccountTypeRepository
import com.mid.api.account.GetAccountTypeDTO
import com.mid.api.account.UpsertAccountTypeDTO
import com.mid.api.account.entity.AccountType
import com.mid.api.exception.MidApiException
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AccountTypeService(
    private val repo: AccountTypeRepository
) {

    @Transactional(readOnly = true)
    fun getAll(): List<GetAccountTypeDTO> =
        repo.findAll().map(GetAccountTypeDTO.Companion::from)

    @Transactional
    fun create(code: String, dto: UpsertAccountTypeDTO): GetAccountTypeDTO {
        if (repo.existsById(code)) {
            throw MidApiException(HttpStatus.CONFLICT, "이미 존재하는 코드입니다: $code")
        }
        val saved = repo.save(AccountType(code, dto.name))
        return GetAccountTypeDTO.Companion.from(saved)
    }

    @Transactional
    fun update(code: String, dto: UpsertAccountTypeDTO): GetAccountTypeDTO {
        val entity = repo.findById(code)
            .orElseThrow { MidApiException(HttpStatus.NOT_FOUND, "수정할 계좌유형이 없습니다.") }

        entity.name = dto.name

        return GetAccountTypeDTO.Companion.from(entity)
    }

    @Transactional
    fun delete(code: String) {
        if (!repo.existsById(code)) {
            throw MidApiException(HttpStatus.NOT_FOUND, "삭제할 계좌유형이 없습니다.")
        }
        repo.deleteById(code)
    }
}
