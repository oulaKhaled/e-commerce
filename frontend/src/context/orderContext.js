import React, { useEffect } from "react";
import { useState} from "react";
import { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../components/Cart";

const OrderContext=createContext("");
export default OrderContext;

  
export const OrderProvider=({children})=>{
  const [orderBook,setOrderBook]=useState([]);
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

const GetOrder = async ()=>{
        try{
          let response =await axios.get("http://localhost:8000/app/orders/order_by_user/");
          // setOrderBook(response.data[0])
          // setOrder(response.data[1])
          if(response.status===200 || response.status===202){
            setOrder(response.data);
            console.log("response form ordercontext component : ",response.data);
        
           
          }
          else{
            console.log("Something went wrong ");
          }
       
        }
        catch(error){
          console.log(error);
        }
        
      };

useEffect(()=>{
GetOrder();
console.log("Order from Order Context");
},[])
useEffect(()=>{

  console.log("Order form OrderContext : ",order);
},[GetOrder])

const context={
  order:order,
  csrftoken:csrftoken
};

    return(
        <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
    );
};
