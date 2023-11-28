import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../home';
import CreateUser from '../createuser';
import EditUser from '../edituser';
import ShowUser from '../showUser'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/createuser' component={CreateUser} />
          <Route path='/edituser/:userId' component={EditUser} />
          <Route path='/showUser/:userId' component={ShowUser} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
