import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    // Style Button!
    // If isSignedIn is changed by the function to true:
        if (isSignedIn) {
            return (
                <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/* If onclick is triggered, onroutechange function will send back signin */}
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>
                        Sign Out
                    </p>
                </nav>)

        } else {
            return(
                <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/* If onclick is triggered, onroutechange function will send back signin */}
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>
                        Sign In
                    </p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>
                        Register
                    </p>
                </nav>
            )

        }

}

export default Navigation