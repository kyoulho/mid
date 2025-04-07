package com.mid.api.feign

import java.math.BigDecimal

data class YahooChartDTO(
    val chart: Chart
) {
    data class Chart(
        val result: List<Result>,
        val error: Any?
    )

    data class Result(
        val timestamp: List<Long>,
        val indicators: Indicators
    )

    data class Indicators(
        val quote: List<Quote>
    )

    data class Quote(
        val open: List<BigDecimal?>,
        val close: List<BigDecimal?>,
        val high: List<BigDecimal?>,
        val low: List<BigDecimal?>,
        val volume: List<Long?>
    )
}
