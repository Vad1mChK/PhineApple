package com.vad1mchk.phineapple

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(
    scanBasePackages = ["com.vad1mchk.phineapple"]
)
class PaBackendApplication

fun main(args: Array<String>) {
    runApplication<PaBackendApplication>(*args)
}
