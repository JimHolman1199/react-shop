import React from 'react';
import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button.jsx'

import {signInWithGoogle} from '../../firebase/firebase.utils.js'

import './sign-in.scss'

class SignIn extends React.Component {
constructor(props) {
    super(props);
    
    this.state = {
        email:'',
        password:'',
    }
}

handleSubmit = event =>{
    event.preventDefault();
    this.setState({
        email:'',
        password:'',
    })
}

handleChange=event=>{
    const { name, value }= event.target;
    this.setState({ [name]:value })
}

render(){
    return (
        <div className ='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password </span>
            <form onSubmit={this.handleSubmit}>
                <FormInput label='email' handleChange={this.handleChange} type='email' id='email' name='email' value={this.state.email} required/>
                <FormInput 
                    handleChange={this.handleChange}
                    type='password' 
                    id='password' 
                    name='password' 
                    value={this.state.password} 
                    required 
                    label='password'
                />
                <div className ='buttons'>
                    <CustomButton type='submit'>
                    Sign In
                    </CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                    Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )

}

}
export default SignIn;

