package com.vad1mchk.phineapple.repo

import com.vad1mchk.phineapple.dto.SummaryItem
import com.vad1mchk.phineapple.model.HabitCompletion
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface HabitCompletionRepo : JpaRepository<HabitCompletion, Long> {

    @Query(
        """
        select new com.vad1mchk.phineapple.dto.SummaryItem(h.date, count(h))
        from HabitCompletion h
        where h.date between :from and :to
          and h.habit.owner.email = :email
        group by h.date
        """
    )
    fun dailySummary(email: String, from: LocalDate, to: LocalDate): List<SummaryItem>

    fun findByDateAndHabitOwnerEmail(date: LocalDate, email: String): List<HabitCompletion>
}
