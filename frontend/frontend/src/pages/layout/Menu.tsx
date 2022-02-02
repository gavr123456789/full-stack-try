import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const menuLinkList = ["count", "todos"]


export const MenuComponent: FC = () => {

  const location = useLocation()
  console.log("current link = ", location.pathname)
  const [defaultSelected, setDefaultSelected] = useState("1")
  useEffect(() => {
    for (const link of menuLinkList) 
      if (location.pathname.includes(link)) 
        setDefaultSelected(link)
  }, [location.pathname])
  return (
    <Menu theme="dark" defaultSelectedKeys={[defaultSelected]} mode="inline">

      <Menu.Item  key="1" icon={<PieChartOutlined />}>
        <NavLink to="verstkatests">Verstka test</NavLink>
      </Menu.Item>

      <Menu.Item key="2" icon={<DesktopOutlined />}>
      <NavLink to="dela">Dela</NavLink>

      </Menu.Item>

      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>

      <SubMenu key="sub2" icon={<TeamOutlined />} title="Effector tests">
        <Menu.Item key="count">
          <NavLink to="count">Count</NavLink>
        </Menu.Item>
        <Menu.Item key="todos">
          <NavLink to="todos">Todo list</NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="9" icon={<FileOutlined />}>
        Files
      </Menu.Item>
    </Menu>
  );
};
