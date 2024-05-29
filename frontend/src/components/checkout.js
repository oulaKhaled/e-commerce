import React from "react";
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
function Checkout(){
 const navigate =useNavigate();
 
    return(
        <>
             <Header/>
          
             <Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/cart")}}>  <IoIosArrowRoundBack /> Back To Cart</Button>
             <Row>
{/* first Card */}
          
                <Col>
                <div style={{backgroundColor:"#ffff",height:"500px",width:"90%",marginLeft:"50px",borderRadius:"10px"}}>
             <h4>
                User informartion
             </h4>
             <Row style={{margin:"20px"}}>
             <Col >
             <h6>name</h6>
       <input style={{width:"80%"}}/>
      </Col>
      <Col >
      <h6>Email</h6>
       <input style={{width:"80%"}}/>
      </Col>
             </Row>
             <hr />
             <h5> Shipping informartion</h5>
<Row style={{margin:"20px"}}>
<Col >
             <h6>address</h6>
       <input style={{width:"80%"}}/>
      </Col>
      <Col >
      <h6>Zip code</h6>
       <input style={{width:"80%"}}/>
      </Col>
</Row>
 <hr />
<Button style={{margin:"10px"}} variant="outline-dark">Continue</Button>

             </div>
</Col>
{/* Second Card */}

                <Col>
                <div style={{backgroundColor:"#ffff",height:"500px",width:"90%",marginRight:"50px",borderRadius:"10px"}}>
                <h3 style={{margin:"10px"}}>Order Summary</h3>
                {/* There must be a for loop, Each item must take a row*/}
                <Row style={{margin:"10px"}}>
                <Col>
                    book Title
                </Col>
                <Col>
                    Price
                </Col>
                <Col>
                    Quantity
                </Col>
                
                </Row>
                {/**after display all rows */}
                <hr/>
                <h5>Items:   order.get_cart_items</h5>
            <h5>Total:   order.get_cart_total|floatformat:2</h5>
             </div>

                </Col>


             </Row>

         
    
        </>
    
);
}
export default Checkout;