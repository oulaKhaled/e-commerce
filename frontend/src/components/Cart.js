import React from "react";
import Header from "./Header";
import './../../src/App.css';
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
function Cart(){
    const navigate=useNavigate();
    return(
        <>
        <Header/>
        <div className="div-cart" >
<h1>This is Cart Page</h1>

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
<Col>Price</Col>
<Col>Quantity</Col>
<Col>Total</Col>
</Row>
<Row>
  <Col>Book Title </Col>
<Col>Book Price</Col>
<Col>book quantity</Col>
<Col>Total</Col>

    </Row>
                
</div>

        </>

    );
}

export default Cart
