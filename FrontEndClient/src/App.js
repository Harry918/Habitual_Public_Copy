import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/pages/dashboard'
import Auth from './components/pages/Auth'
import Routine from './components/pages/routine'
import Intro from './components/pages/intro'
import Home from './components/pages/Home'
import PrivateRoute from './PrivateRoute/PrivateRoute.js'


//hi tim <3
// hi rishi <3 


function App() {
  return (
    <div className="App">
      <Router>
            <Route path="/login"><Auth/></Route>
              <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
              <PrivateRoute path="/routine" component={Routine}></PrivateRoute>
        </Router>
      
    </div>
  );
}

export default App;
