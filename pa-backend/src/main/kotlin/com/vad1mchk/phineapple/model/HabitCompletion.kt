package com.vad1mchk.phineapple.model

import jakarta.persistence.*
import java.time.LocalDate

@Entity
data class HabitCompletion(
    @ManyToOne var habit: Habit? = null,
    var date: LocalDate = LocalDate.now(),
    @Id @GeneratedValue val id: Long? = null
)
