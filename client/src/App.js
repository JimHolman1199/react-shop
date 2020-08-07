import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

import Header from './components/header/header.jsx'
import Spinner from './components/spinner/spinner';
import ErrorBoundary from "./components/error-boundary/error-boundary";

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';


const HomePage = lazy(()=> import('../src/pages/homepage/homepage'))
const ShopPage = lazy(()=> import('./pages/shop/shop.jsx'))
const CheckoutPage = lazy(()=> import('./pages/checkout/checkout.jsx'))
const SignInAndSignUpPage = lazy(()=> import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx'))

const App =({ checkUserSession, currentUser })=> {

  useEffect(()=>{
    checkUserSession();
  }, [checkUserSession])

  return (
    <div>
      <GlobalStyle/>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
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
            </Suspense>
          </ErrorBoundary>
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
