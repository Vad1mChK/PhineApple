package com.vad1mchk.phineapple.web

import com.vad1mchk.phineapple.dto.LoginRequest
import com.vad1mchk.phineapple.dto.LoginResponse
import com.vad1mchk.phineapple.dto.RegisterRequest
import com.vad1mchk.phineapple.service.AuthService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(private val service: AuthService) {

    @PostMapping("/register")
    fun register(@RequestBody req: RegisterRequest): ResponseEntity<LoginResponse> =
        ResponseEntity.ok(service.register(req))

    @PostMapping("/login")
    fun login(@RequestBody req: LoginRequest): ResponseEntity<LoginResponse> =
        ResponseEntity.ok(service.login(req))
}
