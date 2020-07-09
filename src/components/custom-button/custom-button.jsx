import React from 'react';

import './custom-button.styles.scss';

const CustomButton =({children, isGoogleSignIn, inverted, ...otherProps})=>(
    <button type="submit" className={`${inverted?'':'inverted'} ${isGoogleSignIn ? "google-sign-in" : ""} custom-button` } {...otherProps}>
        {children?children:null}
    </button>
)

export default CustomButton