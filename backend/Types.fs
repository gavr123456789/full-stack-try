namespace Types

type Todo =
  { Id: string
    Text: string
    Done: bool }

type TodoCriteria = | All

type TodoSave = Todo -> Todo

type TodoFind = TodoCriteria -> Todo []
