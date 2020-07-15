import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H55KJAcbDRLbQ61gSU07vyB0LjvQ3pKEPAPXyNVj2hZBiEAVUF76PMBgBv1AQFaz3pESJXpmCqHtVq4x7ucNgXN00qjnQM5Ap';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
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
