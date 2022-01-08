module Todos.Http.TodoHttp

open Giraffe
open Microsoft.AspNetCore.Http
open Types

let handlers: HttpFunc -> HttpContext -> HttpFuncResult =
  choose [
    POST
    >=> route "/todos"
    >=> fun next context -> text "Create" next context

    GET
    >=> route "/todos"
    >=> fun next context ->
          let find = context.GetService<TodoFind>()
          let todos = find TodoCriteria.All
          json todos next context

    PUT
    >=> routef "/todos/%s" (fun id -> fun next context -> text ("Update " + id) next context)

    //http://0.0.0.0:5000/todos/2
    DELETE
    >=> routef "/todos/%s" (fun id -> fun next context -> text ("Delete " + id) next context)
  ]
