package com.example.model

import kotlinx.serialization.Serializable

@Serializable
data class PersonDTO(
    val id: Int,
    val nick: String,
    val name: String,
    val age: Int
)
@Serializable
data class RemovePersonsDTO(
    val rowsIds: List<Int>,
)


fun PersonDTO.validate(): String? {
    if (this.nick.split(" ").size == 2) {
        return "name must contain firstname and lastname separated by space"
    }

    return null
}