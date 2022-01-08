open System
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.DependencyInjection
open Giraffe
open Todos.Http
open Types
open Todos
open InMemory
open System.Collections

let routes = choose [ TodoHttp.handlers ]

let configureApp (app: IApplicationBuilder) = app.UseGiraffe routes

let configureServices (services: IServiceCollection) =
  let inMemory = Hashtable()

  services
    .AddGiraffe()
    .AddTodoInMemory(inMemory)
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
