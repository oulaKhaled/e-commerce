import React from "react";
import Row from "react-bootstrap/esm/Row";
import Header from "./Header";
import './../../src/App.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
function AuthPage(){
axios.defaults.withCredentials = true;
const navigate =useNavigate()
const [registrationToggle, setRegistrationToggle] = useState(true);
const [username,setusername]=useState("");
const [password,setPassword]=useState("");

const[email,setEmail]=useState("");



function update_form_btn(e) {
    e.preventDefault();
    if (registrationToggle) {
      setRegistrationToggle(false);
    } else {
      setRegistrationToggle(true);
    }
  }




  const submitLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/app/login/', { username, password })
        .then(response => {
            console.log(response.data);
            navigate("/");
           
        })
        .catch(error => {
            console.error('There was an error logging in!', error);
        });
};
const submitRegisteration=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/app/register/",{username,password,email})
    .then(response=>{
      console.log(response.data);
      if(response.status===200){
        console.log("newusername : ",username);
        console.log("email : ",email);
        
        console.log("password : ",password);
        
        axios.post('http://localhost:8000/app/login/', { username, password })
        .then(response => {
            console.log(response.data);
            navigate("/");
           
        })
        .catch(error => {
            console.error('There was an error logging in!', error);
        });
      }
      else{
        alert("Please Enter a vaild username and password")
      }
    })
    .catch(error=>{
      console.error("Something Went Wrong")
    })
    
  }

return(
    <div>

<Header/>
    <div className="mycart">
{
    registrationToggle?(  
        <>
    <h1 className="mycart-title" >Login Page</h1>
    <hr style={{
height: "5px",

backgroundColor: "#000000",
color:"#000000",
border: "none",}}/>

<div style={{margin:"40px"}}>
<p style={{fontWeight:"bolder"}}>Please Enter You Username and Password To access your BookStore account</p>
<p className="mycart-p">Username</p>
<input style={{width:"300px"}}  onChange={(evt)=>{
setusername(evt.target.value)
}}/>
<p className="mycart-p">password</p>
<input  style={{width:"300px"}} type="password"  onChange={(evt)=>{
setPassword(evt.target.value)}}/>
<button style={{margin:"10px"}} onClick={submitLogin}  >Login</button>

<p style={{fontWeight:"bolder"}}>Don't have an acoount ?<a href="/register" id="form_btn" onClick={update_form_btn}>Register here</a> </p>
</div>
</>
):(
        <>        <h1 className="mycart-title">Register Page</h1>
    <hr />
  <div style={{margin:"40px"}}>
  <p style={{fontWeight:"bolder"}}>Please Enter a valid Username and Password To create BookStore account</p>
  <p className="mycart-p">Username</p>
  <input style={{width:"300px"}} id="inputPassword5" onChange={(e)=>{setusername(e.target.value)}}/>
  <p className="mycart-p">Email</p>
  <input  style={{width:"300px"}} type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
  
  <p className="mycart-p">password</p>
  <input  style={{width:"300px",fontWeight:"bolder"}} type="password"  onChange={(e)=>{setPassword(e.target.value)}}/>
  
  <button style={{margin:"10px"}} onClick={submitRegisteration} >Register</button>
  <p style={{fontWeight:"bolder"}}>already have an acoount?<a href="/login" id="form_btn" onClick={update_form_btn}>Login here</a> </p>
  </div>
  </>
    )
    }

</div>

</div>

);
}

export default AuthPage;