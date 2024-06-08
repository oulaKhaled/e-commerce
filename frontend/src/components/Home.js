import React from "react";
import { GiBookshelf } from "react-icons/gi";
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import Footer from "./Footer";
import Books from "./Books";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import img from '../images/slider-img.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './../../src/App.css';
function Home(){
const  BASE_URL="http://127.0.0.1:8000/app";


function HandelClick(){
  fetch( "http://127.0.0.1:8000/app/book/",{
    method:"GET",

  })
}



return (<div style={{width:"auto"}}>
    <Header/>



    <br/>
    <h1 style={{paddingBottom:"40px",fontFamily:"Bebas Neue",paddingLeft:"10px"}}> Welcome to Bookstore</h1>
    <div style={{backgroundColor:"#153448",  position: "relative",
  width:"100%",
  height:"auto",

  bottom:"0"
 

  
  }}>
<h1>  About Us</h1>

    </div>
 {/* Book Section */}
 
 <div className="book-div">
 
<Books/>


 </div>
 
 
 
 
 
 
 <Footer/>
 
 
    </div>);



}

export default Home;

