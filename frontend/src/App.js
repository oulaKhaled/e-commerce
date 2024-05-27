import React from "react";
import { Route,Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/LoginPage";
import Register from "./components/Register";
import Cart from "./components/Cart";
function App() {
  
  return (
    <>
      
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/cart" element={<Cart/>}/>
   
   </Routes>
 
   </>
  );
}

export default App;
