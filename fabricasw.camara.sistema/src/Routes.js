import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import StoreProvider from "./components/store/Provider";
import PrivateRoute from "./components/routes/private/Private";

import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import NewSchedule from "./components/pages/NewSchedule";
import SchedulesOpen from "./components/pages/SchedulesOpen";
import SchedulesComplete from "./components/pages/SchedulesComplete";
import SchedulesCancel from "./components/pages/SchedulesCancel";
import SchedulesPending from "./components/pages/SchedulesPending";
import Details from "./components/pages/Details";
import Dashboard from "./components/pages/Dashboard";
import UsersManager from "./components/pages/UsersManager";
import UserNew from "./components/pages/UserNew";
import UserUpdate from "./components/pages/UserUpdate";
import Config from "./components/pages/Config";


export default function Routes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Switch>
          <Route exact 
          path="/" 
          component={Login} 
          />
          <Route exact 
          path="/ForgotPassword" 
          component={ForgotPassword} 
          />
          <PrivateRoute 
          path="/NewSchedule" 
          component={NewSchedule} 
          />
          <PrivateRoute 
          path="/SchedulesOpen" 
          component={SchedulesOpen} 
          />
          <PrivateRoute
            path="/SchedulesComplete"
            component={SchedulesComplete}
          />
          <PrivateRoute 
          path="/SchedulesCancel" 
          component={SchedulesCancel} 
          />
          <PrivateRoute 
          path="/SchedulesPending" 
          component={SchedulesPending} 
          />
          <PrivateRoute 
          path="/Dash" 
          component={Dashboard} 
          />
          <PrivateRoute 
          path="/UsersManager" 
          component={UsersManager} 
          />
          <PrivateRoute 
          path="/Config" 
          component={Config} 
          />
          <PrivateRoute
          path="/Details"
          component={Details}
          />
          <PrivateRoute
          path="/UserNew"
          component={UserNew}/>
          <PrivateRoute
          path="/UserUpdate"
          component={UserUpdate}/>
        </Switch>
      </StoreProvider>
    </BrowserRouter>
  );
}
