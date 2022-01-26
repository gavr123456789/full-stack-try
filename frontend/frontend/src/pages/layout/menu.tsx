import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC } from "react";
import { Link } from "react-router-dom";

export const MenuComponent: FC = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="count">Count</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        Option 2
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  );
};
