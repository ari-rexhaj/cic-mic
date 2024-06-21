import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Local from "./pages/local/Local.js";
import Home from "./pages/home/Home.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/local" element={<Local/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
