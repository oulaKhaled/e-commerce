import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Button from "react-bootstrap/esm/Button";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import { format } from 'date-fns';
function BookDetails(){
const navigate=useNavigate();
const location = useLocation();
const [bookDetails,setBookDetails]=useState("");
const GetBookDetails= async()=>{
let response= await axios.get(`http://localhost:8000/app/book/${location.state.book_id}`);
setBookDetails(response.data);

};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  const csrftoken = getCookie('csrftoken');
let currentDate = format(new Date(), 'yyyy-MM-dd');
const handelClick=async (e)=>{
   
   let response=  await axios.post("http://localhost:8000/app/orderBook/",{
    "order":"2",
    "book":bookDetails.id,
  
    "added_date":currentDate,
  },{
    headers:{
      "X-CSRFToken":csrftoken
    }
  }).then(response=>{
    if(response.status===201){
      console.log("You have successfully added new Order Book");
      console.log(response.data)
    }
  }) 
  .catch(error=>console.log(error.response.data))
  
  };
useEffect(()=>{

    GetBookDetails();
},[])











    return(<>
<Header/>
<Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/")}}>  <IoIosArrowRoundBack /></Button>

<Row>
{/*//////////////  FİRST DİV//////////////// */}


<p>Hi</p>



<div style={{margin:"20px",backgroundColor:"#ffff",width:"400px",height:"500px"}}>

<Row>
<img src={bookDetails.image} style={{width:"auto",margin:"20px",height:"300px",marginLeft:"60px"}}/>

</Row>

<Row  style={{margin:"5px"}}>
   <Col> <h4>${bookDetails.price}</h4> </Col>
    <Col><Button style={{position:"abseloute",top:"90px",width:"180px"}} variant="outline-dark" onClick={handelClick}>Add to cart</Button></Col>
</Row>

</div>

{/*//////////////  SECONED DİV//////////////// */}


    <div style={{margin:"20px",backgroundColor:"#ffff",width:"68%",height:"500px"}}>
<h2>{bookDetails.title}</h2>
<h5 style={{color:"#A9A9A9"}}> by {bookDetails.author}</h5>

<p style={{margin:"10px",fontWeight:"bold"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
   
<Row>
<Col style={{width:"auto",justifyContent:"spaxe-between"}}><FaStar color="#FFC100" size={20}/>
<FaStar color="#FFC100" size={20}/>
<FaStar size={20}  />
<FaStar size={20} />
<FaStar size={20} />
<p>{bookDetails.avg_rating}</p>
numbers of Rating : {bookDetails.no_of_ratings}

</Col>
<Col>
    category : {bookDetails.category}
</Col>

</Row>
{/* 
 MORE BOOK FROMTHE SAME CATEGORY */}
<div style={{position:"relative",top:"100px"}}>
<a style={{position:"relative",bottom:"0"}}>Some pepole read too:  </a>

<Row>
    <Col>
    <p>Book 1</p>
   
    </Col>
    <Col>
    <p>Book 2</p>
   
    </Col>
    <Col>
    <p>Book 3</p>
   
    </Col>
</Row>


</div>


    </div>








{/*  THE END OF ROW */}




</Row>

<Footer/>
    </>)
}

export default BookDetails;