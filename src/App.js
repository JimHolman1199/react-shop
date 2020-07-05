import React from 'react';
import HomePage from '../src/pages/homepage/homepage.jsx'
import ShopPage from './pages/shop/shop.jsx'
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.jsx'
import { auth } from './firebase/firebase.utils'

import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser:null
    }

  } 

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user})
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/sign-in' component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
