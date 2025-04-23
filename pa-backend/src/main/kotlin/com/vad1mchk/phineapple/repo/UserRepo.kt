package com.vad1mchk.phineapple.repo

import com.vad1mchk.phineapple.model.User
import org.springframework.data.jpa.repository.*
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository interface UserRepo : JpaRepository<User, Long> {
    fun findByEmail(email: String): User?
}