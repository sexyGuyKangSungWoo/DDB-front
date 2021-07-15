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
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import Todo from './pages/Todo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/thelab" component={Test} />
        <Route path="/todo" exact component={TodoList} />
        <Route path="/todo/:id" component={Todo} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
        <Route path="*" component={Notfound} />
      </Switch>
    </Router>
  )
}

export default App;
