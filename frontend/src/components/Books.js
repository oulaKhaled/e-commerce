import React from "react";
import Col from "react-bootstrap/esm/Col";

import Row from "react-bootstrap/esm/Row";
function Books(){
    return(
        <div>
<Row style={{justifyContent:"center",alignItems:"center"}}>
    <Col >
    <p>Book Title</p>
        First Book
    </Col>
    
    <Col >
    
    <p> Book Title</p>
        Seconed Book
    </Col>
    <Col >
    
    <p> Book Title</p>
        Third Book
    </Col>
    <Col >
    
    <p> Book Title</p>
        Fourth Book
    </Col>
    <Col >
    
    <p> Book Title</p>
        Fifth Book
    </Col> <Col >
        
    <p>Book Title</p>
        Sixth Book
    </Col>
   
</Row>
        </div>



    );
}

export default Books;