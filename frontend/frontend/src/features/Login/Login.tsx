import { Form, Input, Button, Checkbox } from 'antd';
import { FC } from 'react';
import { LoginDto } from '../../api/login/dto';
import { loginFx } from './model';

export const Login: FC = () => {
  const onFinish = (loginDto: LoginDto) => {
    console.log('Success:', loginDto);
    
    loginFx(loginDto)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onSubmitCapture={(e: any) => e.preventDefault()}
    
      // onSubmit={(e: any) => e.preventDefault()}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='horizontal'
      style={{width: "300px"}}
    >
      <Form.Item
        label="Login"
        name="login"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};