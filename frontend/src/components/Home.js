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

function Home(){
const  BASE_URL="http://127.0.0.1:8000/app";


function HandelClick(){
  fetch( "http://127.0.0.1:8000/app/book/",{
    method:"GET",

  })
}



return (<div>
    <Header/>



    <br/>
    <h1 style={{paddingBottom:"40px",fontFamily:"Bebas Neue",paddingLeft:"10px"}}> Welcome to Bookstore</h1>
    <Carousel data-bs-theme="dark" style={{margin:"10px"}}>
       <Carousel.Item>
      <Row>
         <Col style={{margin:"10px"}}>
       
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <div style={{alignItems:"center"}}>  <p style={{fontWeight:"bold"}}> Keep Track of your favorite Books</p>
       </div>
       <Row>
       <Col>
       <p style={{}}>
       Orginize Your Books Using
       Lists & The reading Log
      
         </p>
       </Col>
       <Col>
       <GiBookshelf size={80}/>
       </Col>
       </Row>
         </div>
         </Col>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> First slide</h2>
         <Row>
       <Col>
       <p style={{}}>
       Orginize Your Books Using
       Lists & The reading Log
      
         </p>
       </Col>
       <Col>
       <GiBookshelf size={70}/>
       </Col>
       </Row>
         </div>
         </Col>
     
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> First slide</h2>
         <Row>
       <Col>
       <p style={{}}>
       Orginize Your Books Using
       Lists & The reading Log
      
         </p>
       </Col>
       <Col>
       <GiBookshelf size={70}/>
       </Col>
       </Row>
         </div>
         </Col>
       
         </Row>
       </Carousel.Item>
       <Carousel.Item>
       <Row>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Seconed slide</h2>
         <Row>
       <Col>
       <p style={{}}>
       Orginize Your Books Using
       Lists & The reading Log
      
         </p>
       </Col>
       <Col>
       <GiBookshelf size={70}/>
       </Col>
       </Row>
         </div>
         </Col>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Seconed slide</h2>
         <p style={{padding:"30px"}}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          
         </p>
         </div>
         </Col>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Seconed slide</h2>
         <p style={{padding:"30px"}} >
         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           
         </p>
         </div>
         </Col>
       
         </Row>
       </Carousel.Item>





       <Carousel.Item>
       <Row>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Third slide</h2>
         <p style={{padding:"30px"}}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           
         </p>
         </div>
         </Col>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Third slide</h2>
         <p style={{padding:"30px"}}>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        
         </p>
         </div>
         </Col>
         <Col style={{margin:"10px"}}>
         <div style={{backgroundColor:"#F6F1E9", borderRadius:"15px"}}>
         <h2> Third slide</h2>
         <p style={{padding:"30px"}} >
         Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           
         </p>
         </div>
         </Col>
       
         </Row>
       </Carousel.Item>
     </Carousel>
 {/* Book Section */}
 
 <div style={{height:"auto", width:"auto", backgroundColor:"#B7B7B7",margin:"50px",left:"250px",
        top:"70px"}}>
 
<Books/>


 </div>
 
 
 
 
 
 
 <Footer/>
 
 
    </div>);



}

export default Home;

