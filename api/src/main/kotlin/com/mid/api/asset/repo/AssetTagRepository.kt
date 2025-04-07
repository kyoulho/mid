package com.mid.api.asset.repo

import com.mid.api.asset.entity.AssetTag
import org.springframework.data.jpa.repository.JpaRepository

interface AssetTagRepository : JpaRepository<AssetTag, Long> {
    fun findByName(name: String): AssetTag?
}
