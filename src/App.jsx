import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";

export default function App() {
 
  return (
    
    <div>
      <main>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </main>
    </div>
  );
}