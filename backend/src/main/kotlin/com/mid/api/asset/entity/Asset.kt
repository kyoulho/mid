package com.mid.api.asset.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "assets")
class Asset(
    @Id
    val symbol: String, // ex: "AAPL", "SPY", "IEF", "GLD"

    val name: String,   // ex: "애플", "S&P500 ETF"

    @Enumerated(EnumType.STRING)
    val currency: Currency,

    @ManyToMany
    @JoinTable(
        name = "asset_tag_map",
        joinColumns = [JoinColumn(name = "asset_symbol")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")]
    )
    val tags: MutableSet<AssetTag> = mutableSetOf()
)
