import std/[tables, strformat]
import prologue
import ./types
import jsony

proc find*(ctx: Context) {.gcsafe, async.} = 
  let ctx = InMemoryContext(ctx)
  let nameParam = ctx.getPathParams("name")
  let finded = ctx.collection.getOrDefault(nameParam)#ctx.collection.find(bson.`%*`({"name": nameParam})).all()
  
  
  if finded.name != "":
    resp $finded
  else: 
    resp "not found"

proc save*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = InMemoryContext(ctx)
    body = ctx.request.body
    user = body.fromJson(UserDto)
  var 
    collection = ctx.collection
  
  collection[user.name] = user
  await switch(ctx)


  resp &"created/updated in memory, collection = {collection}"


proc delete*(ctx: Context) {.gcsafe, async.} = 
  let ctx = InMemoryContext(ctx)
  # var collection = ctx.collection
  let nameParam = ctx.getPathParams("name")

  echo "delete, current collection = ", ctx.collection
  echo "nameParam != '' = ", nameParam != ""
  echo "collection.contains nameParam = ", ctx.collection.contains nameParam


  if nameParam != "" and ctx.collection.contains nameParam:
    ctx.collection.del nameParam
    resp &"{nameParam} delete"
  else:
    resp &"{nameParam} not found, collection = {ctx.collection}"


proc login*(ctx: Context) {.gcsafe, async.} =
  echo "sas"
  resp "login"
