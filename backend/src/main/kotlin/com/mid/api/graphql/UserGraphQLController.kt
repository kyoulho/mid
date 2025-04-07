package com.mid.api.graphql

import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.stereotype.Controller

@Controller
class UserGraphQLController {

    @QueryMapping
    fun hello(): String = "Hello, GraphQL!"

    @QueryMapping
    fun user(@Argument id: String): UserDTO {
        return UserDTO(id = id, name = "홍길동", age = 30)
    }
}

data class UserDTO(
    val id: String,
    val name: String,
    val age: Int
)
