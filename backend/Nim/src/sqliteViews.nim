import std/[db_sqlite]
import strUtils
import prologue
import jsony
import types
import consts



# type Person = object 
#   first_name: string
#   last_name: string
#   age: int

var db {. threadVar .}: DBConn

proc initThreadVar(): DBConn = 
  db = open(PATH_TO_SQLITE_DB, "", "", "")
  result = db


### Service

proc findPerson*(ctx: Context) {.gcsafe, async.} =
  const findSql = sql"SELECT age FROM persons WHERE name = ?"
  let 
    db = initThreadVar()
    nameParam = ctx.getPathParams("name")
    row = db.getRow(
      findSql,
      nameParam
    )
    person = PersonDto(name: nameParam, age: row[0].parseInt()) 

  db.close()

  if person.age != 0:
    resp `$` %*person
  else:
    ctx.response.code = Http404
    ctx.response.body = "person not found"
    resp ctx.response


proc login*(ctx: Context) {.gcsafe, async.} =
  echo "login"
  resp "login"

proc deletePerson*(ctx: Context) {.gcsafe, async.} =
  const deleteSql = sql"delete from persons where name = ?"
  let 
    db = initThreadVar()
    nameParam = ctx.getPathParams("name")
    
  db.exec(deleteSql, nameParam)
  db.close()

proc savePerson*(ctx: Context) {.gcsafe, async.} =
  const insertSql = sql"insert into persons (name, age) values(?, ?);"
  let 
    db = initThreadVar()
    body = ctx.request.body
    person = body.fromJson(PersonDto)
    id = db.tryInsertId( 
      insertSql,  
      person.name, person.age
    )
  echo "saved id: ", id
  db.close()
  if id != -1:

    resp $id
  else:
    resp "Error when save new person, may be its name not unique"


proc getAllPersons*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
  var result: seq[PersonDto] = @[]
  for x in db.fastRows(sql"SELECT * FROM persons"):
    assert(x.len == 3)
    result.add PersonDto(id: x[0].parseInt, name: x[1], age: x[2].parseInt)
  if result.len > 0:
    ctx.response.code = Http200
    ctx.response.body = `$` %*result
    resp ctx.response
  else:
    ctx.response.code = Http404
    ctx.response.body = "persons not found"
    resp ctx.response
  db.close()


