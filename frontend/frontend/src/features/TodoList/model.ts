import { createEvent, createStore } from "effector"
import { TodoItemDto } from "./types"

const addTodo = createEvent<string>()
const deleteTodo = createEvent<string>()
const changeName = createEvent<string>()
const doneTodo = createEvent<string>()

// const $input = createStore("")

// P - property
// function changeOneElemOfCollection<T, P>(
//   collection: T[],
//   propertyName: keyof T,
//   newProperty: P,
//   changeFactor: (property: P, obj: T) => boolean,
//   doWithProperty: (property: P) => P
// ): T[] {
//   const result = collection.map(x => 
//     changeFactor(newProperty, x)?
//     {
//       ...x,
//       [propertyName]: doWithProperty(x)
//     } :
//     x 
//   )
//   return result
// }

const $todos = createStore<TodoItemDto[]>([])
  .on(addTodo, (state, addedTodoName) => [...state, { done: false, name: addedTodoName }])
  .on(deleteTodo, (state, deletedName) => state.filter(x => x.name !== deletedName))
  .on(changeName, (state, deletedName) =>
    state.map(x =>
      deletedName === x.name
        ? {
          ...x,
          name: x.name
        }
        : x
    ))
  .on(doneTodo, (state, doneName) =>
    state.map(x =>
      doneName === x.name
        ? {
          ...x,
          done: !x.done
        }
        : x
    ))
  // .on(doneTodo, (state, doneName) =>
  //   produce(state, draftState => {
  //     const todo = draftState.find(x => x.name === doneName)
  //     if (todo) {
  //       todo.done = !todo.done
  //     }
  //   })
  // )


export { addTodo, deleteTodo, changeName, $todos }


