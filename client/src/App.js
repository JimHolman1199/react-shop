import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

import HomePage from '../src/pages/homepage/homepage.jsx'
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx'
import CheckoutPage from './pages/checkout/checkout.jsx';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

const App =({ checkUserSession, currentUser })=> {

  useEffect(()=>{
    checkUserSession();
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyle/>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>
        <Route 
          exact 
          path='/signin' 
          render = { ()=>
            currentUser ? (
              <Redirect to ='/' />
            ) : (
              <SignInAndSignUpPage />
            )
          }
          />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  checkUserSession: ()=>dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
