package com.vad1mchk.phineapple.dto

import java.time.LocalDate

data class SummaryItem(val date: LocalDate, val completedCount: Long)
data class CompleteRequest(val habitId: Long, val date: LocalDate)

data class CompleteByNameRequest(
    val name: String,
    val date: LocalDate
)
// New DTO for a single completed habit
data class CompletedHabit(val id: Long, val name: String)