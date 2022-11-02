package com.example.features.register

import kotlinx.serialization.Serializable

@Serializable
data class RegisterReceiveRemote(
    val login: String,
    val email: String,
    val password: String
)

data class RegisterResponseRemote(
    val token: String,
)
