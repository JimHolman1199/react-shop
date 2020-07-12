import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import HomePage from '../src/pages/homepage/homepage.jsx'
import ShopPage from './pages/shop/shop.jsx'
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx'
import CheckoutPage from './pages/checkout/checkout.jsx';

import { auth, createUserProfileDoc } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDoc(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
            id:snapShot.id,
              ...snapShot.data()
          })
        })
      }

      setCurrentUser( userAuth )
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route 
            exact 
            path='/signin' 
            render = { ()=>
              this.props.currentUser ? (
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
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
