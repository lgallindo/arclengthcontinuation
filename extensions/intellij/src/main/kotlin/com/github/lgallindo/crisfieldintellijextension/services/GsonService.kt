package com.github.lgallindo.crisfieldintellijextension.services

import com.google.gson.Gson
import com.intellij.openapi.components.Service

@Service(Service.Level.APP)
class GsonService {
    val gson: Gson = Gson()
}
