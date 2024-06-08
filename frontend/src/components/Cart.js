import React, { useEffect, useState } from "react";
import Header from "./Header";
import './../../src/App.css';
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { createContext } from "react";

export const OrderContext=createContext("");

function Cart(){

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;

    const navigate=useNavigate();
const [orderBook,setOrderBook]=useState([]);
const [order,setOrder]=useState([]);



const GetOrder = async ()=>{
  try{
    let response =await axios.get("http://localhost:8000/app/orders/order_by_user/");
    setOrderBook(response.data[0])
    setOrder(response.data[1])
    console.log("response form cart component : ",response.data);

   
  }
  catch(error){
    console.log(error);
  }
  
};

useEffect(()=>{

// console.log("after OrderdBook Function : ",orderBook);
GetOrder();
},[]);


useEffect(()=>{

  console.log("ORDER : ",order);
},[GetOrder])

    return(
      <OrderContext.Provider value={order}>
        <>



        <Header/>
        <div className="div-cart" >
<h1>This is Cart Page</h1>

<Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th><h5>Items : {order && order.get_cart_items}</h5></th>
          <th><h5>Total :  {order && order.get_cart_total}</h5></th> 
        </tr>
        <Button onClick={()=>{ navigate("/checkout")}}> Check out</Button>
      
      </thead>
    </Table>
<Row>
<Col>Item</Col>
<Col>Quantity</Col>
<Col>date</Col>

<Col>Total</Col>

</Row>
{orderBook && orderBook.map((book)=>(


  <Row>
  <Col>{book.get_title}</Col>
<Col>{book.quantity}</Col>
<Col>{book.added_date}</Col>
<Col>{book.get_total}</Col>

    </Row>
     
))}

             
</div>


        </>
</OrderContext.Provider>
    );
}

export default Cart