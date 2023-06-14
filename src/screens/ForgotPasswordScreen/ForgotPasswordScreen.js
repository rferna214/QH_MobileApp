import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Alert, useWindowDimensions } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/images/logo.png';

// 3/31/23
const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const [ email, setEmail ] = useState('');

    const onSendPressed = () => {
        navigation.navigate('NewPasswordScreen');
        Alert.alert("A security code has been sent to your email. Please verify it");
    }


    const onSignInPressed = () => {
        navigation.navigate('SignInScreen');
        console.warn("onSignInPressed");
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.root}>

            <Image
                source={logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
                placeholder="Enter your email address"
                input={email}
                SetInput={setEmail}
            />
            
            <CustomButton
                text="Send"
                onPress={onSendPressed}
            />

            <CustomButton
                text="Back to Sign in"
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

export default ForgotPasswordScreen;