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
import { BASE_URL } from './Home';
function Header({sendDataToHome}){

  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  axios.defaults.withCredentials = true;
  const[username,setusername]=useState("");
  const[password,setPassword]=useState("");
  const[email,setemail]=useState("");
  const[Address,setAddress]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const [profileID,getProfileID]=useState("");
const [token,SetToken]=useState("");
  const [currentUser,setCurrentUser]=useState(false)
const [profile,setProfile]=useState([]);
const [query,setQuery]=useState([]);
  const navigate = useNavigate();
// const {csrftoken}=useContext(OrderContext);
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [userID,getUserID]=useState("");


const Logout= (e)=>{
  e.preventDefault();
 axios.post(`${BASE_URL}/app/logout/`,{},{
  withCredentials:true,

 })
.then(response=>{
  console.log("response to logout function", response.data);

    setCurrentUser(false);
    navigate("/auth");
   
   
 

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

const getToken= async()=>{
  // try{
  //   let response = await axios.get(`${BASE_URL}/app/csrf/`);
  //   console.log(response.data);
  //   SetToken(response.data);
  // } 
  // catch(error){
  //   console.log(error);
  // }
  console.log("IGOT THİS TOKEN : ",csrftoken);
  console.log("COOKİE : ",document.cookie);
 const mytoken= localStorage.setItem("sessionid","lkdflsfd");
 console.log("Maybe this could Work ",mytoken);
}


const UpdateProfile= async(e)=>{
  e.preventDefault();
  try{
    let response= await axios.put(`${BASE_URL}/app/userProfile/${profileID}/`,{
     "username":username,
      "email":email,
      "Address":Address,
      "user":userID.id,
    }
    ,{
withCredentials:true,
    // headers:{ "X-CSRFToken":csrftoken},
      
       });
 
      window.location.reload();
      console.log(response.data);
  
   
  }
catch(error){
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

// ${BASE_URL}/app/users/
  const check_auth= async ()=>{
  try{
    let users= await axios.get(`${BASE_URL}/app/users/`,{
      withCredentials:true,
      headers:{
        'Content-Type': 'application/json',
        "X-CSRFToken":csrftoken
    
      }
    });
     
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

  const getProfile= async()=>{
  
    const profiles= await axios.get(`${BASE_URL}/app/userProfile/get_user_profile/`,{
      // headers:{ "X-CSRFToken":csrftoken},
    });
  try{
    console.log("response from Header to get Profile YUPPPP: ",profiles.data);
    const getDATA=profiles.data
    console.log("get username from getDATA ",getDATA.username);
    console.log("get ID from getDATA ",getDATA.id);
    
    // setusername(getDATA.username);
    // setAddress(getDATA.Address);
    // setemail(getDATA.email);
    // getProfileID(getDATA.id);
 
  setProfile(profiles.data);
  getProfileID(getDATA.id);

  
  } 
  catch(error){
    console.log(error);
  }

    
}

useEffect(()=>{
  setusername(profile.username);
    setAddress(profile.Address);
    setemail(profile.get_email);
    
},[profile])
useEffect(()=>{

 
 
},[])

// 153448 
//0F1035
    return (
        <Navbar className=" justify-content-between" style={{"backgroundColor":"#152A38",width:"100%"}}>
<button onClick={getToken}>Get token</button>
<button onClick={check_auth}>check auth</button>
   
        <Form inline >
      
        <Row>
        <Col>
        <h1  style={{"color":"#ffff"} } className='bebas-neue-regular' onClick={()=>navigate("/")} >Bookstore</h1> 
        </Col>
     
        </Row>
        </Form>
        <Form inline>
        
          <Row>
    
          <Col xs="auto">
            <FaShoppingCart size={40} style={{color:"#ffff"}} onClick={()=>{
              if(currentUser){

                navigate("/cart",{state:{user:userID}})
              
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
     <p style={{margin:"5px",fontWeight:"bold"}}>{profile.get_email}</p>
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
       <label>email</label> <input  style={{margin:"5px",width:"300px"}}  placeholder={profile.get_email} onChange={(evt)=>{setemail(evt.target.value)}}/>        
         <label>Address</label><input  style={{margin:"5px",width:"300px"}}  placeholder={profile.Address} onChange={(evt)=>{setAddress(evt.target.value)}}/>  
       <br/>

       {/* <hr/> */}
      
       </Row>      
       {/* <button onClick={()=>{
      console.log(username);
      console.log(email);
      console.log(Address);
      console.log("USERID : ",userID.id);
      console.log("Profile ID : ",profileID);
      
      
     }}>
      just check 
     </button> */}
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-secondary" onClick={UpdateProfile}>
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