package com.mid.api.account.ctr

import com.mid.api.account.svc.AccountTypeService
import com.mid.api.account.GetAccountTypeDTO
import com.mid.api.account.UpsertAccountTypeDTO
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@Tag(name = "계좌유형")
@RestController
@RequestMapping("/api/account-types")
class AccountTypeController(
    private val accountTypeService: AccountTypeService
) {

    @GetMapping
    fun getAll(): List<GetAccountTypeDTO> {
        return accountTypeService.getAll()
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{code}")
    fun create(@PathVariable code: String, @RequestBody dto: UpsertAccountTypeDTO): GetAccountTypeDTO {
        return accountTypeService.create(code, dto)
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{code}")
    fun update(@PathVariable code: String, @RequestBody dto: UpsertAccountTypeDTO): GetAccountTypeDTO {
        return accountTypeService.update(code, dto)
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{code}")
    fun delete(@PathVariable code: String) {
        accountTypeService.delete(code)
    }
}
