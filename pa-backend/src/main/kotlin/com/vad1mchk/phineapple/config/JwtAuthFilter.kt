package com.vad1mchk.phineapple.config

import com.vad1mchk.phineapple.repo.UserRepo
import com.vad1mchk.phineapple.security.JwtUtil
import io.jsonwebtoken.ExpiredJwtException
import jakarta.servlet.*
import jakarta.servlet.http.HttpServletRequest
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component

@Component
class JwtAuthFilter(
    private val jwt: JwtUtil,
    private val userRepo: UserRepo
) : GenericFilter() {

    override fun doFilter(req: ServletRequest, res: ServletResponse, chain: FilterChain) {
        val request = req as HttpServletRequest
        val header = request.getHeader("Authorization") ?: ""
        if (header.startsWith("Bearer ")) {
            val token = header.substring(7)
            try {
                val email = jwt.extractUsername(token)
                if (email != null && SecurityContextHolder.getContext().authentication == null) {
                    val user = userRepo.findByEmail(email)!!
                    if (jwt.validate(token, user.email)) {
                        val auth = UsernamePasswordAuthenticationToken(email, null, emptyList())
                        auth.details = WebAuthenticationDetailsSource().buildDetails(request)
                        SecurityContextHolder.getContext().authentication = auth
                    }
                }
            } catch (_: ExpiredJwtException) { }
        }
        chain.doFilter(req, res)
    }
}
