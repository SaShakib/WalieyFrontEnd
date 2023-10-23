import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        const superAdmin = window.localStorage.getItem('superAdmin');
        

        if(token && superAdmin === "true"){
            return <Component {...props} />
        }else{
            return <Redirect  to="/SuperAdmin/Login" />
        }
    }} />
}

export default PrivateRoute;