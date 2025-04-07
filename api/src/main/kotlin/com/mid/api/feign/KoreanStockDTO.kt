package com.mid.api.feign

import com.fasterxml.jackson.annotation.JsonProperty

data class KrxPriceResponse(
    val OutBlock1: List<KrxPriceData>
)

data class KrxPriceData(
    @JsonProperty("ISU_SRT_CD")
    val stockCode: String,

    @JsonProperty("TDD_CLSPRC")
    val closePrice: String, // 보통 문자열로 오므로 나중에 BigDecimal로 변환 필요

    @JsonProperty("TRD_DD")
    val tradeDate: String // yyyyMMdd 형식
)
