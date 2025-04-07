package com.mid.api.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(MidApiException::class)
    fun handleMidApiException(ex: MidApiException): ResponseEntity<ErrorDTO> {
        val status = ex.status
        val errorDTO = ErrorDTO(
            message = ex.message,
            stackTrace = ex.stackTrace.joinToString("\n")
        )
        return ResponseEntity.status(status).body(errorDTO)
    }

    // 기타 예외 처리 (옵션)
    @ExceptionHandler(Exception::class)
    fun handleOtherExceptions(ex: Exception): ResponseEntity<ErrorDTO> {
        val errorDTO = ErrorDTO(
            message = ex.message ?: "서버 내부 오류가 발생했습니다.",
            stackTrace = ex.stackTrace.joinToString("\n")
        )
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorDTO)
    }
}
