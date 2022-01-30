import { List, Space } from "antd";
import { FC } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";
import { TodoItemDto } from "./types";


interface TodoListProps {
  todos: TodoItemDto[];
  onTodoRemoval: (todo: TodoItemDto) => void;
  onTodoToggle: (todo: TodoItemDto) => void;
  onTodoAdd: (todo: TodoItemDto) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, onTodoRemoval, onTodoToggle, onTodoAdd }) => {

  return (
    <Space  direction="vertical" >
      <AddTodoForm onTodoAdd={onTodoAdd} />
      <List
        dataSource={todos}
        renderItem={todo => (
          <TodoItem todo={todo} onTodoRemoval={onTodoRemoval} onTodoToggle={onTodoToggle} />
        )}
        pagination={{
          position: 'bottom',
          pageSize: 10,
        }}

      />
    </Space>



  )
}