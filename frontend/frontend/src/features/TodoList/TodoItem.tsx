import { FC } from "react";
import { TodoItemDto } from "./types";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface TodoItemProps {
  todo: TodoItemDto;
  onTodoRemoval: (todo: TodoItemDto) => void;
  onTodoToggle: (todo: TodoItemDto) => void;
}

export const TodoItem: FC<TodoItemProps> = ({ onTodoToggle, onTodoRemoval, todo }) => {

  return (
    <List.Item
      style={{display: "flex", justifyContent: "space-between"}}
      actions={[
        <Tooltip title={todo.done ? 'Mark as uncompleted' : 'Mark as completed'}>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.done}
          />
        </Tooltip>,

        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger shape="circle">
            <CloseCircleOutlined />
          </Button>
        </Popconfirm>,

      ]}
    >

      <Tag color={todo.done ? 'cyan' : 'red'} style={{margin: 10, maxWidth: 115, wordBreak: "break-all"}}>
        {todo.name}
      </Tag>
    </List.Item>
  )
}