import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/index";
import Info from "./pages/Info/index";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/" component = {Home} />
        <Route exact path ="/info" component = {Info} />
      </Switch>
    </Router>
    );
}

export default App;
