import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RouteProvider from "../RouteProvider";
import Dashboard from "../../phanquyen/hodan/Dashboard";
import NotfoundPage from "../../components/NotfoundPage";

const HodanRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RouteProvider} />
        <ProtectedRoute exact path="/hodan" component={Dashboard} />
        <ProtectedRoute path="/hodan/*" component={Dashboard} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default HodanRoutes;
