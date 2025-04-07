package com.mid.api.dividend

import com.mid.api.account.entity.Account
import com.mid.api.asset.entity.Asset
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "dividends")
class Dividend(
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asset_symbol", referencedColumnName = "symbol")
    val asset: Asset,

    val amount: BigDecimal,

    @Enumerated(EnumType.STRING)
    val currency: Currency, // Asset.currency

    val paidDate: LocalDateTime,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    val account: Account
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    lateinit var id: UUID

    @CreatedDate
    @Column(updatable = false)
    lateinit var createdAt: LocalDateTime

    @LastModifiedDate
    lateinit var updatedAt: LocalDateTime
}
