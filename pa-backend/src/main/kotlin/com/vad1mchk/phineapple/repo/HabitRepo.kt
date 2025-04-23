package com.vad1mchk.phineapple.repo

import com.vad1mchk.phineapple.model.Habit
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface HabitRepo : JpaRepository<Habit, Long> {
    fun findByOwnerEmail(email: String): List<Habit>

    fun findByOwnerEmailAndName(ownerEmail: String, name: String): Habit?
}