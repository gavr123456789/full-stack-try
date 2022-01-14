import prologue
import nimongo.mongo 

type
  UserContext* = ref object of Context
    data*: int
    collection*: Collection[mongo.Mongo]
