import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { ProvideAuth } from "./providers/auth";
import PrivateRoute from "./routes/AuthRoute";

import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Employees from "./pages/Employees";
import ViewEmployee from "./pages/ViewEmployee";
import CreateEmployee from "./pages/CreateEmployee";
import Organizations from "./pages/Organizations";
import Departments from "./pages/Departments";
import Salaries from "./pages/Salaries";
import Jobs from "./pages/Jobs";
import Leaves from "./pages/Leaves";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <ProvideAuth>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/employees">
          <Employees />
        </PrivateRoute>
        <PrivateRoute path="/employees/:id">
          <ViewEmployee />
        </PrivateRoute>
        <PrivateRoute path="/add-employee">
          <CreateEmployee />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute exact path="/departments">
          <Departments />
        </PrivateRoute>
        <PrivateRoute exact path="/organizations">
          <Organizations />
        </PrivateRoute>
        <PrivateRoute exact path="/salaries">
          <Salaries />
        </PrivateRoute>
        <PrivateRoute exact path="/leaves">
          <Leaves />
        </PrivateRoute>
      </Switch>
    </ProvideAuth>
  );
}

export default App;
