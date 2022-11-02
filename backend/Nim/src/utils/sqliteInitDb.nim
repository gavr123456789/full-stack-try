import std/[db_sqlite]
import ../consts
import std/with
import std/os

const 
  DROP_PERSONS_IF_EXISTR = 
    sql"DROP TABLE IF EXISTS persons"
  CREATE_PERSONS = 
    sql"""CREATE TABLE persons (
        id   INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age smallint NOT NULL 
      )"""
  CREATE_INDEX_ON_PERSONS_NAME = 
    sql"CREATE unique index indx_name on persons (name)"
  FILL_WITH_MOCK = 
    sql"insert into persons (name, age) values('sas sasov', 42)"

proc createSqliteDbIfNotExist*() =
  let isDbExist = fileExists PATH_TO_SQLITE_DB

  if not isDbExist:
    let db = open(PATH_TO_SQLITE_DB, "", "", "")

    with(db):
      exec(DROP_PERSONS_IF_EXISTR)
      exec(CREATE_PERSONS)
      exec(CREATE_INDEX_ON_PERSONS_NAME)
      exec(FILL_WITH_MOCK)
