package com.mid.api.asset.repo

import com.mid.api.asset.entity.Asset
import org.springframework.data.jpa.repository.JpaRepository

interface AssetRepository : JpaRepository<Asset, String> {
    fun findByTagsName(tagName: String): List<Asset>
}

