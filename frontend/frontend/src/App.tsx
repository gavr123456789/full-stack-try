import React, { useState } from "react";
import { FC } from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { NavigateFunction, Navigator, useLocation, useNavigate } from "react-router";
import "./App.css";
import Layout from "./Layout";
import routes from "./routes";
import { createBrowserHistory } from "history";

interface CustomRouterProps {
  basename: string
  children: React.ReactNode,
  navigator: Navigator
}


function App() {
  // const location = useLocation();

  // navigate("/")
  return (
    <BrowserRouter >
      <Layout >{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
