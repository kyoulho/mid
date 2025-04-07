package com.mid.api.asset.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "asset_tags")
class AssetTag(
    @Column(unique = true, nullable = false)
    val name: String // ex: "ETF", "금", "인컴 전략"
) {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    lateinit var id: UUID
}
