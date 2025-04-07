package com.mid.api.feign

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "usStockClient", url = "https://query1.finance.yahoo.com")
interface UsStockFeignClient {

    @GetMapping("/v8/finance/chart/{symbol}")
    fun getHistoricalPrice(
        @PathVariable symbol: String,  // 예: AAPL, MSFT
        @RequestParam("period1") from: Long, // UNIX timestamp
        @RequestParam("period2") to: Long,
        @RequestParam("interval") interval: String = "1d"
    ): YahooChartDTO
}
