package com.vad1mchk.phineapple.service

import com.vad1mchk.phineapple.dto.CompleteByNameRequest
import com.vad1mchk.phineapple.dto.CompleteRequest
import com.vad1mchk.phineapple.dto.CompletedHabit
import com.vad1mchk.phineapple.dto.SummaryItem
import com.vad1mchk.phineapple.model.Habit
import com.vad1mchk.phineapple.model.HabitCompletion
import com.vad1mchk.phineapple.repo.HabitCompletionRepo
import com.vad1mchk.phineapple.repo.HabitRepo
import com.vad1mchk.phineapple.repo.UserRepo
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDate

@Service
class HabitService(
    private val habitRepo: HabitRepo,
    private val completionRepo: HabitCompletionRepo,
    private val userRepo: UserRepo
) {

    fun summary(email: String, from: LocalDate, to: LocalDate): List<SummaryItem> =
        completionRepo.dailySummary(email, from, to)

    fun completionsForDay(email: String, date: LocalDate): List<CompletedHabit> =
        completionRepo.findByDateAndHabitOwnerEmail(date, email)
            .map { CompletedHabit(it.habit?.id ?: -1, it.habit?.name ?: "CHICKEN JOCKEY") }

    @Transactional
    fun markComplete(email: String, rq: CompleteRequest) {
        val habit = habitRepo.findById(rq.habitId).orElseThrow()
        if (habit.owner?.email != email) throw IllegalAccessException("Not yours")
        completionRepo.save(HabitCompletion(habit, rq.date))
    }

    @Transactional
    fun completeByName(userEmail: String, req: CompleteByNameRequest) {
        // 1. Find User
        val user = userRepo.findByEmail(userEmail)
            ?: throw IllegalArgumentException("User not found: $userEmail")
        // 2. Find or create Habit
        val habit: Habit = habitRepo.findByOwnerEmailAndName(userEmail, req.name)
            ?: habitRepo.save(Habit(name = req.name, owner = user))
        // 3. Record Completion
        completionRepo.save(HabitCompletion(habit = habit, date = req.date))
    }
}
