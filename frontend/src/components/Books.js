import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import './../../src/App.css';
import { useContext } from "react";
import OrderContext from "./Cart";
import { format } from 'date-fns';
import Carousel from 'react-bootstrap/Carousel';

import { FaStar } from "react-icons/fa";

import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";


function Books(props){
const order=useContext(OrderContext);
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// const [searchData,setSearchData]=useState(props.books);

const searchData=props.books
const navigate=useNavigate();



const [books,setBooks]=useState([]);
const[filterdBooks,setFilterdBooks]=useState("");



const GetBook = async ()=>{
let response =await axios.get("http://localhost:8000/app/book/");
console.log("BOOKS : ",response.data);
const BookData=response.data
setFilterdBooks(BookData)

  setBooks(BookData)
  if(searchData){
    setFilterdBooks(books.filter(book=> book.title.toLowerCase().includes(searchData)))

  }


}


// console.log("Printed Books : ",books);

useEffect(()=>{
 
    GetBook();
  
  
},[searchData]);


useEffect(()=>{
  console.log(" 3 Books ",filterdBooks);
},[GetBook])
// useEffect(()=>{
//   setFilterdBooks(books.filter(book=> book.title.toLowerCase().includes(searchData)))

//   console.log("filtered Books ",filterdBooks);

// },[])



// useEffect(()=>{


//  setBooks(books.filter(book=> book.title.toLowerCase().includes(searchData)))

// console.log("Book after Search : ",Books);
// },[searchData]);
// const test=(e)=>{
  


//   console.log("ORDER FROM CART COMPONENT. : ",order);
// }

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
        <div>

   
    <h1 style={{margin:"15px"}}><a>Thrillers</a></h1>



  <Row style={{justifyContent:"center",alignItems:"center"}}>
{
  filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Thrillers"? (
        
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
        <div style={{marginLeft:"30px",borderRadius:"10px"}}>
       
        
<Row>
      <img style={{width:"auto",height:"250px"}} src={book.image}/>
      </Row>
       
        <Row>
  
        <h5 onClick={()=>{navigate("/book-details",{state:{book_id:book.id}})}} style={{margin:"15px"}} >{book.title}</h5>
  
</Row>


</div>
</Col>
    ):(null
    )
       )) }
 
        </Row>


        <h1 style={{margin:"15px"}}>Kids</h1>
        <Row style={{justifyContent:"center",alignItems:"center"}}>
{filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Kids"? (
        
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
        <div style={{marginLeft:"30px",borderRadius:"10px"}}>
       
        
<Row>
      <img style={{width:"auto",height:"250px"}} src={book.image}/>
      </Row>
       
        <Row>
  
        <h5 onClick={()=>{navigate("/book-details",{state:{book_id:book.id}})}} style={{margin:"15px"}}>{book.title}</h5>
  
</Row>

</div>
</Col>
    ):(null
    )
       )) }
 
        </Row>
<h1 style={{margin:"15px"}}>Trending Books</h1>
        <Row style={{justifyContent:"center",alignItems:"center"}}>
{filterdBooks && filterdBooks.map((book,index)=>(

    book.category==="Trending Books" ?  (
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
  
 
 
        <div style={{marginLeft:"30px",borderRadius:"10px"}}>
        <Row>
      <img style={{width:"auto",height:"250px"}} src={book.image}/>
      </Row>
 
  <Row>
  
  <h5 onClick={()=>{navigate("/book-details",{state:{book_id:book.id}})}} style={{margin:"15px"}}>{book.title}</h5>
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
// books.map((book)=>(


//     <Col style={{margin:"10px",height:"auto",width:"100%"}} >
     
//          {book.title}
         
//          {book.author}
         
//          {book.price}
         
//          {book.quantity}
         
//          {book.catedory}
//        </Col> 
      
//    {/* searchData? books.filter(books.filter(book=> book.title.toLowerCase().includes(searchData))): 
//  */}
//            ))

// {
//   "order":"2",  
//   "book":"2",
//   "quantity":"3",
//   "added_date":"05/31/2024"
 

// }, 
// {
//   withCredentials: true,
//   headers:{
//     'X-CSRF-TOKEN':csrftoken
//   }

// }