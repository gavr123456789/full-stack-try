open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Giraffe
open Todos.Http
open Types
open Todos
open InMemory
open TodoMongoDB
open System.Collections
open MongoDB.Driver

let routes = choose [ TodoHttp.handlers ]

let configureApp (app: IApplicationBuilder) = app.UseGiraffe routes

let configureServices (services: IServiceCollection) =
  // let inMemory = Hashtable()
  let mongoURL = "mongodb://sas:sas@localhost:27017/test" //Environment.GetEnvironmentVariable "MONGO_URL"
  let mongo = MongoClient (mongoURL)
  let db = mongo.GetDatabase "todos"
  let collection = db.GetCollection("todos")

  services.AddGiraffe().AddTodoMongoDB(collection)
  |> ignore


[<EntryPoint>]
let main _ =
  WebHostBuilder()
    .UseKestrel()
    .Configure(Action<IApplicationBuilder> configureApp)
    .ConfigureServices(configureServices)
    .Build()
    .Run()

  0
