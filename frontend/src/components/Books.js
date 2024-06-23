import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import './../../src/App.css';
import { useContext } from "react";

import { format } from 'date-fns';
import Carousel from 'react-bootstrap/Carousel';

import { FaStar } from "react-icons/fa";
import { BASE_URL } from "./Home";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import Context from "../context/context";

function Books(props){

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const searchData=props.books
const navigate=useNavigate();



const [books,setBooks]=useState([]);
const[filterdBooks,setFilterdBooks]=useState("");
const {Token,currentUser}=useContext(Context);


const GetBook = async ()=>{
let response =await axios.get(`${BASE_URL}/app/book/`,);
console.log("BOOKS : ",response.data);
const BookData=response.data
setFilterdBooks(BookData)

  setBooks(BookData)
  if(searchData){
    setFilterdBooks(books.filter(book=> book.title.toLowerCase().includes(searchData)))

  }


}



useEffect(()=>{
 
    GetBook();
  
  
},[searchData]);


useEffect(()=>{
  console.log(" 3 Books ",filterdBooks);
},[GetBook])


//////////************** TO SEND DATA TO ORDERBOOK ENDPOINT **********///////////////




const getDate=()=>{
  let currentDate = format(new Date(), 'yyyy-MM-dd');
console.log("CURRENT DATE ",currentDate);
}
// const testOrder=(e)=>{
//  console.log("ORDER FROM CART COMPONENT : ",order);
// }
//////////************** RETURN FUNCTİON **********///////////////

    return(
        <div style={{width:"100%"}}>

   
    <h1 style={{margin:"10px",textDecoration:"underline",color:"#0F1035"}}><a>Thrillers</a></h1>



  <Row style={{justifyContent:"center",alignItems:"center",width:"auto",borderRadius:"10px",backgroundColor:"#ffff"}}>
{
  filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Thrillers" ?  (
        
        <Col style={{margin:"10px",height:"auto",width:"auto",}} >
        <div style={{padding:"10px"}}>
 
        
<Row>
      <img style={{width:"auto",height:"250px",padding:"10x"}} src={book.image}/>
      
      </Row>
       
        <Row>
  
        <h5 onClick={()=>{
          if(currentUser){
            navigate("/book-details",{state:{book_id:book.id}})
            
            }
            else{
            navigate("/auth")
          }
          
          }
        
          
          } style={{marginTop:"15px",textDecoration:"underline",color:"#0F1035"}} >{book.title}</h5>
  
</Row>


</div>
</Col>
    ):(
    null)
       )) }
 
        </Row>

        
        <h1 style={{margin:"15px",textDecoration:"underline"}}>Kids</h1>
        <Row style={{justifyContent:"center",alignItems:"center",backgroundColor:"#ffff",borderRadius:"10px"}}>
{filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Kids"? (
        
        <Col style={{margin:"20px",height:"auto",width:"100%",alignItems:"center"}} >
        <div style={{padding:"10px"}}>
       
        
<Row>
      <img style={{width:"auto",height:"250px"}} src={book.image}/>
      </Row>
       
        <Row>
  
        <h5 onClick={()=>{navigate("/book-details",{state:{book_id:book.id}})}} style={{marginTop:"15px",textDecoration:"underline",color:"#0F1035"}}>{book.title}</h5>
  
</Row>

</div>
</Col>
    ):(null
    )
       )) }
 
        </Row>
      
<h1 style={{margin:"10px",textDecoration:"underline"}}>Trending Books</h1>
        <Row style={{justifyContent:"center",alignItems:"center",backgroundColor:"#ffff",borderRadius:"10px",}}>
{filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Trending Books" ?  (
        <Col style={{margin:"25px",height:"auto",width:"100%"}} >
       
 
 
        <div style={{padding:"10px"}}>
        <Row>
      <img style={{width:"auto",height:"250px",marginLeft:"10px"}} src={book.image}/>
      </Row>
 
  <Row>
  
  <h5 onClick={()=>{navigate("/book-details",{state:{book_id:book.id}})}} style={{marginTop:"15px",textDecoration:"underline",color:"#0F1035"}}>{book.title}</h5>
  </Row>
  
     
  
     </div>
   </Col> 

    ):(null)
       )) }
        </Row>
        
      
        </div>



    );
}

export default Books;
