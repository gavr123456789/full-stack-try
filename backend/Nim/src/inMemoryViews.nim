import std/[tables, strformat]
import prologue
import ./types
import jsony

var inMemoryTable {. threadVar .}: TableRef[string, UserDto]

proc initThreadVar(): TableRef[string, UserDto] = 
  if inMemoryTable == nil:
    echo "thread var is nil, initialization..."
    inMemoryTable = {"1": UserDto(name: "1", login: "login", password: "123123")}.newTable 
    return inMemoryTable
  else:
    echo "thread var not nil"

    return inMemoryTable

proc findUser*(ctx: Context) {.gcsafe, async.} = 
  # let ctx = InMemoryContext(ctx)
  let collection = initThreadVar()
  let nameParam = ctx.getPathParams("name")
  let finded = collection.getOrDefault(nameParam) #ctx.collection.findUser(bson.`%*`({"name": nameParam})).all()
  
  
  if finded.name != "":
    resp $finded
  else: 
    resp "not found"

proc saveUser*(ctx: Context) {.gcsafe, async.} = 
  let 
    # ctx = InMemoryContext(ctx)
    body = ctx.request.body
    user = body.fromJson(UserDto)
  var 
    collection = initThreadVar()
  
  collection[user.name] = user


  resp &"created/updated in memory, collection = {collection}"


proc deleteUser*(ctx: Context) {.gcsafe, async.} = 
  let ctx = InMemoryContext(ctx)
  # var collection = ctx.collection
  let nameParam = ctx.getPathParams("name")

  echo "deleteUser, current collection = ", ctx.collection
  echo "nameParam != '' = ", nameParam != ""
  echo "collection.contains nameParam = ", ctx.collection.contains nameParam


  if nameParam != "" and ctx.collection.contains nameParam:
    ctx.collection.del nameParam
    resp &"{nameParam} deleteUser"
  else:
    resp &"{nameParam} not found, collection = {ctx.collection}"


proc login*(ctx: Context) {.gcsafe, async.} =
  echo "sas"
  resp "login"
