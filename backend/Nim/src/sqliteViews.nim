import std/[db_sqlite]
import strUtils
import prologue
import jsony
import types
import consts
import std/strformat

type RowsToDelete = object
  rowsIds: seq[int]

var db {. threadVar .}: DBConn

proc initThreadVar(): DBConn = 
  db = open(PATH_TO_SQLITE_DB, "", "", "")
  result = db



proc findPerson*(ctx: Context) {.gcsafe, async.} =
  const findSql = sql"SELECT name, age FROM persons WHERE nick = ?"
  let 
    db = initThreadVar()
    nickParam = ctx.getPathParams("nick")
    row = db.getRow(
      findSql,
      nickParam
    )
    person = PersonDto(name: row[0], nick: nickParam, age: row[1].parseInt) 
  db.close()

  if person.age != 0:
    resp `$` %*person
  else:
    ctx.response.code = Http404
    ctx.response.body = "person not found"
    resp ctx.response

# for future
proc login*(ctx: Context) {.gcsafe, async.} =
  echo "login"
  resp "login"

proc deletePerson*(ctx: Context) {.gcsafe, async.} =
  const deleteSql = sql"delete from persons where id = ?"
  let 
    db = initThreadVar()
    nameParam = ctx.getPathParams("id")
  echo "delete id = ", nameParam
    
  db.exec(deleteSql, nameParam)
  db.close()

proc deletePersons*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
    body = ctx.request.body
    rowsIds = body.fromJson(RowsToDelete).rowsIds.join(", ")
    deleteSql = "delete from persons where id in ({rowsIds})".fmt.sql
  echo "delete id = ", rowsIds
    
  db.exec(deleteSql)
  db.close()

proc savePerson*(ctx: Context) {.gcsafe, async.} =
  const insertSql = sql"insert into persons (name, nick, age) values(?, ?, ?);"
  let 
    db = initThreadVar()
    body = ctx.request.body
    person = body.fromJson(PersonDto)
    id = db.tryInsertId( 
      insertSql,  
      person.name, person.nick, person.age
    )
  echo "saved id: ", id
  db.close()
  if id != -1:
    resp $id
  else:
    resp "Error when save new person, may be its nick not unique"


proc getAllPersons*(ctx: Context) {.gcsafe, async.} =
  let 
    db = initThreadVar()
  var result: seq[PersonDto] = @[]
  for x in db.fastRows(sql"SELECT * FROM persons order by id"):
    assert(x.len == 4)
    result.add PersonDto(id: x[0].parseInt, name: x[1], nick: x[2], age: x[3].parseInt)
  if result.len > 0:
    ctx.response.code = Http200
    ctx.response.body = `$` %*result
    resp ctx.response
  else:
    ctx.response.code = Http404
    ctx.response.body = "persons not found"
    resp ctx.response
  db.close()


