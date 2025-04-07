package com.mid.api.account.entity

import com.mid.api.dividend.Dividend
import com.mid.api.transaction.Transaction
import com.mid.api.user.User
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "accounts")
class Account(
    // 계좌 별칭 (ex. 내 ISA, 빗썸 코인지갑)
    var name: String,

    var number: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_type_code", referencedColumnName = "code")
    var type: AccountType,

    // 금융기관 or 거래소 이름 (ex. 한국투자, 빗썸, 업비트)
    var institution: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    var user: User
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    lateinit var id: UUID

    @CreatedDate
    @Column(updatable = false)
    lateinit var createdAt: LocalDateTime

    @LastModifiedDate
    lateinit var updatedAt: LocalDateTime

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    val transactions: List<Transaction> = listOf()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    val dividends: List<Dividend> = listOf()

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "account")
    val cashFlows: List<CashFlow> = listOf()
}