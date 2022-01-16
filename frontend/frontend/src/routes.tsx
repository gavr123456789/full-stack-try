import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";

import Home from "./pages/Home";
import { Counter } from "./features/Counter";
import { LoginPage } from "./pages/Login";


export default (
  <Routes >
    <Route path="/" element={<LoginPage />} />
    <Route path="/count" element={<Counter />} />
    <Route path="/home" element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
