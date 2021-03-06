import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

import Home from "./pages/Home";
import { Counter } from "./features/Counter";
import { LoginPage } from "./pages/Login";
import { TodoList } from "./features/TodoList/TodoList";
import { VerstkaTest } from "./features/VerstkaTests/VerstkaTests";
import { Dela } from "./features/Dela/Dela";

export default (
  <Routes >
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<Home />} >
      <Route path="count" element={<Counter />} />
      <Route path="todos" element={
        <TodoList 
          onTodoAdd={todoName => {console.log("add ", todoName)}}
          onTodoRemoval={todo => {console.log("remove ", todo)}}
          onTodoToggle={todo => {console.log("toggle ", todo)}}  
          todos={[{done: false, name: "sas"}]}
        />
      } 
      />
      <Route path="verstkatests" element={<VerstkaTest />} />
      <Route path="dela" element={<Dela />} />

    </Route>
   
    <Route path="*" element={<NotFound />} />
  </Routes>
);

