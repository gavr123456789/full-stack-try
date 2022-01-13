import prologue
import nimongo/bson
import nimongo/mongo 
import ./types


proc find*(ctx: Context) {.gcsafe, async.} = 
  let ctx = UserContext(ctx)
  let nameParam = ctx.getPathParams("name")
  let finded = ctx.collection.find(bson.`%*`({"name": nameParam})).oneOrNone()
  if not finded.isNil:
    resp $finded
  else: 
    resp "not found"

proc save*(ctx: Context) {.gcsafe, async.} = 
  let ctx = UserContext(ctx)
  let nameParam = ctx.getPathParams("name")
  let finded = ctx.collection.find(bson.`%*`({"name": nameParam})).all()

  if finded.len == 0:
    let x = ctx.collection.insert( bson.`%*`({"name": nameParam}))
    if x.ok: resp "created"

  else:
    if ctx.collection.update(finded[0], bson.`%*`({"name": nameParam}), false, false).ok:
      resp "updated"

proc delete*(ctx: Context) {.gcsafe, async.} = 
  let ctx = UserContext(ctx)
  let nameParam = ctx.getPathParams("name")
  ctx.collection.remove bson.`%*` {"name": nameParam}
  resp "sas"