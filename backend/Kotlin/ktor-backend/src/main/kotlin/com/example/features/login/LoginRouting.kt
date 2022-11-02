package com.example.features.login

import com.example.features.cache.InMemory
import com.example.features.cache.TokenCache
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.UUID

fun Application.configureLoginRouting() {

    routing {
        post("/login") {
            val receive = call.receive<LoginReceiveRemote>()
            val user = InMemory.userList.firstOrNull() { it.login == receive.login }
            if (user == null) {
                call.respond(HttpStatusCode.BadRequest, "Wrong login or password")
            } else {
                if (user.login != receive.login) {
                    call.respond(HttpStatusCode.BadRequest, "Wrong login or password")
                 }
            }
            if (InMemory.userList.map { it.login }.contains(receive.login)) {
                val token = UUID.randomUUID().toString()
                InMemory.tokens.add(TokenCache(login = receive.login, token = token))
                call.respond(token)
                return@post
            } else {
                call.respond(HttpStatusCode.BadRequest)
            }
        }
    }
}
