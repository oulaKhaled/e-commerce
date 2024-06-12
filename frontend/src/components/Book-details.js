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
import { format, longFormatters } from 'date-fns';
import { useContext } from "react";
import OrderContext from "../context/orderContext";
function BookDetails(){
const navigate=useNavigate();
const location = useLocation();
const [highlighted,setHighlighted]=useState(-1);
const [bookID,setBookId]=useState(location.state.book_id)
const [bookDetails,setBookDetails]=useState("");

let currentDate = format(new Date(), 'yyyy-MM-dd');
const {order,csrftoken}=useContext(OrderContext);

const ORDERID=order[0];
const [orderID,setOrderID]=useState(ORDERID?ORDERID: order)

const GetBookDetails= async()=>{
    try{

        let response= await axios.get(`http://localhost:8000/app/book/${bookID}/`,{
            
            headers:{
                "X-CSRFToken":csrftoken  
            }
        });
    
        console.log("response.data to get Book Details  : ",response.data);
        setBookDetails(response.data);

        
    }
    catch(error){
        console.log(error);
    }
};


const handelClick=async (e)=>{
   
   let response=  await axios.post("http://localhost:8000/app/orderBook/",{
    "order":orderID["id"],
    "book":bookDetails.id,
    "added_date":currentDate,
  },{
    headers:{
      "X-CSRFToken":csrftoken
    }
  }).then(response=>{
    
      console.log("You have successfully added new Order Book");
    
      navigate("/cart");
      console.log(response.data)
 
  }) 
  .catch(error=>console.log(error.response.data))
  
  };
useEffect(()=>{
    console.log("BOOK ID : ",bookID);
    GetBookDetails();
  
//     console.log("useEffect is running . ");
//  console.log("GET ORDER ID : ",ORDERID);
//  console.log("GET ORDER : ",order);
//  console.log("useState Order : ",orderID);
},[])


const handelMouse= high=> evt=>{
    setHighlighted(high);
   
  }
  


const HandelRate = (i) => async (evt) => {
  
    try{
        let response=await axios.post(`http://localhost:8000/app/book/${bookDetails.id}/rate_book/`,{
            "stars":i,
        },{
            headers:{
                "X-CSRFToken":csrftoken,
            }
        });
        if (response.status===200){
            console.log(response.data);
            console.log("Ratin is successfully done");
            window.location.reload();

        }
        else{
         console.log("Rating function is not working ");   
        }

        }
        catch(error){
            console.log(error);
        }
        

   
}


const checkOrder=()=>{
    console.log("got order form Order Context :",order);
    console.log("order[1] :",order[1]);
const element=order[1];
console.log("jush checl element",element["id"]);
    
}

useEffect(()=>{
console.log("THİS İS ORDER ID ",orderID);
},{GetBookDetails})

    return(<>
<Header/>
<Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/")}}>  <IoIosArrowRoundBack /></Button>
<Button onClick={checkOrder}>Get order </Button>
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
<Row>
<Col style={{width:"auto",justifyContent:"spaxe-between"}}>
<FaStar  size={20} className={bookDetails.avg_rating >0 ?"orange":""}/>
<FaStar  size={20} className={bookDetails.avg_rating >1 ?"orange":""}/>
<FaStar size={20} className={bookDetails.avg_rating >2 ?"orange":""} />
<FaStar size={20} className={bookDetails.avg_rating >3 ?"orange":""}/>
<FaStar size={20}className={bookDetails.avg_rating >4 ?"orange":""} />
</Col>
<p>{bookDetails.avg_rating}</p>
numbers of Rating : {bookDetails.no_of_ratings}
</Row>
</div>

{/*//////////////  SECONED DİV//////////////// */}


    <div style={{margin:"20px",backgroundColor:"#ffff",width:"68%",height:"500px"}}>
<h2>{bookDetails.title}</h2>
<h5 style={{color:"#A9A9A9"}}> by {bookDetails.author}</h5>

<p style={{margin:"10px",fontWeight:"bold"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
   
<Row>
<p>Rate it </p>
<Col style={{width:"auto",justifyContent:"spaxe-between"}}>


{
                [...Array(5)].map((e,i)=>{
                    return  <FaStar size={30}  key={i}
                     onMouseEnter={handelMouse(i)} 
                    onMouseLeave={handelMouse(-1)} 
                    className={highlighted-i >-1 ?'orange':""} 
                      onClick={HandelRate(i) }
                    />
                })
            }





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