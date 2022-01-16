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
  let ctx = MongoContext(ctx)
  let body = ctx.request.body
  let user = body.fromJson(UserDto)
  let bsonUser = bson.`%*`({"name": user.name, "login": user.login, "password": user.password})
  let finded = ctx.collections.users.find(bson.`%*`({"name": user.name})).all()

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