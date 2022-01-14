import prologue

import ./mongoViews
import ./types
import ./mongoUtils

# initialize data
method extend(ctx: UserContext) =
  ctx.data = 999
  ctx.collection = getMongoCollection()


let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "Prologue"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8080)),
    secretKey = env.getOrDefault("secretKey", "")
  )


var app = newApp(settings = settings)

app.get("/user/{name}", find)
app.post("/user/{name}", save)
app.delete("/user/{name}", delete)

app.run(UserContext)
