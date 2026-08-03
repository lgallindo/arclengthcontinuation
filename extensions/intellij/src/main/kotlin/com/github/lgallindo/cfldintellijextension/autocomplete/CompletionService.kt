package com.github.lgallindo.cfldintellijextension.autocomplete


interface CompletionService {

    suspend fun getAutocomplete(uuid: String, url: String, line: Int, column: Int): String?

    fun acceptAutocomplete(uuid: String?)

}