import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaShoppingCart } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import axios from 'axios';

function Header(){
  const [currentUser,setCurrentUser]=useState(false)
const [username,setusername]=useState("");

  const navigate = useNavigate();

  const check_auth= async ()=>{
  
     axios.get("http://localhost:8000/app/users/")
     .then(response=>{
      if(response.status===202){
        console.log("response from header page: ",response.data);
        const userData = response.data; // axios automatically parses JSON responses
        setusername(userData["user"])
          setCurrentUser(true);
         
      }
      else{
      setCurrentUser(false);
      }
  })
  .catch(error=>{
      console.log("Something went wrong");
  })
    
}
useEffect(()=>{

  check_auth()
},[])


    return (
        <Navbar className=" justify-content-between" style={{"backgroundColor":"#153448",width:"100%"}}>
        <Form inline >
        <Row>
        <h1  style={{"color":"#ffff",fontFamily:"Oswald, sans-serif"} } onClick={()=> navigate("/")} >Bookstore</h1> 
        <Col></Col>
        </Row>
        </Form>
        <Form inline>
        
          <Row>
          <Col xs="auto">
            <FaShoppingCart size={40} style={{color:"#ffff"}} onClick={()=>{navigate("/cart")}} />
            </Col>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
              />
            </Col>
         
            <Col xs="auto">
              <Button type="submit " variant="outline-light" ><FaSearch/></Button>
            </Col>
           
            <Col xs="auto">
            {
              currentUser?(<h3 style={{marginRight:"17px",color:"#ffff"}}>{username && username.username}</h3> ):(<Button style={{marginRight:"17px"}} type="submit " variant="outline-light" onClick={()=>navigate("/auth")}>Login</Button>)
            }
       
         
       
         </Col>

          </Row>
      
         
        </Form>
      </Navbar>
    );
}


export default Header;

// {username && username.map(element=>(
//   <p>{element.username}</p>

// ))}