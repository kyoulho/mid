package com.mid.api.feign

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(name = "krStockClient", url = "https://api.krx.co.kr")
interface KoreanStockFeignClient {

    @GetMapping("/contents/MDC/99/MDCSTAT/standard/MDCSTAT01901/getMDCSTAT01901.ajax")
    fun getDailyPrice(
        @RequestParam("isuCd") stockCode: String, // 예: 005930
        @RequestParam("strtDd") startDate: String, // 예: 20240401
        @RequestParam("endDd") endDate: String
    ): KrxPriceResponse
}
