import prologue
import nimongo/bson
import nimongo.mongo 
import ./types


proc getUserByNameMongo*(ctx: Context) {.gcsafe, async.} = 

  let ctx = UserContext(ctx)
  doAssert ctx.data == 999
  echo "data = ", ctx.data

  let nameParam = ctx.getPathParams("name")
  echo "nameParam = ", nameParam

  let sas = ctx.collection.find(bson.`%*`({"name": nameParam})).all()
  echo sas
  # collection.insert( bson.`%*`({"name": nameParam}))

  resp $sas