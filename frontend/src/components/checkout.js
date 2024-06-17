import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import './../../src/App.css';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import OrderContext from "../context/orderContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
function Checkout(){
 const navigate =useNavigate();
const {order,getOrder,orderBooks}=useContext(OrderContext);
const ORDERID=order[0];


const [shouldShow,setShouldShow]=useState(false);
const handelButton=()=>{
    console.log("Currrent show state : ",shouldShow);
    setShouldShow(true);

}



const [shippingInformation,setShippingInformation]=useState({
    "user":"",
    "order":"",
    "address":"",
    "zipcode":"",
})

const orderID=order;

const orderBook=orderBooks;

    return(
        <>
             <Header/>
           
             
          {/* <Button onClick={()=>{
            console.log("I got this from cart page : ",order)
          }}>check OrderID </Button> */}
{/* 
it can be above Order Summery Cart */}
             <Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/cart")}}>  <IoIosArrowRoundBack /> Back To Cart</Button>
             {/* <div style={{backgroundColor:"#ffff",height:"150px",width:"700px",position:"relative",left:"300px"}} className="shadow-23">
             <GiConfirmed size={70} style={{position:"relative",left:"45%"}} />

                            <h1  style={{position:"relative",left:"30%"}}> You order is Confirmed </h1>
                            <p  style={{position:"relative",left:"25%",fontWeight:"bolder"}}>Please complete you order By Entering your information </p>
                            </div> */}
             <Row  >
{/* first Card */}
          
                <Col style={{padding:"10px"}}>
                <div className="shadow-23" style={{padding:"20px",backgroundColor:"#ffff",height:"500px",width:"90%",marginLeft:"50px",borderRadius:"10px"}} >
             <h1>
                User informartion
             </h1>
             <Row style={{margin:"20px"}}>
             <Col >
             <h6>name</h6>
       <input style={{width:"90%",height:"35px", borderRadius: "9px",
       }} />
      </Col>
      <Col >
      <h6>Email</h6>
       <input style={{width:"90%",height:"35px", borderRadius: "9px",}}/>
      </Col>
             </Row>
             <hr />
             <h5> Shipping informartion</h5>
<Row style={{margin:"20px"}}>
<Col >
             <h6>address</h6>
       <input style={{width:"90%",height:"35px", borderRadius: "9px",}}/>
      </Col>
      <Col >
      <h6>Zip code</h6>
       <input style={{width:"80%",height:"35px", borderRadius: "9px",}}/>
      </Col>
</Row>
 <hr />
<Button style={{margin:"10px",}} variant="outline-dark" onClick={handelButton}>Continue</Button>
{/* PAPAL PAYAMENT  */}
{
    shouldShow?
    <p>Just check setShow useState</p>:null
}
             </div>


</Col>
{/* Second Card */}

                <Col style={{padding:"10px"}}>
                <div style={{padding:"20px",backgroundColor:"#ffff",height:"500px",width:"90%",marginRight:"50px",borderRadius:"10px"}} className=" shadow-23">
                <h1 style={{margin:"10px"}}>Order Summary</h1>
                {/* There must be a for loop, Each item must take a row*/}
                <Row>
                <Col><h4>Books</h4></Col>
                
                <Col> <h4>Total</h4></Col>
                <Col><h4>Quantity</h4></Col>
                </Row>


           
               
                {orderBook && orderBook.map((book)=>(
                    <>
                    <Row style={{margin:"10px"}}>
                    <Col>
                    
                   <p style={{fontWeight:"bolder"}}>{book.get_title}</p>
                </Col>
                    <Col>
                   
                    <p style={{fontWeight:"bolder"}}>   {book.get_total}</p>
                </Col>
                <Col>
                
                <p style={{fontWeight:"bolder"}}>  {book.quantity}</p>
                </Col>
                
                </Row>
                </>
                ))}
                
                
      
                
                
               
               
                {/**after display all rows */}
                <hr/>
                <h5 style={{fontWeight:"bolder"}}>Books:  { orderID && orderID.get_cart_items }</h5>
            <h5 style={{fontWeight:"bolder"}}>Total:   {orderID && orderID.get_cart_total}</h5>
             </div>

                </Col>


    
             </Row>

        </>
    
);
}
export default Checkout;