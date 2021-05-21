import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./components/pages/Register"
import Welcome from "./components/pages/Welcome"
import Login from "./components/pages/Login"

export const CredentialsContext = React.createContext(null);

function App() {
  const CredentialsState = useState(null);

  return (
    <div className="App">
      <CredentialsContext.Provider value={CredentialsState}>
        <Router>
          <Switch>

            <Route exact path='/'>
              <Welcome />
            </Route>

            <Route exact path='/register'>
              <Register />
            </Route>

            <Route exact path='/login'>
              <Login />
            </Route>

          </Switch>
        </Router>
      </CredentialsContext.Provider>

    </div>
  );
}

export default App;
