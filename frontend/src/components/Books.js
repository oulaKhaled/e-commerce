import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";

function Books(){

    axios.defaults.withCredentials = true;


    const [books,setBooks]=useState([]);
const GetBook = async ()=>{
let response =await axios.get("http://localhost:8000/app/book/");


console.log("BOOKS : ",response.data);


setBooks(response.data);
console.log("Printed Books : ",books);

};




useEffect(()=>{
    GetBook();
},[]);

    return(
        <div>
    

    <h4><a>Thrillers</a></h4>
  
    <Row style={{justifyContent:"center",alignItems:"center"}}>
{books && books.map((book)=>(

    book.category==="Thrillers" ? (
      
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
        <div style={{backgroundColor:"#ffff",margin:"5px",borderRadius:"10px"}}>
        <Row>
  
  <p>{book.title}</p>
  
</Row>
<Row>
  <p>${book.price}</p>
  
</Row>
<Row>
  <Col> Rate it</Col>
  <Col><a href="/cart">Add to cart</a></Col>

</Row>

        </div>

</Col> 
      
        

    ):(null
    )

  

       )) }
 
        </Row>


        <h4>Kids</h4>
        <Row style={{justifyContent:"center",alignItems:"center"}}>
{books && books.map((book)=>(

    book.category==="Kids" ? (
        
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
        <div style={{backgroundColor:"#ffff",margin:"5px",borderRadius:"10px"}}>
        <Row>
  
  <p>{book.title}</p>
  
</Row>
<Row>
  <p>${book.price}</p>
  
</Row>
<Row>
  <Col> Rate it</Col>
  <Col><a href="/cart">Add to cart</a></Col>

</Row>
</div>
</Col>
    
        

    ):(null
    )

  

       )) }
 
        </Row>
<h4>Trending Books</h4>
        <Row style={{justifyContent:"center",alignItems:"center"}}>
{books && books.map((book)=>(

    book.category==="Trending Books" ? (
        <Col style={{margin:"10px",height:"auto",width:"100%"}} >
  
        <div style={{backgroundColor:"#ffff",margin:"5px",borderRadius:"10px"}}>
  <Row>
  
    <p>{book.title}</p>
    
  </Row>
  <Row>
    <p>${book.price}</p>
    
  </Row>
  <Row>
    <Col> Rate it</Col>
    <Col><a href="/cart">Add to cart</a></Col>
  
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
      
   
//            ))