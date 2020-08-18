import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './components/pages/dashboard'
import Auth from './components/pages/Auth'
import Routine from './components/pages/routine'
import Intro from './components/pages/intro'
import Home from './components/pages/Home'
import PrivateRoute from './PrivateRoute/PrivateRoute.js'
import RoutinePrototype from './components/pages/routinePrototype'
import PersonalRoutine from './components/pages/PersonalRoutine'
import SignUp from './components/pages/SignUp'
import Graph from './components/pages/graph'


//hi tim <3
// hi rishi <3 


function App() {
  return (
    <div className="App">
      <Router>
            <Route path="/login"><Auth/></Route>
              <Route exact path="/" component={Dashboard}></Route>
              <Route exact path="/home" component={Home}></Route>
              <Route path="/routine" component={Routine}></Route>
              <Route path="/intro" component={Intro}></Route>
              <Route path="/routinePrototype" component={RoutinePrototype}></Route>
              <Route path="/PersonalRoutine" component={PersonalRoutine}></Route>
              <Route path="/signUp" component={SignUp}></Route>
              <Route path="/graph" component={Graph}></Route>

             
        </Router>
      
    </div>
  );
}

export default App;
