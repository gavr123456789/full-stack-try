package com.example.dao

import org.jetbrains.exposed.dao.id.IntIdTable

object Persons: IntIdTable() {
    val name = text("name")
    val nick = text("nick").uniqueIndex()
    val age = integer("age")
}