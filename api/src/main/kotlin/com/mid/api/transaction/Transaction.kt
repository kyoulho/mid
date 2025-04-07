package com.mid.api.transaction

import com.mid.api.account.entity.Account
import com.mid.api.asset.entity.Asset
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.math.BigDecimal
import java.math.RoundingMode
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "transactions")
class Transaction(
    val type: TransactionType,

    val quantity: BigDecimal,

    val price: BigDecimal,

    @Enumerated(EnumType.STRING)
    val currency: Currency, // Asset.currency

    val eventDate: LocalDateTime,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    val account: Account,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_symbol", referencedColumnName = "symbol")
    val asset: Asset
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    lateinit var id: UUID

    val amount: BigDecimal
        get() = price.multiply(quantity).setScale(2, RoundingMode.HALF_UP)

    @CreatedDate
    @Column(updatable = false)
    lateinit var createdAt: LocalDateTime

    @LastModifiedDate
    lateinit var updatedAt: LocalDateTime
}
