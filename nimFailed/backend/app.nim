import prologue

import ./urls
import ./views
import ./mongoViews

let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "Prologue"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8080)),
    secretKey = env.getOrDefault("secretKey", "")
  )


var app = newApp(settings = settings)

app.get("/hello", helloGet) 
app.get("/user/{name}", getUserByNameMongo)
app.get("/json", jsonGet)
app.post("/posttest", testPost)

app.run()
