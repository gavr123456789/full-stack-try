package com.example.dao

import com.example.model.PersonDTO
import com.example.model.RemovePersonsDTO
import io.ktor.utils.io.core.*

interface DAOFacadeDatabase: Closeable {
    fun init()
    fun createPerson(person: PersonDTO): Int
    fun getAllPersons(): List<PersonDTO>
    fun editPerson(person: PersonDTO)
    fun removePerson(id: Int)
    fun deleteMany(ids: RemovePersonsDTO)
}

