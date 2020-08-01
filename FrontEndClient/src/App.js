import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Dashboard from './components/pages/dashboard'

//hi tim <3
// hi rishi <3 
function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Dashboard} />
      </Router>
      
    </div>
  );
}

export default App;
