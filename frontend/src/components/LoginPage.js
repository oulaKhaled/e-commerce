import React from "react";
import Row from "react-bootstrap/esm/Row";
import Header from "./Header";

function Login(){


    return(
        <>        
        <Header/>
        <div style={{height:"450px", width:"1000px", backgroundColor:"#ffff", margin:"10px", position:"relative",left:"250px",
        top:"70px"}}>
        <h1 style={{fontFamily:"Oswald, sans-serif", color:"#607274", margin:"15px"}}>Login Page</h1>
        <hr style={{
  height: "5px",
 
  backgroundColor: "#000000",
  color:"#000000",
  border: "none",}}/>

<div style={{margin:"40px"}}>
<p style={{fontWeight:"bolder"}}>Please Enter You Username and Password To access your BookStore account</p>
<p style={{ marginBottom:"0" ,fontWeight:"bolder"}}>Username</p>
<input style={{width:"300px"}}/>
<p style={{ marginBottom:"0" ,fontWeight:"bolder"}}>password</p>
<input  style={{width:"300px"}}/>
<button style={{margin:"10px"}}>Login</button>

<p style={{fontWeight:"bolder"}}>Don't have an acoount ?<a href="/register" >Register here</a> </p>
</div>

        </div>
        </>

    );
}

export default Login