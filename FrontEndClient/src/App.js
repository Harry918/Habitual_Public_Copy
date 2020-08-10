import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './components/pages/dashboard'
import Auth from './components/pages/Auth'
import Routine from './components/pages/routine'
import Intro from './components/pages/intro'
import Home from './components/pages/Home'


//hi tim <3
// hi rishi <3 


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/routine" exact component={Routine} />
        <Route path="/routinePrototype" exact component={Routine} />
        {/* <Route path="/intro" exact component={Intro} /> */}
      </Router>
      
    </div>
  );
}

export default App;
