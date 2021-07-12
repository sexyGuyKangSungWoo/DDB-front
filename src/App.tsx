import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Main from './pages/Main';
import Test from './pages/Test';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Notfound from './pages/Notfound';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/thelab">
          <Test />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
