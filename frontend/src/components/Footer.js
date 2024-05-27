import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
function Footer(){
    return(
      
    <footer className="mt-auto py-5 " style={{backgroundColor:"#153448", }}>
   
     <Row style={{justifyContent:"center",paddingLeft:"150px"}}>
            <Col style={{margin:"10px",color:"#ffff"}}><FaInstagram size={40} /> </Col>
            <Col  style={{margin:"10px",color:"#ffff"}}><FaFacebook size={40} /></Col>
            <Col  style={{margin:"10px",color:"#ffff"}}><FaSquareXTwitter size={40} /></Col>
            <Col  style={{margin:"10px",color:"#ffff"}}><MdEmail  size={40}/></Col>
            <Col  style={{margin:"10px",color:"#ffff"}}><FaPhone  size={40}/></Col>
   </Row>
    <div className="container d-flex justify-content-center">
 
      <span className="text-muted"><h6 style={{color:"#ffff",marginTop:"30px"}}>Copyright &copy; Website 2024</h6></span>
    </div>
  </footer>
    );
}
export default Footer;