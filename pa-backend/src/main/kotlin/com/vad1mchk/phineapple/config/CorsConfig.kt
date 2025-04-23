// src/main/kotlin/com/vad1mchk/phineapple/config/CorsConfig.kt
package com.vad1mchk.phineapple.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Configuration
class CorsConfig {
    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val config = CorsConfiguration().apply {
            allowCredentials = true
            addAllowedOriginPattern("*")      // wildcard origins
            addAllowedHeader(CorsConfiguration.ALL) // allow any header
            addAllowedMethod(CorsConfiguration.ALL) // allow any method
        }
        val source = UrlBasedCorsConfigurationSource().apply {
            registerCorsConfiguration("/**", config) // apply to all paths
        }
        return UrlBasedCorsConfigurationSource().also {
            it.registerCorsConfiguration("/**", config) // apply to all paths
        }
    }
}