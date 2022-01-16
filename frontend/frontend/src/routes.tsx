import React from "react";
import { Route, Routes } from "react-router-dom";
import { Counter } from "./features";
import NotFound from "./NotFound";

import Home from "./pages/Home";


export default (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/count" element={<Counter />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
