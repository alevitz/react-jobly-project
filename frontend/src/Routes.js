import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Company from "./Company";
import Login from "./Login";
import Profile from "./Profile";

function Routes({ setToken }) {
  return (
    <div className="pt-5">
      <Switch >
        <Route exact path="/companies/:handle">
          <Company />
        </Route>
        <Route exact path="/companies">
          <Companies />
        </Route>
        <Route exact path="/jobs">
          <Jobs />
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;