package com.example

import com.example.dao.DatabaseSQLImpl
import com.example.features.login.configureLoginRouting
import com.example.features.persons.configurePersonsRouting
import com.example.features.register.configureRegisterRouting
import com.example.plugins.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.callloging.*
import org.jetbrains.exposed.sql.*
import org.slf4j.event.*

const val DB_PATH = "data/data.sqlite"


fun main() {
    val db = Database.connect("jdbc:sqlite:$DB_PATH", driver = "org.sqlite.JDBC")
    val dao = DatabaseSQLImpl(db)
    dao.init()

    embeddedServer(Netty, port = 8081, host = "0.0.0.0") {
        install(CallLogging) {
            level = Level.INFO
//            filter { call -> call.request.path().startsWith("/") }
        }
        configureLoginRouting()
        configureRegisterRouting()
        configurePersonsRouting(dao)

        configureSerialization()
    }.start(wait = true)
}
