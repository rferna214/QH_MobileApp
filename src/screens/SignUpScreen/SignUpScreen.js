import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';

// 3/31/23
const SignUpScreen = () => {

    const navigation = useNavigation();

    const { username, setUsername } = useState('');
    const { email, setEmail } = useState('');
    const { password, setPassword } = useState('');
    const { phoneNumber, setPhoneNumber } = useState('');


    const onRegisterPressed = () => {
        console.warn("onRegisterPressed");
        navigation.navigate('ConfirmEmailScreen');
    }

    const onTermsOfUsePressed = () => {
        console.warn("onTermsOfUsePressed");

    }
    
    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed");
    }

    const onSignInPressed = () => {
        console.warn("onSignInPressed");
        navigation.navigate('SignInScreen');
    }

    return (
        <View style={styles.root }>
            <Text style={styles.title}>Create an account</Text>
            <CustomInput
                placeholder="Username"
                input={username}
                SetInput={setUsername}
            />
            <CustomInput
                placeholder="Email"
                input={email}
                SetInput={setEmail}
            />
            <CustomInput
                placeholder="Phone Number"
                input={phoneNumber}
                SetInput={setPhoneNumber}
            />
            <CustomInput
                placeholder="Password"
                input={password}
                SetInput={setPassword}
                secureTextEntry={true}
            />
            <CustomButton
                text="Register"
                onPress={onRegisterPressed}
            />

            <Text syle={styles.text}>
                By signing up, you agree to our{' '}
                <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and{' '}
                <Text style={styles.link} onPress={onPrivacyPressed}>Privacy Policy</Text>.
            </Text>

            <SocialSignInButtons />

            <CustomButton
                text="Already have an account? Sign in"
                onPress={onSignInPressed}
                type="EMPTY"

            />
            
            
            <View style={{ backgroundColor: '#F9FBFC', flex: 0.5 }} />
            
            

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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    link: {
        color: '#FDB075'
    },
});

export default SignUpScreen;