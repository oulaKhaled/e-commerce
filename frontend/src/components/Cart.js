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
import Image from "react-bootstrap/esm/Image";
import { BASE_URL } from "./Home";
// export const OrderContext=createContext("");

function Cart(){
  const [smShow, setSmShow] = useState(false);
const location=useLocation();

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
  const [show, setShow] = useState(false);
  const {order,csrftoken,getOrder,orderBooks,createOrder}=useContext(OrderContext);
const order2=[order];

 const [user,setUser]=useState(location.state.user);
// const [orderID,setOrderID]=useState(()=>{return ORDERID? ORDERID:order});
 
// const [orderID,setOrderID]=useState(order);

// const [orderBook,setOrderBook]=useState(orderBooks? orderBooks:null)
let orderID=order;

  let data ="";
 const [id,GetID]=useState("");
  const navigate=useNavigate();



let orderBook=orderBooks? orderBooks:null
let currentDate = format(new Date(), 'yyyy-MM-dd');
const check=true;


useEffect(()=>{
  if(order){
    getOrder();
    orderBook=orderBooks? orderBooks:null;
    orderID=order;
    
    // setOrderBook(orderBooks? orderBooks:null);
    // setOrderID(order);
  }
 else{
  createOrder();
 }
  
},[])



const increaseQuantity= async()=>{
 
    let response=  await axios.post(`${BASE_URL}/app/orderBook/`,{
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
    //  getOrder();
//         SetOrderBook(orderBooks);
// setOrderID(order);
        window.location.reload();
  // navigate("/cart")
        console.log(response.data)
      }
    }) 
    .catch(error=>console.log(error.response.data))
    
    };
const decreaseQuantity= async(e)=>{

try{
  
  let response =await axios.put(`${BASE_URL}/app/orderBook/${id}/`,{},{
    headers:{
      "X-CSRFToken":csrftoken
    }
  });
 
    console.log("Ordered Book ID  :",id);
    console.log("response.data from decrease function :" ,response.data);
    // getOrder();
//     SetOrderBook(orderBooks);
// setOrderID(order);
     window.location.reload();
   
  
 
}
catch(error){
  console.log(error);
}
}



const deleteBook= async()=>{
  try{
    let response = await axios.delete(`${BASE_URL}/app/orderBook/${id}/`,{
      headers:{
        "X-CSRFToken":csrftoken
      }
    });
    
    console.log("Successfully deleted ");
    //  getOrder();
//     SetOrderBook(orderBooks);
// setOrderID(order);
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
          console.log("USER FROM HEADER: ",user);
}






    return(

        <>
    
        <Header/>
        <Button onClick={()=>{navigate("/checkout",{state:{user:user}})}} style={{ position:"absolute",
     top:"90px",
     right:"20px",
    width:"130px",
    height:"40px"
    }} variant="outline-dark"> Check out</Button>
        <Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/")}}>  <IoIosArrowRoundBack /> Back To Home</Button>
        {/* <Button onClick={forOrder}>Get Order</Button> */}
        
        <div className="div-cart shadow-23" >

<Table striped bordered hover variant="light">
      <thead  >
        <tr >
          <th style={{borderRadius: "20px",}}><h2>Books : {order && orderID.get_cart_items}</h2></th>
          <th style={{borderRadius: "20px",}}><h2>Total :  {orderID && orderID.get_cart_total}</h2></th> 
        </tr>
       
      
      </thead>
    </Table>
<Row>
<Col><h5>Book</h5></Col>

{/* <Col><h5>date</h5></Col> */}

<Col> <h5>Total</h5></Col>
<Col><h5>Quantity</h5></Col>
<Col></Col>
</Row>


{orderBook && orderBook.map((book)=>(

<>
<hr/>

<Row>
<Col>
<Row>
  <Col>
  <Image style={{width:"100px",height:"120px",marginLeft:"10px"}} src={`http://localhost:8000/images/${book.get_image}`}/> 
  </Col>
<Col><p style={{margin:"15px",color:"#183661",fontWeight:"bolder"}}>{book.get_title} </p>
</Col>
 
</Row>


</Col>


{/* <Col><h5 style={{margin:"15px",color:"#183661"}}>{book.added_date}</h5></Col> */}
<Col><h5 style={{margin:"15px",color:"#183661"}}>${book.get_total}</h5></Col>
<Col>

<ListGroup horizontal style={{color:"#183661"}}>
    <ListGroup.Item style={{width:"40px",marginBottom:"12px",height:"40px"}} ><TiMinus size={15}  onClick={decreaseQuantity}  onMouseEnter={()=>GetID(book.id)} /></ListGroup.Item>
    <ListGroup.Item style={{marginBottom:"12px",height:"40px",width:"40px"}} ><p style={{fontWeight:"bold"}}>{book.quantity}</p></ListGroup.Item>
    <ListGroup.Item style={{marginBottom:"12px",height:"40px",width:"40px"}} > <TiPlus size={15}  onClick={increaseQuantity}  onMouseEnter={()=>{GetID(book.book);
    console.log("Ordered Book BookId : ",id);}}/></ListGroup.Item>
    
  </ListGroup>

</Col>
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




</Col>
  </Row>
  </>))
   }
       
</div>


</>

    );
}

export default Cart;


//onClick={ ()=>{
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
