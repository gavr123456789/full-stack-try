import React, { FC } from "react";

interface LayoutProps {
  children: JSX.Element;
}


const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
  return <div >{children}</div>;
};

export default Layout;
