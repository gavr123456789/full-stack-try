import std/[tables, strformat]
import prologue
import ./types
import jsony

var inMemoryTable {. threadVar .}: TableRef[string, PersonDto]

const MOCK_NAME = "Sas Sassov"
const MOCK_PERSON = PersonDto(name: MOCK_NAME, age: 1)

proc initThreadVar(): TableRef[string, PersonDto] = 
  if inMemoryTable == nil:
    echo "thread var is nil, initialization..."
    inMemoryTable = {MOCK_NAME: MOCK_PERSON}.newTable 
    return inMemoryTable
  else:
    echo "thread var not nil"

    return inMemoryTable

proc findPerson*(ctx: Context) {.gcsafe, async.} = 
  # let ctx = InMemoryContext(ctx)
  let collection = initThreadVar()
  let nameParam = ctx.getPathParams("name")
  let finded = collection.getOrDefault(nameParam) #ctx.collection.findPerson(bson.`%*`({"name": nameParam})).all()
  
  
  if finded.name != "":
    resp $finded
  else: 
    resp "not found"

proc savePerson*(ctx: Context) {.gcsafe, async.} = 
  let 
    # ctx = InMemoryContext(ctx)
    body = ctx.request.body
    user = body.fromJson(PersonDto)
  var 
    collection = initThreadVar()
  
  collection[user.name] = user


  resp &"created/updated in memory, collection = {collection}"


proc deletePerson*(ctx: Context) {.gcsafe, async.} = 
  let ctx = InMemoryContext(ctx)
  # var collection = ctx.collection
  let nameParam = ctx.getPathParams("name")

  echo "deletePerson, current collection = ", ctx.collection
  echo "nameParam != '' = ", nameParam != ""
  echo "collection.contains nameParam = ", ctx.collection.contains nameParam


  if nameParam != "" and ctx.collection.contains nameParam:
    ctx.collection.del nameParam
    resp &"{nameParam} deletePerson"
  else:
    resp &"{nameParam} not found, collection = {ctx.collection}"


proc login*(ctx: Context) {.gcsafe, async.} =
  echo "sas"
  resp "login"
