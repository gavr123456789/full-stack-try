package com.example.features.register

import com.example.features.cache.InMemory
import com.example.utils.isValidEmail
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.UUID

fun Application.configureRegisterRouting() {

    routing {
        post("/register") {
            val receive = call.receive<RegisterReceiveRemote>()
            if (!receive.email.isValidEmail()) {
                call.respond(HttpStatusCode.BadRequest, "Email is not valid")
                return@post
            }


            if (InMemory.userList.map { it.login }.contains(receive.login)) {
                call.respond(HttpStatusCode.BadRequest, "User with ${receive.login} login already exist")
                return@post
            } else {
                val (login, email, password) = receive
                InMemory.userList.add(RegisterReceiveRemote(login, email, password))
                val token = UUID.randomUUID().toString()
                call.respond(RegisterResponseRemote(token))
                return@post

            }
        }
    }
}
