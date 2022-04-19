import React from "reactn";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.usertoken;
  const user_role = localStorage.user_role;

  const getComponent = (props) => {
    if (!user) {
      return (
        <Redirect
          to={{ pathname: "/", state: { from: props.location } }}
        />
      );
    } else if (
      user_role &&
      user_role === "admin"
    ) {
      <Redirect
        exact to={{ pathname: "/admin/home", state: { from: props.location } }}
      />
    } else if (
      user_role &&
      user_role === "customer"
    ) {
      <Redirect
        exact to={{ pathname: "/customer/home", state: { from: props.location } }}
      />
    }

    return <Component {...props} />;
  };

  return <Route {...rest} render={(props) => getComponent(props)} />;
};

export default PrivateRoute;
