package com.example.features.persons

import com.example.dao.DAOFacadeDatabase
import com.example.model.PersonDTO
import com.example.model.RemovePersonsDTO
import com.example.model.validate
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.exceptions.ExposedSQLException

inline fun <T> T?.ifNotNullDo(block: (T) -> Unit): T? {

    if (this != null) {
        block(this)
        return this
    }
    return null
}

fun Application.configurePersonsRouting(dao: DAOFacadeDatabase) {
    routing {
        // get all
        get("/persons") {
            val persons = dao.getAllPersons()
            call.respond(persons)
        }
        post("/persons/deleteMany") {
            val ids = call.receive<RemovePersonsDTO>()

            dao.deleteMany(ids)
            call.respond(HttpStatusCode.OK)
        }
        post("/persons/add") {
            val person = call.receive<PersonDTO>()

            person.validate().ifNotNullDo {
                call.respond(HttpStatusCode.BadRequest, it)
            }

            try {
                dao.createPerson(person)
            } catch (e: ExposedSQLException) {
                // can be also null
                if (e.message?.contains("UNIQUE") == true) {
                    call.respond(HttpStatusCode.BadRequest, "Nick must be unique")
                }
            }
            call.respond(HttpStatusCode.Created)
        }
        post("/persons/edit") {
            val person = call.receive<PersonDTO>()
            dao.editPerson(person)
            call.respond(HttpStatusCode.OK)
        }
    }
}