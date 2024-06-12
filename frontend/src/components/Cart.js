import React, { useEffect, useState } from "react";
import Header from "./Header";
import './../../src/App.css';
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { Await, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { createContext } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { useContext } from "react";
import { format, longFormatters } from 'date-fns';
import ListGroup from 'react-bootstrap/ListGroup';
import OrderContext from "../context/orderContext";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";

// export const OrderContext=createContext("");
export const BASE_URL="hhtp:";
function Cart(){
  const [smShow, setSmShow] = useState(false);
const location=useLocation();

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
  const [show, setShow] = useState(false);
  const {order,csrftoken}=useContext(OrderContext);
const order2=[order];
  const ORDERID=order[0];

const [orderID,setOrderID]=useState(()=>{return ORDERID? ORDERID:order});
 
  let data ="";
 const [id,GetID]=useState("");
  const navigate=useNavigate();

let [orderBook,SetOrderBook]=useState(()=>{
  return order[1]? order[1]:null
});
let currentDate = format(new Date(), 'yyyy-MM-dd');

const increaseQuantity= async()=>{
 
    let response=  await axios.post("http://localhost:8000/app/orderBook/",{
      "order":orderID["id"],
      "book": id,
      "added_date":currentDate,
    },{
      headers:{
        "X-CSRFToken":csrftoken
      }
    }).then(response=>{
      if(response.status===200){
        console.log("You have successfully added new Order Book");
        window.location.reload();
  // navigate("/cart")
        console.log(response.data)
      }
    }) 
    .catch(error=>console.log(error.response.data))
    
    };
const decreaseQuantity= async(e)=>{

try{
  
  let response =await axios.put(`http://localhost:8000/app/orderBook/${id}/`,{},{
    headers:{
      "X-CSRFToken":csrftoken
    }
  });
 
    console.log("Ordered Book ID  :",id);
    console.log("response.data from decrease function :" ,response.data);
     window.location.reload();
   
  
 
}
catch(error){
  console.log(error);
}
}



const deleteBook= async()=>{
  try{
    let response = await axios.delete(`http://localhost:8000/app/orderBook/${id}/`,{
      headers:{
        "X-CSRFToken":csrftoken
      }
    });
    
    console.log("Successfully deleted ");
    window.location.reload();
    
  }
  catch(error){
    console.log("Get Id for deletion : ",id);
    console.log(error);
  }

}

const forOrder=()=>{

  
    console.log("Got order form Order Context:  ",order)
      
    console.log("orderBook: ",orderBook)
          console.log("ORDERID: ",orderID)
          console.log("ORDER2 ",order[1]);
}


useEffect(()=>{
  
  if(order[1]){
     data=order[1];
     SetOrderBook(data);
   } 
   else{
    SetOrderBook(null);
   }
   
},[order])



    return(

        <>
        <Header/>
        <Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/")}}>  <IoIosArrowRoundBack /> Back To Home</Button>
        <Button onClick={forOrder}>Get Order</Button>
        
        <div className="div-cart" >
<h1>This is Cart Page</h1>

<Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th><h5>Items : {orderID && orderID.get_cart_items}</h5></th>
          <th><h5>Total :  {orderID && orderID.get_cart_total}</h5></th> 
        </tr>
        <Button onClick={()=>{ navigate("/checkout",{state:{orderID:orderID}})}}> Check out</Button>
      
      </thead>
    </Table>
<Row>
<Col><h5>Item</h5></Col>
<Col><h5>Quantity</h5></Col>
<Col><h5>date</h5></Col>

<Col> <h5>Total</h5></Col>

<Col></Col>
</Row>


{orderBook && orderBook.map((book)=>(


<Row>
<Col>{book.get_title}</Col>

<Col>

<ListGroup horizontal >
    <ListGroup.Item style={{width:"55px",marginBottom:"12px",height:"47px"}} action variant="secondary"><TiMinus size={15} style={{marginRight:"15px"}} onClick={decreaseQuantity}  onMouseEnter={()=>GetID(book.id)} /></ListGroup.Item>
    <ListGroup.Item style={{marginBottom:"12px",width:"15px",height:"47px"}} action variant="secondary"><p style={{fontWeight:"bold"}}>{book.quantity}</p></ListGroup.Item>
    <ListGroup.Item style={{marginBottom:"12px",width:"15px",height:"47px"}} action variant="secondary"> <TiPlus size={15} style={{marginRight:"150px"}} onClick={increaseQuantity}  onMouseEnter={()=>{GetID(book.book);
    console.log("Ordered Book BookId : ",id);}}/></ListGroup.Item>
    
  </ListGroup>

</Col>
<Col>{book.added_date}</Col>
<Col>{book.get_total}</Col>
<Col><MdDelete size={40} 
onClick={deleteBook}
onMouseEnter={()=>GetID(book.id)}
/>


{/* <Modal
      size="sm"
      show={smShow}
      onHide={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
       
      </Modal.Header>
      <Modal.Body> <h5>Sure you wanna delete this item ?</h5></Modal.Body>
      <Button variant="outline-danger" style={{margin:"20px",width:"100px"}} onClick={
        
              console.log("Book Quantitiy : ",book.quantity=0)
      
      onClick={() =>  setSmShow(true)}
      }>
          yes
        </Button>
    </Modal> */}



<button onClick={()=>{console.log(book.quantity)}}> just check book quantity </button>
</Col>
  </Row>))
   }











             
</div>


        </>

    );
}

export default Cart;


// onClick={ ()=>{
//   setSmShow(true)
//  }}
 
// {/* <Alert show={show} variant="danger">
// <Alert.Heading></Alert.Heading>
// <p>
//  item is deleted
// </p>

// <div className="d-flex justify-content-end">
//   <Button onClick={() => setShow(false)} variant="outline-danger">
//   <IoMdClose />

//   </Button>
// </div>
// </Alert> */}
