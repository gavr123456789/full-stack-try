import prologue
import nimongo/bson
import nimongo/mongo 
import ./types
import jsony
import mongoUtils

# Old realization, need update

# temp https://github.com/planety/prologue/issues/149

discard getMongoUsersCollection()


proc findPerson*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = MongoContext(ctx)
    nameParam = ctx.getPathParams("name")
    finded = ctx.collections.users.find(bson.`%*`({"name": nameParam})).all()
  
  if finded.len != 0:
    resp $finded
  else: 
    resp "not found"


proc savePerson*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = MongoContext(ctx)
    body = ctx.request.body
    user = body.fromJson(PersonDto)
    bsonUser = bson.`%*`({"name": user.name, "age": user.age})
    finded = ctx.collections.users.find(bson.`%*`({"name": user.name})).all()

  if finded.len == 0:
    let x = ctx.collections.users.insert(bsonUser)
    if x.ok: resp "created"

  else:
    if ctx.collections.users.update(finded[0], bsonUser, false, false).ok:
      resp "updated"


proc deletePerson*(ctx: Context) {.gcsafe, async.} = 
  let ctx = MongoContext(ctx)
  let nameParam = ctx.getPathParams("name")
  ctx.collections.users.remove bson.`%*` {"name": nameParam}
  resp "sas"



proc login*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = MongoContext(ctx)
    body = ctx.request.body
    user = body.fromJson(PersonDto)
    bsonUser = bson.`%*`({"name": user.name})
    finded = ctx.collections.users.find(bsonUser).all()


  if finded.len != 0:
    ctx.response.code = Http200
    ctx.response.body = "logined"
    resp ctx.response
  else:
    ctx.response.code = Http401
    ctx.response.body = "User not found"
    resp ctx.response
