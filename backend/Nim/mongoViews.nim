import prologue
import nimongo/bson
import nimongo/mongo 
import ./types
import jsony

proc find*(ctx: Context) {.gcsafe, async.} = 
  let ctx = MongoContext(ctx)
  let nameParam = ctx.getPathParams("name")
  let finded = ctx.collections.users.find(bson.`%*`({"name": nameParam})).all()
  if finded.len != 0:
    resp $finded
  else: 
    resp "not found"

proc save*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = MongoContext(ctx)
    body = ctx.request.body
    user = body.fromJson(UserDto)
    bsonUser = bson.`%*`({"name": user.name, "login": user.login, "password": user.password})
    finded = ctx.collections.users.find(bson.`%*`({"name": user.name})).all()

  if finded.len == 0:
    let x = ctx.collections.users.insert(bsonUser)
    if x.ok: resp "created"

  else:
    if ctx.collections.users.update(finded[0], bsonUser, false, false).ok:
      resp "updated"

proc delete*(ctx: Context) {.gcsafe, async.} = 
  let ctx = MongoContext(ctx)
  let nameParam = ctx.getPathParams("name")
  ctx.collections.users.remove bson.`%*` {"name": nameParam}
  resp "sas"

proc login*(ctx: Context) {.gcsafe, async.} = 
  let 
    ctx = MongoContext(ctx)
    body = ctx.request.body
    user = body.fromJson(UserDto)
    bsonUser = bson.`%*`({"login": user.login, "password": user.password})
    finded = ctx.collections.users.find(bsonUser).all()


  if finded.len != 0:
    ctx.response.code = Http200
    ctx.response.body = "logined"
    resp ctx.response
  else:
    ctx.response.code = Http401
    ctx.response.body = "User not found"
    resp ctx.response
