import React from "react";
import { GiBookshelf } from "react-icons/gi";
import Button from 'react-bootstrap/Button';
import Header from "./Header";
import Footer from "./Footer";
import Books from "./Books";
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Myimage from '../images/book-image.jpg';
import img from '../images/slider-img.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './../../src/App.css';
function Home(){
const  BASE_URL="http://127.0.0.1:8000/app";

const [datafromHeader,setDatafromHeader]=useState("")


const handelData=(data)=>{
  setDatafromHeader(data)
}

return (<div style={{width:"auto"}}>
    <Header sendDataToHome={handelData}/>



    <br/>
    <h1 style={{paddingBottom:"40px",fontFamily:"Bebas Neue",paddingLeft:"10px"}}> Welcome to Bookstore</h1>
    <div style={{backgroundColor:"#153448",  position: "relative",
  width:"100%",
  height:"auto",

  bottom:"0"
 

  
  }}>
<h1 style={{color:"#ffff"}}>   About Us</h1>
<Row>
<Col>
<Image src={Myimage} roundedCircle  style={{margin:"10px"}}/></Col>
<Col>
<p style={{color:"#ffff"}}>Lorem ipsum dolor sit amet,
 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet,
</p>
  <p style={{color:"#ffff"}}>Lorem ipsum dolor sit amet,
 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet,
</p>
</Col>
<br/>
<Col>
<p style={{color:"#ffff"}}>Lorem ipsum dolor sit amet,
 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet,
</p>
  <p style={{color:"#ffff"}}>Lorem ipsum dolor sit amet,
 consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
   exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
   Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet,
</p>
</Col>
   </Row> </div>
 {/* Book Section */}
 
 <div className="book-div">
 
<Books books={datafromHeader}/>


 </div>
 
 
 
 
 
 
 <Footer/>
 
 
    </div>);



}

export default Home;

