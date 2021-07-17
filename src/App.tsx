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
import SignUp from './pages/SignUp';
import SearchResult from './pages/SearchResult';
import Detail from './pages/Detail';
import MyInfo from './pages/MyInfo';
import AddPage from './pages/AddPage';
import PreviousVersionPage from './pages/PreviousVersionPage';
import Editpage from './pages/EditPage';
import RandomAPI from './pages/RandomAPI';
import HistoryDetail from './pages/HistoryDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/thelab" component={Test} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/logout" component={Logout} />
        <Route path="/search" component={SearchResult} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/detail/:id/edit" component={Editpage} />
        <Route path="/detail/:id/history" exact component={PreviousVersionPage} />
        <Route path="/detail/:id/history/:v" component={HistoryDetail} />
        <Route path="/randomapi" component={RandomAPI} />
        <Route path="/myinfo" component={MyInfo} />
        <Route path="/addpage" component={AddPage} />
        <Route path="/test" component={Test} />
        <Route path="*" component={Notfound} />
      </Switch>
    </Router>
  )
}

export default App;
