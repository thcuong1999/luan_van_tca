import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "../../phanquyen/daily1/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import NotfoundPage from "../../components/NotfoundPage";

const Daily1Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/daily1" component={Dashboard} />
        <ProtectedRoute path="/daily1/*" component={Dashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default Daily1Routes;
