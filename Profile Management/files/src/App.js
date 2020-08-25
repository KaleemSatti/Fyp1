import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard/Dashboard';
import SignInDriver from './SignInDriver';
import SignUpDriver from './SignUpDriver';

function App(){
    return (
      <Router >
        <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route path="/SignUp" component={SignUp}/>
          <Route path="/AdminDashboard" component={Dashboard}/>
          <Route path="/Driver/SignIn" component={SignInDriver}/>
          <Route path="/Driver/SignUp" component={SignUpDriver}/>
        </Switch>
      </Router>
  );
}

export default App;
