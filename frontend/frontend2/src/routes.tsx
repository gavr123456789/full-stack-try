import { RouteObject } from "react-router-dom";

import { DnD } from "./components/Dnd/simpleExample/Dnd";
import Page from "./components/Page";
import Settings from "./components/Settings";
import Example from "./components/Table";
import { PersistentDrawerLeft } from "./SidebarLayout/Sidebar";


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PersistentDrawerLeft />,
    children: [
      {
        path: 'page',
        element: <Page/>
      },
      {
        path: 'settings',
        element: <Settings/>
      },
      {
        path: 'dnd',
        element: <DnD/>
      },
      {
        path: "table",
        element: <Example />
      }
    ]
  }
]