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
import img1 from '../images/book_image1.jpg';
import img2 from '../images/book_image2.jpg';
import img3 from '../images/book_image3.jpg';
import img4 from '../images/book-image4.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './../../src/App.css';
import { useContext } from "react";
import OrderContext from "../context/orderContext";
function Home(){
const  BASE_URL="http://127.0.0.1:8000/app";

const [datafromHeader,setDatafromHeader]=useState("")

const {getOrder,createOrder}=useContext(OrderContext);
const handelData=(data)=>{
  setDatafromHeader(data)
}




return (<div style={{width:"100%"}}>
    <Header sendDataToHome={handelData}/>
    <Row><Col><Image roundedCircle style={{width:"310px",marginTop:"20px",marginLeft:"60px"}} src={Myimage}/></Col><Col><h1 style={{position:"relative",right:"28%",marginTop:"5%",fontSize:"80px",top:"20%",fontWeight:"bold"}}>Welcome to BookStore</h1></Col></Row>




    {/* <hr style={{position:"relative",top:"40px"}}/> */}
    <div style={{  backgroundColor:"#152A38",
  width:"100%",
  height:"400px",
      marginTop:"60px",
  bottom:"0",
  marginBottom:"70px"
  }} >

<Row>
 <Col><h1 style={{position:"relative", left:"5%",fontSize:"70px",color:"#ffff",top:"15%"}}>About Us </h1>
 <br/>
 <p style={{padding:"20px",margin:"10px",fontSize:"20px",color:"#ffff",fontWeight:"bold"}}>
 At Bookstore Website, we are passionate about bringing the world of books to your doorstep.
  As an e-commerce bookstore, our mission is to provide you with an extensive 
 selection of books to cater to all tastes and interests. <br/>
 Whether you're looking for the latest releases..
 , classic literature...
 non-fiction works,
 <br/> or specialized genres, we've got it all.
Our user-friendly online platform makes it easy to find and purchase your favorite books with just a few clicks.
 We offer secure payment options and fast, reliable shipping, ensuring that your books arrive promptly and in perfect condition.
 </p>
 </Col>
 {/* <Col><Image roundedCircle style={{width:"250px",position:"relative",left:"30%"}} src={img4}/></Col> */}
</Row>

  </div>
  {/* <hr/> */}
 {/* Book Section */}
{/* <Row> <Col><h1 style={{fontWeight:"bold"}}> Our books </h1></Col>
</Row> */}
 <div className="book-div">
 
<Books books={datafromHeader}/>


 </div>
 
 {/* <div style={{padding:"50px",backgroundColor:"#152A38",marginTop:"20px"}}><Row>   </Row> </div>
*/}
 {/* <Col><Image roundedCircle style={{width:"250px"}} src={Myimage}/></Col>
 
 <Col><Image roundedCircle style={{width:"250px"}} src={img1}/></Col> */}
 {/* <Col><Image roundedCircle style={{width:"250px"}} src={img4}/></Col> */}
 {/* <Col><Image roundedCircle style={{width:"250px",height:"250px"}} src={img3}/></Col> */}
 
 {/* <Col><h1 style={{fontSize:"65px"}}> Welcome to Bookstore, where books await your discovery</h1></Col> */}


 
 <br/>
<br/>
<br/>
<br/>
 
 
 <Footer/>
 
 
    </div>);



}

export default Home;

