import { PlusCircleFilled } from "@ant-design/icons";
import { Form, Input, Button, Row, Col, List } from "antd";
import { FC } from "react"
import { TodoItemDto } from "./types"

interface AddTodoFormProps {
  onTodoAdd: (todo: TodoItemDto) => void
}

export const AddTodoForm: FC<AddTodoFormProps> = ({ onTodoAdd: onAddTodo }) => {

  const onFinish = (x: { taskName: string }) => {
    onAddTodo({ done: false, name: x.taskName })
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"

    >
      <List.Item
        style={{ display: "flex", justifyContent: "space-between" }}
        actions={[
          <Form.Item >
            <Button type="primary" htmlType="submit" shape="circle">
              <PlusCircleFilled />
            </Button>
          </Form.Item>
        ]}
      >
        <Form.Item
          label=""
          name="taskName"
          rules={[{ required: true, message: "Input task name!" }]}
        >
          <Input />
        </Form.Item>



      </List.Item>
    </Form>
  );

}