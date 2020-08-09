import React from "react";
import { Alert } from "react-bootstrap";

function NotFound(props){
    return(
        <div>
            <Alert variant='danger'>
                404 - The resouce which you are looking for is not found
            </Alert>
        </div>
    );
}

export default NotFound;