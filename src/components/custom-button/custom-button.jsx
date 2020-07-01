import React from 'react';

import './custom-button.styles.scss';

const CustomButton =({children, ...otherProps})=>(
    <button type="submit" className='custom-button' {...otherProps}>
        {children?children:null}
    </button>
)

export default CustomButton