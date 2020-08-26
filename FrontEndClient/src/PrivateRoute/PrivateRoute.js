
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

const PrivateRoute = ({component: Component, ...rest }) => {
    const auth = useSelector(state => state.firebase.auth);
    console.log(localStorage.getItem('uid'))
    console.log(auth)
    return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('uid') && localStorage.getItem('uid').length > 2 ? (
            <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login"
          />
        )
      }
    />
  );
};
export default PrivateRoute;