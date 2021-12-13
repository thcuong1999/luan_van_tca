import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";
import NoPermission from "../../components/NoPermission";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      // Render props allows conditional rendering
      render={(props) =>
        userInfo && userInfo.vaitro === "hodan" ? (
          <Component {...props} />
        ) : (
          <NoPermission />
        )
      }
    />
  );
};

export default ProtectedRoute;
