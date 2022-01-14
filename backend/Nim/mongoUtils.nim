import nimongo/bson
import nimongo.mongo 


proc getMongoCollection*(): Collection[mongo.Mongo] = 
  var
    m: mongo.Mongo = newMongoWithURI("mongodb://sas:sas@localhost:27017/test")
    # mBase: MongoBase = m.slaveOk(true).allowPartial(false)

  discard m.connect()

  result =  m["test"]["users2"]


