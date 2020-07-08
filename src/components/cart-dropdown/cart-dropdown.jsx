import React from 'react';
import CustomButton from '../custom-button/custom-button';

import './cart-dropdown.styles.scss';

const Cart = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <CustomButton>GO TO CHEKOUT</CustomButton>
    </div>
)

export default Cart;
