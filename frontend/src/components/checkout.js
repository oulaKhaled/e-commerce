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
import Context from "../context/context";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";
import GooglePayButton from "@google-pay/button-react"
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { format, longFormatters } from 'date-fns';
import { FcApproval } from "react-icons/fc";
import { BASE_URL } from "./Home";
function Checkout(){
 const navigate =useNavigate();
 const location=useLocation();
const {order,getOrder,orderBooks,csrftoken,userID,Token}=useContext(Context);
const ORDERID=order;
const [payment,PaymentState]=useState(false)
const [show, setShow] = useState(payment? true:false);
const data=ORDERID["id"];
// const{user}=location.state.user;
let currentDate = format(new Date(), 'yyyy-MM-dd');
// const [user,setUser]=useState(location.state.user?location.state.user:null);

const [shippingInformation,setShippingInformation]=useState({
    "user":userID["id"],
    "order":data,
    "address":"",
    "zipcode":"",
   
});
const handleShow = () => setShow(true);
const [shouldShow,setShouldShow]=useState("");
const handelButton=()=>{
    console.log("Currrent show state : ",shouldShow);
   
    console.log("Shippping Information : ",shippingInformation);
 if(shippingInformation.address==="" && shippingInformation.zipcode===""){
    setShouldShow(false);
 }
 else{
    setShouldShow(true);
 }
}
const saveShippingInformation = async ()=>{
   try{

   
    let response= await axios.post(`${BASE_URL}/app/shippinginformation/`,{
        "user":userID,
        "order":data,
        "address":shippingInformation.address,
        "zipcode":shippingInformation.zipcode,
    },{
       headers:{ "Authorization":` Token ${Token}`}
    });
    console.log("respone from ShippingInformation Order : ",response.data);
   }
   catch(error){
    console.log(error);
   }




}














const UpdateOrder= async()=>{
    console.log(ORDERID["id"]);
    
    console.log(userID);
  console.log(currentDate);

try{
    let response=await axios.put(`${BASE_URL}/app/orders/${data}/`,{
        "user":userID,
        "order_date":currentDate,
    "complete":true,},{
      headers:{ "Authorization":` Token ${Token}`}
    }

,);
    console.log("order",order);


}  catch (error) {
    // Log any errors that occur during the request
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("Error response data:", error.response.data);
      console.log("Error response status:", error.response.status);
      console.log("Error response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log("Error request:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error message:", error.message);
    }
  }
}
const handleClose =  () => {
   UpdateOrder();
    navigate("/");
    setShow(false);


//  window.location.reload();

console.log("refresh must be done here");  
    
};


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
useEffect(()=>{
console.log("HOT USER FROM CART PAGE : ",userID);
},[])


const orderID=order;

const orderBook=orderBooks;

    return(
        <>
             <Header/>
           
        
             <Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/cart")}}>  <IoIosArrowRoundBack /> Back To Cart</Button>
           
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
       <input style={{width:"90%",height:"35px", borderRadius: "9px"}}/>
      </Col>
             </Row>
             <hr />
             <h5> Shipping informartion</h5>
<Row style={{margin:"20px"}}>
<Col >
             <h6>address</h6>
       <input   name="address" value={shippingInformation.address} style={{width:"90%",height:"35px", borderRadius: "9px",}} onChange={handleInputChange}/>
      </Col>
      <Col >
      <h6>Zip code</h6>
       <input name="zipcode" value={shippingInformation.zipcode} style={{width:"80%",height:"35px", borderRadius: "9px",}} onChange={handleInputChange}/>
      </Col>
</Row>
 <hr />
<Button style={{margin:"10px",}} variant="outline-dark" onClick={handelButton}>Continue</Button>
{/*  PAYAMENT  */}
{
    shouldShow===true?
    <div id="embed-target">
    <GooglePayButton
    style={{margin:"15px"}}
    buttonSizeMode="static"
    buttonType="long"
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
    totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: orderID.get_cart_total,
      currencyCode: 'USD',
      countryCode: 'US',
     
    },
  }}
  onLoadPaymentData={paymentRequest => {
    console.log('load payment data', paymentRequest);
    saveShippingInformation();
    setShow(true);
    PaymentState(true); 
  }}
/>

    </div>
   :(<p style={{color:"red"}}> Please Enter your Shipping Information</p>)
}
             </div>
{payment?
             (
                
                <>
         

      <Modal show={show} onHide={handleClose}>
      <FcApproval size={90} style={{position:"relative",left:"35%",margin:"10px"}} />
        <Modal.Body >
        
        <h2 style={{position:"relative",left:"20%",margin:"10px"}} >Payment successful.</h2>
        <h6 style={{ margin:"10px",fontWeight:"bolder"}}> Your order will be shipped to your address shortly. Thank you for shopping with us!</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
                </>
              ):(null)

             }


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