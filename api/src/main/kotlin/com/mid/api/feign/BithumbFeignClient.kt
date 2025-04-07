package com.mid.api.feign

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

@FeignClient(name = "bithumbClient", url = "https://api.bithumb.com")
interface BithumbFeignClient {

    @GetMapping("/public/ticker/{symbol}_KRW")
    fun getTicker(@PathVariable symbol: String): BithumbTickerResponse
}
