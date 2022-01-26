import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useStore } from "effector-react";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Login } from "../features/Login/Login";
import { $counter } from "../features/Counter";
import { MenuComponent } from "./layout/menu";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const Was = (counter: number) => {
  return (
    <>
      <h1>Home</h1>
      <p>Current count: {counter}</p>
      <Link to="/count">Go to count page</Link>
    </>
  );
};

const Home: FC = (): JSX.Element => {
  const counter = useStore($counter);

  const onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    // this.setState({ collapsed });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={false} onCollapse={onCollapse}>
        <div className="logo" />
        <MenuComponent />
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Bill is a cat.
            <Login></Login>
            {/* <Link to="count">Expenses</Link> */}
            <Outlet />
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Home;
