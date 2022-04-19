import React from 'reactn'
import { Route, Redirect } from "react-router-dom";

const CustomerRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.usertoken;
    const user_role = localStorage.user_role;

    const getComponent = (props) => {
        if (!user  || user_role !== "customer") {
            return (
                <Redirect
                    to={{ pathname: "/customer/login", state: { from: props.location } }}
                />
            )
        }
        
        return <Component {...props} />

    }

    return (
        <Route {...rest} render={props => getComponent(props)} />
    )
}

export default CustomerRoute;
