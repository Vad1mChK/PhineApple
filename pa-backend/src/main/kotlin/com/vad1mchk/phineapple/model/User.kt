package com.vad1mchk.phineapple.model

import jakarta.persistence.*

@Entity
@Table(name = "users")
data class User(
    @Column(unique = true) var email: String = "",
    var password: String = "",            // BCrypt-encoded
    @Id @GeneratedValue val id: Long? = null
)
