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
      
    <footer className="mt-auto py-5 " style={{backgroundColor:"#152A38",  
  width:"100%",
  height:"auto",

  bottom:"0"
 

  
  }}>

     <Row style={{justifyContent:"center",marginLeft:"150px"}}>
            <Col style={{color:"#ffff"}}><FaInstagram size={30} />
            </Col>
            <Col  style={{color:"#ffff"}}><FaFacebook size={30} /></Col>
            <Col  style={{color:"#ffff"}}><FaSquareXTwitter size={30} /></Col>
            <Col  style={{color:"#ffff"}}><MdEmail  size={30}/></Col>
            <Col  style={{color:"#ffff"}}><FaPhone  size={30}/></Col>
   </Row>
   <Row style={{justifyContent:"center",marginLeft:"150px"}}>
            <Col style={{color:"#ffff",position:"relative",margin:"10px",right:"3%"}}>WeBookStore
            </Col>
            <Col  style={{color:"#ffff",position:"relative",margin:"10px",right:"5%"}}>WeBookStore.FaceBook</Col>
            <Col  style={{color:"#ffff",position:"relative",margin:"10px",right:"3%"}}>@WeBookStore.X</Col>
            <Col  style={{color:"#ffff",position:"relative",margin:"10px",right:"5%"}}>WeBookStore@gmail.com</Col>
            <Col  style={{color:"#ffff",position:"relative",margin:"10px",right:"1%"}}>+2 984 990 </Col>
   </Row>
    <div className="container d-flex justify-content-center">
 
      <span className="text-muted"><h6 style={{color:"#ffff",marginTop:"30px"}}>Copyright &copy; Website 2024</h6></span>
    </div>
  </footer>
    );
}
export default Footer;