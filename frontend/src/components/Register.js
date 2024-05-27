import React from "react";
import Header from "./Header";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Register(){
    return(<div>
          <Header/>
        <div style={{height:"450px", width:"1000px", backgroundColor:"#ffff", margin:"10px", position:"relative",left:"250px",
        top:"70px"}}>
        <h1 style={{fontFamily:"Oswald, sans-serif", color:"#607274", margin:"15px"}}>Register Page</h1>
        <hr style={{
  height: "5px",
 
  backgroundColor: "#000000",
  color:"#000000",
  border: "none",}}/>

<div style={{margin:"40px"}}>
<p style={{fontWeight:"bolder"}}>Please Enter a valid Username and Password To create BookStore account</p>
<p style={{ marginBottom:"0" ,fontWeight:"bolder"}}>Username</p>
<input style={{width:"300px"}} id="inputPassword5"/>
<p style={{ marginBottom:"0",fontWeight:"bolder"}}>password</p>
<input  style={{width:"300px",fontWeight:"bolder"}}/>
<p style={{ marginBottom:"0",fontWeight:"bolder"}}> Confirm password</p>
<input  style={{width:"300px"}}/>

<button style={{margin:"10px"}}>Register</button>

<p style={{fontWeight:"bolder"}}>already have an acoount?<a href="/login" >Login here</a> </p>
</div>

        </div>
    </div>);

};
export default Register;