import React from 'react';
import HomePage from '../src/pages/homepage/homepage.jsx'
import './App.css';
import { Switch, Route } from 'react-router-dom';

const Hats = () => (
  <div>
  <h1>Hats</h1>
  </div>
)

function App() {
  return (
    <Switch>
      <Route exact path='/hats' component={Hats}/>
      <Route exact path='/' component={HomePage}/>
    </Switch>
  );
}

export default App;
