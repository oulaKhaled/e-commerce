import React, { useEffect } from "react";
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
import { useContext } from "react";
import OrderContext from "../context/orderContext";
function Home(){
const  BASE_URL="http://127.0.0.1:8000/app";

const [datafromHeader,setDatafromHeader]=useState("")

const {getOrder}=useContext(OrderContext);
const handelData=(data)=>{
  setDatafromHeader(data)
}





return (<div style={{width:"auto"}}>
    <Header sendDataToHome={handelData}/>



    <br/>

    
    {/* <div style={{backgroundColor:"#C9CCD5",  position: "relative",
  width:"100%",
  height:"400px",

  bottom:"0"
 

  
  }}>
  <Row>
<Col>
  <Image src={Myimage} roundedCircle style={{height:"300px",margin:"20px"}}/>
</Col>
<Col>
<h1 >   About Us</h1>
</Col>
   </Row> </div> */}
 {/* Book Section */}
 
 <div className="book-div">
 
<Books books={datafromHeader}/>


 </div>
 
 
 
 
 
 
 <Footer/>
 
 
    </div>);



}

export default Home;

