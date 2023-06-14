import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';

// 3/31/23
const ConfirmEmailScreen = () => {
    const [ code, setCode ] = useState('');

    const navigation = useNavigation();

    const onConfirmPressed = () => {
        console.warn("onConfirmPressed")
        navigation.navigate('SignInScreen');
    }

    const onSignInPressed = () => {
        console.warn("onSignInPressed")
        navigation.navigate('SignInScreen');
    }

    const onResendPressed = () => {
        console.warn("onResendPressed");
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>
            <CustomInput
                placeholder="Enter your confirmation code"
                input={code}
                SetInput={setCode}
            />
            
            <CustomButton
                text="Confirm"
                onPress={onConfirmPressed}
            />

            <CustomButton
                text="Resend Code"
                onPress={onResendPressed}
                type="SECONDARY"
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

export default ConfirmEmailScreen;