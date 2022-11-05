import prologue
import ./types
import ./mongoUtils
# import prologue/middlewares/cors
import tables
import std/with

type DbType = enum 
  inMemory, sqlite, mongo

const dbType = sqlite

when dbType == inMemory:
  import ./inMemoryViews
  method extend(ctx: InMemoryContext) =
    ctx.data = 999
    # ctx.collection = TableRef[string, PersonDto]()    
    ctx.collection = {"1": PersonDto(name: "sas", age: 1)}.newTable    

elif dbType == sqlite:
  import ./sqliteViews
  import utils/sqliteInitDb
  createSqliteDbIfNotExist()

else:
  import ./mongoViews
  method extend(ctx: MongoContext) =
    ctx.data = 999
    ctx.collections = getMongoUsersCollection()


let
  env = loadPrologueEnv(".env")
  settings = newSettings(
    appName = env.getOrDefault("appName", "Prologue"),
    debug = env.getOrDefault("debug", true),
    port = Port(env.getOrDefault("port", 8081)),
    secretKey = env.getOrDefault("secretKey", "2323")
  )


var app = newApp(settings = settings)

with app:
  get("/person/{nick}", findPerson)
  get("/getAllPersons", getAllPersons)
  post("/person/add", savePerson)
  post("/login", login)
  delete("/person/{nick}", deletePerson)
when dbType == inMemory:
  app.run(InMemoryContext)
else:
  app.run(MongoContext)
