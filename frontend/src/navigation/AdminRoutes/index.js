import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../../phanquyen/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const AdminRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/admin" component={Dashboard} />
        <ProtectedRoute path="/admin/*" component={Dashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default AdminRoutes;
