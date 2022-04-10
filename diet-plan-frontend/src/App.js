import { Bedtime } from "@mui/icons-material";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Views
import Login from "./views/authentication/Login";
import Signup from "./views/authentication/Signup";

import CreateDiet from "./views/diet-plan/CreateDiet";

import DietSchedule from "./views/diet-plan/DietSchedule";

import Bmi from "./views/diet-plan/Bmi";

import Home from "./views/Home";

// Authenticated User Routes
// import Home from "./Home"
// import { getAuthInfo } from "./shared/helpers"
// import AllReviews from "./views/dashboard/detail_pages/AllReviews"

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/signup/"
          exact
          render={(props) => {
            return <Signup {...props} />;
          }}
        />
        <Route
          path="/login/"
          exact
          render={(props) => {
            return <Login {...props} />;
          }}
        />

        <Route
          path="/home/"
          exact
          render={(props) => {
            return <Home {...props} />;
          }}
        />
        <Route
          path="/createDiet/"
          exact
          render={(props) => {
            return <CreateDiet {...props} />;
          }}
        />

        <Route
          path="/dietSchedule/"
          exact
          render={(props) => {
            return <DietSchedule {...props} />;
          }}
        />

        <Route
          path="/bmi/"
          exact
          render={(props) => {
            return <Bmi {...props} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
