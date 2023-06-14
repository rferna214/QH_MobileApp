import React, { useState, useContext } from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import logo from '../../../assets/images/logo.png';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'; 
// 3/31/23
const SignInScreen = () => {
    const { login } = useContext(AuthContext); 

    const [ username, setUsername ] = useState(null);
    const [password, setPassword] = useState(null); 


    const navigation = useNavigation();

    const { height } = useWindowDimensions();

    const onSignInPressed = () => {
        login(username, password); 
    };
    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPasswordScreen');
    };
    const onSignUpPressed = () => {
        navigation.navigate('SignUpScreen');
        console.warn("Dont have an account? Create one");
    };

    return (
        <View style={styles.root }>
            <Image
                source={logo}
                style={[styles.logo, {height: height * 0.3 }]}
                resizeMode="contain"
            />
            <CustomInput
                placeholder="Username"
                input={username}
                SetInput={setUsername}
            /> 
            <CustomInput
                placeholder="Password"
                value={password}
                SetInput={setPassword}
                secureTextEntry={true }
            />
            
            <CustomButton
                text="Sign in"
                onPress={onSignInPressed}
            />
            {/* <CustomButton
                text="Forgot password?"
                onPress={onForgotPasswordPressed}
                type="EMPTY"
                
            />
            <CustomButton
                text="Dont have an account? Create one"
                onPress={onSignUpPressed}
                type="EMPTY"
            /> */}
            <View style={{ backgroundColor: '#F9FBFC', flex: 0.5 }}/>
            {/* <SocialSignInButtons/> */}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen;