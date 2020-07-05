import React from 'react';

import './custom-button.styles.scss';

const CustomButton =({children, isGoogleSignIn, ...otherProps})=>(
    <button type="submit" className={`${isGoogleSignIn ? "google-sign-in" : ""} custom-button` } {...otherProps}>
        {children?children:null}
    </button>
)

export default CustomButton