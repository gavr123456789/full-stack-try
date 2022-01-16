import prologue
import nimongo.mongo 
import tables


type MongoCollections* = object
  users*: Collection[mongo.Mongo]
  tasks*: Collection[mongo.Mongo]


type
  MongoContext* = ref object of Context
    data*: int
    collections*: MongoCollections



  UserDto* = object 
    # id*: string
    name*: string
    login*: string
    password*: string

  InMemoryContext* = ref object of Context
    data*: int
    collection*: Table[string, UserDto] # name to user


