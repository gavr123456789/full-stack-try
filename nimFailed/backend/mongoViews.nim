import prologue
import nimongo/bson
import nimongo.mongo 
# import asyncdispatch

var
  m: mongo.Mongo = newMongoWithURI("mongodb://sas:sas@localhost:27017/test")
  # mBase: MongoBase = m.slaveOk(true).allowPartial(false)


var collection {.threadvar.} : Collection[mongo.Mongo] 
collection = m["test"]["users2"]



discard m.connect()
# let sas2 = collection.find( bson.`%*`({"name": "qwe"})).all()
# echo m["test"].listCollections()
# echo "sas2 = ", sas2


proc getUserByNameMongo*(ctx: Context) {.gcsafe, async.} = 
  let nameParam = ctx.getPathParams("name")
  echo "nameParam = ", nameParam

  let sas = collection.find(bson.`%*`({"name": nameParam})).all()
  echo sas
  # collection.insert( bson.`%*`({"name": nameParam}))
  # if not sas.isNil:
    # echo "sas.isNil: ", sas.isNil
    # echo sas.count
  # echo "result = ", sas

  resp $sas