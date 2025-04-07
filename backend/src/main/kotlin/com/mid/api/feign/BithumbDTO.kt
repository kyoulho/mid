package com.mid.api.feign

import com.fasterxml.jackson.annotation.JsonProperty
import java.math.BigDecimal

data class BithumbTickerResponse(
    val status: String,
    val data: BithumbTickerData
)

data class BithumbTickerData(
    @JsonProperty("closing_price")
    val closingPrice: BigDecimal,

    @JsonProperty("opening_price")
    val openingPrice: BigDecimal,

    @JsonProperty("min_price")
    val lowPrice: BigDecimal,

    @JsonProperty("max_price")
    val highPrice: BigDecimal,

    @JsonProperty("units_traded")
    val volume: BigDecimal,

    @JsonProperty("date")
    val timestamp: Long
)
