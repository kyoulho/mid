package com.mid.api.exception

import org.springframework.http.HttpStatus

class MidApiException(
    val status: HttpStatus,
    override val message: String,
    override val cause: Throwable? = null
) : RuntimeException(message, cause) {
}