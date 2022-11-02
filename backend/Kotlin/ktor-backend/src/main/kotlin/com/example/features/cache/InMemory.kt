package com.example.features.cache

import com.example.features.register.RegisterReceiveRemote

data class TokenCache(
    val login: String,
    val token: String
 )


object InMemory {
    val userList = mutableListOf<RegisterReceiveRemote>()
    val tokens = mutableListOf<TokenCache>()
}