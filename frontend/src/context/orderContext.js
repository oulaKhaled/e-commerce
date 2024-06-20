import React, { useEffect } from "react";
import { useState} from "react";
import { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../components/Home";
const OrderContext=createContext("");
export default OrderContext;

  
export const OrderProvider=({children})=>{
  const [orderBooks,setOrderBook]=useState([]);
const [order,setOrder]=useState(""); 
  
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



const getOrder=async()=>{
  try{  
  let response =await axios.get(`${BASE_URL}/app/orders/`,);
  if (response.status===200){
    const data=response.data;
   if(Array.isArray(data)){
    setOrderBook(data[1]);
    setOrder(data[0]);

   }
   else{
    setOrder(data);
   }

   
          console.log("ORDERS FROM GETORDER METHHOODDD :" ,response.data);
          
  }
  }
  catch(error){
    console.log(error);
  }

}

const createOrder=async()=>{
  try{
    let response =await axios.post(`${BASE_URL}/app/orders/`,{},{
headers:{
  "X-CSRFToken":csrftoken

}
    });
    if (response.status===201){
      console.log("New Order is created ");

    }
  }
  catch (error) {
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


useEffect(()=>{

  // createOrder();
  //console.log("from orderContextPage, created OrderFunction is called");
},[])
useEffect(()=>{
  getOrder();
  // setOrder(order);
  // setOrderBook(orderBooks);
},[]);

useEffect(()=>{
console.log("Order form Order Context : ",order);
console.log("Ordered Book from Order Context",orderBooks);
  
},[getOrder])


const context={
  order:order,
  orderBooks:orderBooks,
  csrftoken:csrftoken,
  getOrder:getOrder,
  createOrder:createOrder

};

    return(
        <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
    );
};
