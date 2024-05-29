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
function Cart(){
    const navigate=useNavigate();
const [orderBook,setOrderBook]=useState("");
const getOrder= async()=>{
axios.get("http://localhost:8000/app/orderBook/")
.then(resp=>console.log(resp))
.catch(error=> console.log(error));


    }


useEffect(()=>{

console.log("after OrderdBook Function : ",orderBook);
},[getOrder]);



    return(
        <>
        <Header/>
        <div className="div-cart" >
<h1>This is Cart Page</h1>
<Button onClick={getOrder}>Get Ordered Books</Button>
<Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th><h5>Items : </h5></th>
          <th><h5>Total : </h5></th> 
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
  <Col>{book.book}</Col>
<Col>{book.quantity}</Col>
<Col>{book.added_date}</Col>


    </Row>
     
))}

             
</div>


        </>

    );
}

export default Cart
