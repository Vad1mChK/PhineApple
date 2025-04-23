package com.vad1mchk.phineapple.web

import com.vad1mchk.phineapple.dto.CompleteByNameRequest
import com.vad1mchk.phineapple.dto.CompleteRequest
import com.vad1mchk.phineapple.dto.CompletedHabit
import com.vad1mchk.phineapple.dto.SummaryItem
import com.vad1mchk.phineapple.service.HabitService
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/api/habits")
class HabitController(private val service: HabitService) {

    @GetMapping("/summary")
    fun summary(
        @AuthenticationPrincipal email: String,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) from: LocalDate,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) to: LocalDate
    ): ResponseEntity<List<SummaryItem>> =
        ResponseEntity.ok(service.summary(email, from, to))

    @GetMapping("/{date}")
    fun day(
        @AuthenticationPrincipal email: String,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate
    ): ResponseEntity<List<CompletedHabit>> =   // use the new DTO
        ResponseEntity.ok(service.completionsForDay(email, date))

    @PostMapping("/complete")
    fun complete(
        @AuthenticationPrincipal email: String,
        @RequestBody rq: CompleteRequest
    ): ResponseEntity<Unit> {
        service.markComplete(email, rq)
        return ResponseEntity.ok().build()
    }

    @PostMapping("/completeByName")
    fun completeByName(
        @AuthenticationPrincipal email: String,
        @RequestBody req: CompleteByNameRequest
    ): ResponseEntity<Void> {
        service.completeByName(email, req)
        return ResponseEntity.ok().build()
    }
}
