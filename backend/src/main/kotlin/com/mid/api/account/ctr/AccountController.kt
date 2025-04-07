package com.mid.api.account.ctr

import com.mid.api.account.svc.AccountService
import com.mid.api.account.GetAccountDTO
import com.mid.api.account.UpsertAccountDTO
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import java.util.*

@Tag(name = "계좌")
@RestController
@RequestMapping("/api/accounts")
class AccountController(
    private val accountService: AccountService
) {

    @GetMapping()
    fun getAccountsByUserId(@AuthenticationPrincipal userId: UUID): List<GetAccountDTO> {
        return accountService.getAccountsByUserId(userId)
    }

    @GetMapping("/{accountId}")
    fun getAccount(@AuthenticationPrincipal userId: UUID, @PathVariable accountId: UUID): GetAccountDTO {
        return accountService.getAccountByUserId(userId, accountId)
    }

    @PostMapping
    fun createAccount(@AuthenticationPrincipal userId: UUID, @RequestBody dto: UpsertAccountDTO) {
        accountService.createAccount(userId, dto)
    }

    @PutMapping("/{accountId}")
    fun updateAccount(
        @AuthenticationPrincipal userId: UUID,
        @PathVariable accountId: UUID,
        @RequestBody dto: UpsertAccountDTO
    ) {
        accountService.updateAccount(userId, accountId, dto)
    }
}
