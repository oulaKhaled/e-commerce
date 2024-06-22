import React, { useEffect } from "react";
import { useState} from "react";
import { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../components/Home";
import { useNavigate } from "react-router-dom";
const Context=createContext("");
export default Context;

  
export const ContextProvider=({children})=>{
  const [orderBooks,setOrderBook]=useState([]);
const [order,setOrder]=useState(""); 
const [currentUser,setCurrentUser]=useState(()=>localStorage.getItem("mytoken")? true: false)
const navigate=useNavigate();
const[Token,SetToken]=useState(()=>localStorage.getItem("mytoken")? localStorage.getItem("mytoken"): null)
const [userID,getUserID]=useState(()=>localStorage.getItem("userID")? localStorage.getItem("userID"): null);


const submitLogin =async (username,password) => {
  
  try{

    let response= await axios.post(`${BASE_URL}/app/login/`, { username, password },{
      withCredentials:true,
      headers:{ "Authorization":` Token ${Token}`}
    });
    console.log(response.data);
    setCurrentUser(true);
    const data=response.data["token"];
    const userid=response.data["user"]
   
  localStorage.setItem("userID",userid.id)
      localStorage.setItem("mytoken",data)


    
  }
  catch(error){
    console.log(error);
  }
      // window.location.reload();


    };
const submitSignup= async (username,password,email)=>{
  
 await axios.post(`${BASE_URL}/app/register/`,{username,password,email},{
    withCredentials:true,
    headers:{ "Authorization":` Token ${Token}`}
    })
  .then(response=>{
    console.log(response.data);
    if(response.status===200){
      console.log("newusername : ",username);
      console.log("email : ",email);
      
      console.log("password : ",password);
      console.log("data from registeration request",response.data);
      const data=response.data["token"];
      localStorage.setItem("mytoken",data)
      SetToken(response.data["token"])
      const userid=response.data["user"]
    localStorage.setItem("userID",userid.id)
    
   
    }
    else{
      alert("Please Enter a vaild username and password")
    }
  })
  .catch(error=>{
    console.error("Something Went Wrong")
  })
  
}



const submitlogout= async()=>{
  localStorage.removeItem("mytoken");
  localStorage.removeItem("userID");
  
  navigate("/auth");
  
}

const getOrder=async()=>{
  try{  
  let response =await axios.get(`${BASE_URL}/app/orders/`,{
    headers:{ "Authorization":` Token ${Token}`}
  });
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
      headers:{ "Authorization":` Token ${Token}`}
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





const context={
  order:order,
  orderBooks:orderBooks,
  // csrftoken:csrftoken,
  getOrder:getOrder,
  createOrder:createOrder,
  Token:Token,
  submitLogin:submitLogin,
  submitSignup:submitSignup,
  submitlogout:submitlogout,
  currentUser:currentUser,
  userID:userID,
};

    return(
        <Context.Provider value={context}>{children}</Context.Provider>
    );
};
