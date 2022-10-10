import std/[db_sqlite]
import strUtils
import prologue
import jsony
import types


const PATH_TO_DB = "data/data.sqlite"

# type Person = object 
#   first_name: string
#   last_name: string
#   age: int

var db {. threadVar .}: DBConn

proc initThreadVar(): DBConn = 
  db = open(PATH_TO_DB, "", "", "")
  result = db


### Service

proc findUser*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
    nameParam = ctx.getPathParams("name")

    row = db.getRow(
      sql"SELECT login, password FROM users WHERE name = ?",
      nameParam
    )
    user = UserDto(name: nameParam, login: row[0], password: row[1]) 
  db.close()

  if user.login.len != 0:
    resp `$` %*user
  else:
    ctx.response.code = Http404
    ctx.response.body = "User not found"
    resp ctx.response


proc login*(ctx: Context) {.gcsafe, async.} =
  echo "login"
  resp "login"

proc deleteUser*(ctx: Context) {.gcsafe, async.} =
  echo "deleteUser"
  resp "deleteUser"

proc saveUser*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
    body = ctx.request.body
    user = body.fromJson(UserDto)
    id = db.tryInsertId( 
      sql"insert into users (name, login, password) values(?, ?, ?);",  
      user.name, user.login, user.password
    )
  echo "saved id: ", id
  db.close()

proc getAllUsers*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
  var result: seq[UserDto] = @[]
  for x in db.fastRows(sql"SELECT * FROM users"):
    assert(x.len == 4)
    result.add UserDto(name: x[1],login: x[2], password: x[3])
  if result.len > 0:
    ctx.response.code = Http200
    ctx.response.body = `$` %*result
    resp ctx.response
  else:
    ctx.response.code = Http404
    ctx.response.body = "Users not found"
    resp ctx.response
  db.close()

### DB utils
# proc getAllPersons(): seq[Person] =
#   let db = initThreadVar()
#   for x in db.fastRows(sql"SELECT * FROM persons"):
#     assert(x.len == 4)
#     result.add Person(first_name: x[1],last_name: x[2], age: parseInt(x[3]))
#   db.close()


# proc insertPerson(person: Person): int64 =
#   let db = initThreadVar()
#   result = db.tryInsertId(
#     sql"insert into persons (first_name, last_name, age) values(?, ?, ?);", 
#     person.first_name, person.last_name, person.age
#   )
#   db.close()




