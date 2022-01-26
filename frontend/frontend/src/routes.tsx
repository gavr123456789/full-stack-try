import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

import Home from "./pages/Home";
import { Counter } from "./features/Counter";
import { LoginPage } from "./pages/Login";
import { BrowserHistory, createBrowserHistory } from "history";
import { createStore } from "effector";
import { appStarted } from "./system-events";

export default (
  <Routes >
    <Route path="/" element={<LoginPage />} />
    <Route path="/home" element={<Home />} >
      <Route path="count" element={<Counter />} />
    </Route>
   
    <Route path="*" element={<NotFound />} />
  </Routes>
);

