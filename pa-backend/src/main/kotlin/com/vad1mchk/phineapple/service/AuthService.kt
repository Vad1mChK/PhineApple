package com.vad1mchk.phineapple.service

import com.vad1mchk.phineapple.dto.LoginRequest
import com.vad1mchk.phineapple.dto.LoginResponse
import com.vad1mchk.phineapple.dto.RegisterRequest
import com.vad1mchk.phineapple.model.User
import com.vad1mchk.phineapple.repo.UserRepo
import com.vad1mchk.phineapple.security.JwtUtil
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepo: UserRepo,
    private val pwd: PasswordEncoder,
    private val jwt: JwtUtil
) {
    fun register(req: RegisterRequest): LoginResponse {
        if (userRepo.findByEmail(req.email) != null) throw IllegalArgumentException("Email exists")
        val user = userRepo.save(User(req.email, pwd.encode(req.password)))
        return LoginResponse(jwt.generate(user.email), user.email)
    }

    fun login(req: LoginRequest): LoginResponse {
        val user = userRepo.findByEmail(req.email) ?: throw IllegalArgumentException("Bad creds")
        if (!pwd.matches(req.password, user.password)) throw IllegalArgumentException("Bad creds")
        return LoginResponse(jwt.generate(user.email), user.email)
    }
}
