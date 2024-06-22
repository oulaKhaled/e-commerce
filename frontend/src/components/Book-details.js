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
import Context from "../context/context";
import { BASE_URL } from "./Home";
function BookDetails(){
const navigate=useNavigate();
const location = useLocation();
const [highlighted,setHighlighted]=useState(-1);
const [bookID,setBookId]=useState(location.state.book_id)
const [bookDetails,setBookDetails]=useState("");

let currentDate = format(new Date(), 'yyyy-MM-dd');

const {order,csrftoken,createOrder,getOrder,orderBooks,Token}=useContext(Context);

const ORDERID=order[0];
// const [orderID,setOrderID]=useState(order);

const orderID=order;

const GetBookDetails= async()=>{
    try{

        let response= await axios.get(`${BASE_URL}/app/book/${bookID}/`,{
            
          headers:{ "Authorization":` Token ${Token}`}
        });
    if(response.status===200){
        // if(ORDERID){
        //     setOrderID(ORDERID);
        // }
        // else{
        //     setOrderID(order);
        // }
        console.log("200");
    }


        console.log("response.data to get Book Details  : ",response.data);
      
        setBookDetails(response.data);

        
    }
    catch(error){
        console.log(error);
    }
};
useEffect(()=>{

if(!order){

    createOrder();
   
} // setOrderID(order);
    
 
},[]);


const addNewBook= async()=>{
  try{


        let response=  await axios.post(`${BASE_URL}/app/orderBook/`,{
            "order":orderID["id"],
            "book":bookDetails.id,
            "added_date":currentDate,
          },{
         headers:{ "Authorization":` Token ${Token}`}
          }).then(response=>{
        
            console.log("You have successfully added new Order Book");
        //   navigate("/cart");
        getOrder();
            console.log(response.data)
      navigate("/cart");
      
        }) ;
    }
        catch(error){

     
            if(error.response) {
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


const handelClick=async (e)=>{
    e.preventDefault();


  
addNewBook();
 

  
  };
useEffect(()=>{
    console.log("BOOK ID : ",bookID);
    GetBookDetails();
  

},[])


const handelMouse= high=> evt=>{
    setHighlighted(high);
   
  }
  


const HandelRate = (i) => async (evt) => {
  
    try{
        let response=await axios.post(`${BASE_URL}/app/book/${bookDetails.id}/rate_book/`,{
            "stars":i,
        },{
            headers:{
                "X-CSRFToken":csrftoken,
            }
        });
        if (response.status===200){
            console.log(response.data);
            console.log("Ratin is successfully done");
            console.log("page must be refreshed");
            
            //window.location.reload();

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
    console.log("orrrrderrrr idddd : ",orderID);

console.log("This is Ordered Books",orderBooks);

    
}


useEffect(()=>{



console.log("THİS İS ORDER ID FROM USEEFFECT  ",orderID);
getOrder();
// setOrderID(order);
},[])

    return(<>
<Header/>
<Button variant="outline-dark" style={{margin:"10px"}}  onClick={()=>{navigate("/")}}>  <IoIosArrowRoundBack /></Button>
{/* <Button onClick={checkOrder}>Get order </Button> */}
<Row>
{/*//////////////  FİRST DİV//////////////// */}




<div style={{backgroundColor:"#ffff",width:"400px",height:"500px",borderRadius:"20px",position:"relative",left:"50px",paddingLeft:"20px",margin:"10px",bottom:"10px"}}>

<Row>
<img src={bookDetails.image} style={{width:"auto",margin:"20px",height:"300px",marginLeft:"60px"}}/>

</Row>

<Row  style={{margin:"5px"}}>
   <Col> <h4>${bookDetails.price}</h4> </Col>
    <Col><Button style={{position:"abseloute",top:"90px",width:"180px"}} variant="outline-dark" onClick={handelClick}>Add to cart</Button></Col>
</Row>
<Row style={{marginTop:"20px"}}>
<Col style={{width:"auto",justifyContent:"spaxe-between"}}>
<FaStar  size={25} className={bookDetails.avg_rating >0 ?"orange":""}/>
<FaStar  size={25} className={bookDetails.avg_rating >1 ?"orange":""}/>
<FaStar size={25} className={bookDetails.avg_rating >2 ?"orange":""} />
<FaStar size={25} className={bookDetails.avg_rating >3 ?"orange":""}/>
<FaStar size={25}className={bookDetails.avg_rating >4 ?"orange":""} />

</Col>
<Col style={{position:"relative",right:"40px"}}>
<h2>{bookDetails.avg_rating}</h2>
</Col>


</Row>
<p style={{fontWeight:"bolder"}}>
{bookDetails.no_of_ratings} Ratings </p>
</div>

{/*//////////////  SECONED DİV//////////////// */}


    <div style={{margin:"10px",backgroundColor:"#ffff",width:"50%",height:"500px",borderRadius:"20px",position:"relative",left:"150px",padding:"30px",bottom:"10px"}}>
<h2>{bookDetails.title}</h2>
<h5 style={{color:"#454545"}}> by {bookDetails.author}</h5>

<p style={{margin:"10px",fontWeight:"bold"}}>{bookDetails.content}</p>
   
<Row>
<h4 style={{fontFamily:"Bebas Neue"}}>Rate it </h4>
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

<h4  style={{marginTop:"30px",fontFamily:"Bebas Neue",}}>
  category : <p style={{color:"red"}}>{bookDetails.category}</p>
</h4>
    


</Row>



    </div>
{/*  THE END OF ROW */}




</Row>

<Footer/>
    </>)
}

export default BookDetails;