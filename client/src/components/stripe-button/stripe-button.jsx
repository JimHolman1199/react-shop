import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H55KJAcbDRLbQ61gSU07vyB0LjvQ3pKEPAPXyNVj2hZBiEAVUF76PMBgBv1AQFaz3pESJXpmCqHtVq4x7ucNgXN00qjnQM5Ap';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data:{
                amount: priceForStripe,
                token: token
            }
        }).then(res => {
            alert('Payment Successful')
        }).catch(error=>{
            console.log('Payment error: ', error)
            alert('There was an issue with your payment.')
        })
        
    }

    return (
        <StripeCheckout 
            label='Pay now'
            name = 'CRWN Clothing Ltd.'
            shippingAddress
            billingAddress
            image = 'https://sendeyo.com/up/d/f3eb2117da'
            description = {` Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    )
}

export default StripeCheckoutButton;
