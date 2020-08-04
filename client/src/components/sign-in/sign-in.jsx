import React, { useState } from 'react';
import FormInput from '../form-input/form-input'
import CustomButton from '../custom-button/custom-button.jsx'
import { connect } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action';

import './sign-in.scss'

const SignIn = ({emailSignInStart, googleSignInStart}) => {

    const [userCredentials, setCredentials] = useState({email:'', password:''})

    const { email, password } = userCredentials;
    const handleSubmit = async event =>{
        event.preventDefault();

        emailSignInStart(email, password);
    };

    const handleChange=event=>{
        const { name, value }= event.target;
        setCredentials({...setCredentials, [name]:value })
    };

    return (
        <div className ='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>
                <FormInput label='email' handleChange={handleChange} type='email' id='email' name='email' value={email} required/>
                <FormInput 
                    handleChange={handleChange}
                    type='password' 
                    id='password' 
                    name='password' 
                    value={password} 
                    required 
                    label='password'
                />
                <div className ='buttons'>
                    <CustomButton type='submit'>
                    Sign In
                    </CustomButton>
                    <CustomButton type ='button' onClick={googleSignInStart} isGoogleSignIn>
                    Sign In with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch =>({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password)  => dispatch( emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
