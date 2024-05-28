import React from 'react';
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

import { FaUser } from "react-icons/fa";
function Header(){
  const navigate = useNavigate();
    return (
        <Navbar className=" justify-content-between " style={{"backgroundColor":"#153448"}}>
        <Form inline style={{margin:"7px"}}>
        <h1  style={{"color":"#ffff",fontFamily:"Oswald, sans-serif"} } onClick={()=> navigate("/")} >Bookstore</h1> 
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
         <Button  type="submit " variant="outline-light" onClick={()=>navigate("/auth")}>Login</Button>
         </Col>
         
         
          </Row>
        </Form>
      </Navbar>
    );
}


export default Header;