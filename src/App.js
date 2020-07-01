import React from 'react';
import HomePage from '../src/pages/homepage/homepage.jsx'
import ShopPage from './pages/shop/shop.jsx'
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx'


import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/shop' component={ShopPage}/>
        <Route exact path='/sign-in' component={SignInAndSignUpPage}/>
      </Switch>
    </div>
  );
}

export default App;
