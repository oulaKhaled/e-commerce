import React, { Profiler, useEffect } from 'react';
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
import Image from 'react-bootstrap/Image';
import Myimage from '../images/profile.png'
import OrderContext from '../context/orderContext';
import { useContext } from 'react';
import { MdModeEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

function Header({sendDataToHome}){

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
  const[username,setusername]=useState("");
  const[password,setPassword]=useState("");
  const[email,setemail]=useState("");
  const[Address,setAddress]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  

  const [currentUser,setCurrentUser]=useState(false)
const [profile,setProfile]=useState([]);
const [query,setQuery]=useState([]);
  const navigate = useNavigate();
const {csrftoken}=useContext(OrderContext);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [userID,getUserID]=useState("");


const Logout= (e)=>{
  e.preventDefault();
 axios.post("http://localhost:8000/app/logout/",{},{
  withCredentials:true,

 })
.then(response=>{
  console.log("response to logout function", response.data);

    setCurrentUser(false);
    navigate("/login");
   
 

})
.catch(error=>console.log(error))
// try{
  
// }
// catch(error){
//   console.log(error);
// } 
  
}
 
const handelClick=()=>{
  sendDataToHome(query)
}



const UpdateProfile= async(e)=>{
  e.preventDefault();
  try{
    let response= await axios.put(`http://localhost:8000/app/userProfile/${userID.id}/`,{
     "username":username,
      "email":email,
      "Address":Address,
      "user":userID.id,
    
    },{
      withCredentials:true,
     headers:{   "X-CSRFToken":csrftoken  },
   
    });
 
      window.location.reload();
      console.log(response.data);
  
   
  }
catch(error){
  console.log(error);
}
}

  const check_auth= async ()=>{
  try{
    let users= await axios.get("http://localhost:8000/app/users/");
     
    if(users.status===202){
      console.log("get user :  ",users.data);// axios automatically parses JSON responses
      getUserID(users.data["user"])
      getProfile();
       
        setCurrentUser(true);
       
    }
    else{
    setCurrentUser(false);
    }
  }
  catch(error){
    console.log(error);
  }
    
  }

  const getProfile= async()=>{
  
    const profiles= await axios.get("http://localhost:8000/app/userProfile/get_user_profile/");
  try{
    console.log("response from Header to get Profile YUPPPP: ",profiles.data);
    const getDATA=profiles.data
    console.log("get username frım getDATA ",getDATA.username );
    setusername(getDATA.username);
    setAddress(getDATA.Address);
    setemail(getDATA.email);
  
  setProfile(profiles.data);

  
  } 
  catch(error){
    console.log(error);
  }

    
}

// useEffect(()=>{

//   //setusername(profile.username);
//   // setAddress(profile.Address);
//   // setemail(profile.email);
//   console.log("userId data : ",userID);
// },[getProfile])

useEffect(()=>{

  check_auth()
},[])


    return (
        <Navbar className=" justify-content-between" style={{"backgroundColor":"#153448",width:"100%"}}>
     
   
        <Form inline >
      
        <Row>
        <Col>
        <h1  style={{"color":"#ffff",fontFamily:"Oswald, sans-serif"} } onClick={()=>window.location.reload()} >Bookstore</h1> 
        </Col>
     
        </Row>
        </Form>
        <Form inline>
        
          <Row>
    
          <Col xs="auto">
            <FaShoppingCart size={40} style={{color:"#ffff"}} onClick={()=>{
              if(currentUser){

                navigate("/cart");
              
              }
              else{
                navigate("/auth");
              }
              }} />
            </Col>
            <Col xs="auto">
            {
              currentUser?(
                
                <Dropdown>
   <Dropdown.Toggle variant="outline-light">
   <FaUser />
           </Dropdown.Toggle>
      <Dropdown.Menu style={{width:"260px",height:"250px"}}>
   <Row>
   <Col><Image src={Myimage} roundedCircle  style={{width:"80px",margin:"10px"}}/></Col>
   <Col> <h3 style={{marginLeft:"10px",marginTop:"10px"}}>{profile.username}</h3></Col>
   </Row>
     <br/>
     <Col  xs={1} md={1} >
        
        </Col>
     <p style={{margin:"5px",fontWeight:"bold"}}>{profile.email}</p>
     <p style={{margin:"5px"}}>{profile.Address}</p>
     
     <Button variant="outline-danger" style={{bottom:"10px",position:"absolute",left:"15px"}} onClick={Logout}>Logout</Button>
     <Button variant="outline-success" style={{bottom:"10px",position:"absolute",right:"5px"}}  onClick={handleShow}><MdModeEdit /></Button>
    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Row>
      <label>username</label> <input style={{margin:"5px",width:"300px"}} placeholder={profile.username} onChange={(evt)=>{setusername(evt.target.value)}}/>        
       <label>email</label> <input  style={{margin:"5px",width:"300px"}}  placeholder={profile.email} onChange={(evt)=>{setemail(evt.target.value)}}/>        
         <label>Address</label><input  style={{margin:"5px",width:"300px"}}  placeholder={profile.Address} onChange={(evt)=>{setAddress(evt.target.value)}}/>  
       <br/>

       <hr/>
      
       </Row>      
     <button onClick={()=>{
      console.log(username);
      console.log(email);
      console.log(Address);
      console.log(userID);
      
      
     }}>
      just check 
     </button>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     </Dropdown.Menu> 
   </Dropdown>            
               ):(<Button style={{marginRight:"17px"}} type="submit " variant="outline-light" onClick={()=>navigate("/auth")}>Login</Button>) }
   
        </Col>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                onChange={(e)=>{setQuery(e.target.value)}}
              />
   
          
            </Col>
         
            <Col xs="auto">
            <Button variant="outline-light" onClick={handelClick} ><FaSearch/></Button>
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