import prologue
import jsony
# import anonimongo
import std/[strformat, strutils, oids, os, sugar]

type User = object
  login: string
  password: string

proc helloGet*(ctx: Context) {.async.} =
  resp "Hello from Nim!"

proc jsonGet*(ctx: Context) {.async.} =
  resp jsonResponse(%* {"name": "Isaac", "books": ["Robot Dreams"]})

proc testPost*(ctx: Context) {.async.} =
  doAssert ctx.request.reqMethod == HttpPost
  
  echo "content type: ", ctx.request.contentType
  echo "post param username = ", ctx.getPostParams("username")
  echo "body = ", ctx.request.body
  let body = ctx.request.body
  let jsonBody = body.fromJson(User)
  echo "parsed json body: ", jsonBody 
  resp ctx.getQueryParams("username")
  # resp jsonResponse(%* {"name": "Isaac", "books": ["Robot Dreams"]})

