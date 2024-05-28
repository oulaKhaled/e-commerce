import React from "react";
import { Route,Routes } from "react-router-dom";

import Home from "./components/Home";
import AuthPage from "./components/authPage";
import Cart from "./components/Cart";
import Checkout from "./components/checkout";
function App() {
  
  return (
    <>
      
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/auth" element={<AuthPage/>}/>
   
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<Checkout/>}/>
   
   </Routes>
 
   </>
  );
}

export default App;
