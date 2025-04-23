package com.vad1mchk.phineapple.dto

data class RegisterRequest(val email: String, val password: String)
data class LoginRequest(val email: String, val password: String)
data class LoginResponse(val token: String, val email: String)
