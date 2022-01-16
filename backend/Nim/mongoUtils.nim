import nimongo/bson
import nimongo.mongo 
import ./types


proc getMongoUsersCollection*(): MongoCollections = 
  var
    m: mongo.Mongo = newMongoWithURI("mongodb://sas:sas@localhost:27017/test")
    # mBase: MongoBase = m.slaveOk(true).allowPartial(false)

  discard m.connect()

  result.users =  m["test"]["users"]
  result.tasks =  m["test"]["tasks"]


