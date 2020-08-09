import React from 'react';
import { Alert } from "react-bootstrap";

function AccessDeniedComponent(props){
    console.log(props);
    return(
        <div>
          

            <Alert variant='danger'>
            Access Denied - You don't have to access this page
            &nbsp;&nbsp;&nbsp;
            <a href='home'>Go Back</a>
            </Alert>
            
        </div>
    );
}

export default AccessDeniedComponent;