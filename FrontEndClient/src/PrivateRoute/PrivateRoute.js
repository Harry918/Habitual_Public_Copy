
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector } from "react-redux";

const PrivateRoute = ({component: Component, ...rest }) => {
    const auth = useSelector(state => state.firebase.auth);
    console.log(auth)
    return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoaded===true && auth.isEmpty === false ? (
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