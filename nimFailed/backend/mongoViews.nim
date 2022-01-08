import nimongo.bson  ## MongoDB BSON serialization/deserialization
import nimongo.mongo ## MongoDB client
import prologue



var
  m: mongo.Mongo = newMongoWithURI("mongodb://sas:sas@localhost:27017/test")
  mBase: MongoBase = m.slaveOk(true).allowPartial(false)


var collection {.threadvar.} : Collection[mongo.Mongo] 
collection = m["test"]["users2"]


proc getUserByNameMongo*(ctx: Context) {.async gcsafe.} = 
  let nameParam = ctx.getPathParams("name")
  echo "nameParam = ", nameParam

  let sas = collection.find( bson.`%*`({"name": nameParam}) )
  if not sas.isNil:
    echo "sas.isNil: ", sas.isNil
    echo sas.count
  resp "sas"