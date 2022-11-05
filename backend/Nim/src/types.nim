import prologue
import nimongo/mongo 
import tables


type MongoCollections* = object
  users*: Collection[mongo.Mongo]
  tasks*: Collection[mongo.Mongo]

type
  MongoContext* = ref object of Context
    data*: int
    collections*: MongoCollections

  PersonDto* = object 
    name*: string # firstname space lastname
    nick*: string
    age*: int
    id*: int
    

  # PersonDto* = object 
  #   # id*: string
  #   name*: string
  #   login*: string
  #   password*: string

  # TaskDto* = object
  #   name: string

  InMemoryContext* = ref object of Context
    data*: int
    collection*: TableRef[string, PersonDto] # name to user

# post hook for json deserialization
proc postHook*(v: var PersonDto) =
  assert v.name != ""
  assert v.nick != ""
  assert v.age != 0



