import prologue
import ./types
import ./mongoUtils
# import prologue/middlewares/cors
import tables
const inMemory = false
when inMemory:
  import ./inMemoryViews
  method extend(ctx: InMemoryContext) =
    echo "extend!!!"
    ctx.data = 999
    # ctx.collection = TableRef[string, UserDto]()    
    ctx.collection = {"1": UserDto(name: "1", login: "login", password: "123123")}.newTable    

else:
  import ./mongoViews
  method extend(ctx: MongoContext) =
    ctx.data = 999
    ctx.collections = getMongoUsersCollection()

# initialize data



let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "Prologue"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8080)),
    secretKey = env.getOrDefault("secretKey", "")
  )


var app = newApp(settings = settings)


app.get("/user/{name}", findUser)
app.post("/user/create", saveUser)
app.post("/login", login)
app.delete("/user/{name}", deleteUser)
when inMemory:
  app.run(InMemoryContext)
else:
  app.run(MongoContext)
