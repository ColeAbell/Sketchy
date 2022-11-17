import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


import Home from './components/Home';
import NotFound from './components/NotFound';


function App() {


  return (

  

    <Router>
      
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

    </Router>


  );
}

export default App;
