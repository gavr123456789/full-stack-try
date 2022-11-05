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
        nick TEXT NOT NULL UNIQUE,
        age smallint NOT NULL 
      )"""
  CREATE_TASKS = 
    sql"""CREATE TABLE tasks (
        id   INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        status smallint NOT NULL 
        created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (list_id) REFERENCES persons (id),
        ON DELETE CASCADE ON UPDATE CASCADE
      )"""
  CREATE_INDEX_ON_PERSONS_NAME = 
    sql"CREATE unique index indx_nick on persons (nick)"
  FILL_WITH_MOCK = 
    sql"insert into persons (name, nick, age) values('sas sasov', 'sas', 42)"

proc createSqliteDbIfNotExist*() =
  let isDbExist = fileExists PATH_TO_SQLITE_DB

  if not isDbExist:
    let db = open(PATH_TO_SQLITE_DB, "", "", "")

    with(db):
      exec(DROP_PERSONS_IF_EXISTR)
      exec(CREATE_PERSONS)
      exec(CREATE_TASKS)
      exec(CREATE_INDEX_ON_PERSONS_NAME)
      exec(FILL_WITH_MOCK)
