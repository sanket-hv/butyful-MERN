import React from "react";
import { Route, Redirect  } from "react-router-dom";
import { getToken } from './Common';

function PrivateRoute({ component: Component, flgIsPermission, ...rest }){
    return (
        <Route 
            {...rest}
            render = {(props) => getToken() ?  flgIsPermission ? <Component {...props}/> : <Redirect to={{pathname: '/access-denied', state : {from : props.location}}}/>  : <Redirect to={{ pathname:'/login', state: {from: props.location} }}/>}
        />

    );
}

export default PrivateRoute;