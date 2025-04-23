package com.vad1mchk.phineapple.model

import jakarta.persistence.*

@Entity
data class Habit(
    var name: String = "",
    @ManyToOne(fetch = FetchType.LAZY) var owner: User? = null,
    @Id @GeneratedValue val id: Long? = null
)
