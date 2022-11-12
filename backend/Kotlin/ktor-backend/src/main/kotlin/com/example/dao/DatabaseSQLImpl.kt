package com.example.dao

import com.example.DB_PATH
import com.example.model.PersonDTO
import com.example.model.RemovePersonsDTO
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList
import org.jetbrains.exposed.sql.transactions.transaction
import java.io.File

class DatabaseSQLImpl(private val db: Database) : DAOFacadeDatabase {
    override fun init() {
        if (!File(DB_PATH).exists()) {
            transaction(db) {

                SchemaUtils.create(Persons)

                Persons.insert {
                    it[name] = "sas sasov"
                    it[nick] = "sas"
                    it[age] = 1
                } get Persons.id

                println("Persons init: ${Persons.selectAll()}")
            }
        }
    }

    override fun createPerson(person: PersonDTO): Int = transaction(db) {
        Persons.insert {
            it[name] = person.name
            it[nick] = person.nick
            it[age] = person.age
        }.resultedValues?.firstOrNull()?.get(Persons.id)?.value ?: error("No generated key returned")
    }


    override fun getAllPersons(): List<PersonDTO> = transaction(db) {
        Persons
            .selectAll()
            .map {
                PersonDTO(
                    nick = it[Persons.nick],
                    age = it[Persons.age],
                    name = it[Persons.name],
                    id = it[Persons.id].value
                )
            }
    }


    override fun editPerson(person: PersonDTO): Unit = transaction {
        Persons.update({ Persons.id eq person.id }) {
            it[name] = person.name
            it[nick] = person.nick
            it[age] = person.age
        }
    }


    override fun removePerson(id: Int): Unit = transaction {
        Persons.deleteWhere { Persons.id eq id }
    }

    override fun deleteMany(ids: RemovePersonsDTO): Unit = transaction {
        Persons.deleteWhere { Persons.id inList ids.rowsIds }
    }

    override fun close() {
        TODO("Not yet implemented")
    }
}