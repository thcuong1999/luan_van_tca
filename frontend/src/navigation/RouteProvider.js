import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import BophankdRoutes from "./BophankdRoutes";
import NotfoundPage from "../components/NotfoundPage";
import Daily1Routes from "./Daily1Routes";
import Daily2Routes from "./Daily2Routes";
import GsvRoutes from "./GsvRoutes";
import HodanRoutes from "./HodanRoutes";
import LoginPage from "../components/pages/LoginPage";

const RouteProvider = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/bophankd" component={BophankdRoutes} />
        <Route path="/giamsatvung" component={GsvRoutes} />
        <Route path="/daily1" component={Daily1Routes} />
        <Route path="/daily2" component={Daily2Routes} />
        <Route path="/hodan" component={HodanRoutes} />
        <Route path="*" component={NotfoundPage} />
      </Switch>
    </Router>
  );
};

export default RouteProvider;
