import React from 'react';
import CustomButton from '../CustomButton';


const SocialSignInButtons = () => {

    const onSignInFacebookPressed = () => {
        console.log("Sign in with Facebook")
    }
    const onSignInGooglePressed = () => {
        console.log("Sign in with Google")
    }
    const onSignInApplePressed = () => {
        console.log("Sign in with Apple")
    }

    return (
        <>
            <CustomButton
                text="Sign in with Facebook"
                onPress={onSignInFacebookPressed}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton
                text="Sign in with Google"
                onPress={onSignInGooglePressed}
                bgColor="#FAE9EA"
                fgColor="#DD4D44"
            />
            <CustomButton
                text="Sign in with Apple"
                onPress={onSignInApplePressed}
                bgColor="#e3e3e3"
                fgColor="#363636"
            />
        </>
    );
};



export default SocialSignInButtons;