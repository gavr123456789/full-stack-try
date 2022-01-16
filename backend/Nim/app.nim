import prologue

import ./mongoViews
import ./types
import ./mongoUtils

# initialize data
method extend(ctx: MongoContext) =
  ctx.data = 999
  ctx.collections = getMongoUsersCollection()


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
app.post("/user/create", save)
app.delete("/user/{name}", delete)

app.run(MongoContext)
