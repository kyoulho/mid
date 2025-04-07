package com.mid.api.user

import com.mid.api.account.entity.Account
import jakarta.persistence.*
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener::class)
class User(
    @Column(nullable = false, unique = true)
    val email: String? = null,

    @Column(nullable = false)
    var password: String? = null,
) {

    @Id
    @GeneratedValue
    lateinit var id: UUID

    @CreatedDate
    @Column(updatable = false)
    lateinit var createdAt: LocalDateTime

    @LastModifiedDate
    lateinit var updatedAt: LocalDateTime

    @OneToMany(mappedBy = "user", cascade = [CascadeType.ALL])
    val accounts: List<Account> = mutableListOf()

    companion object {
        fun ofId(id: UUID): User {
            val user = User()
            user.id = id
            return user
        }
    }
}
