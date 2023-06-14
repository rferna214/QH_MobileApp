import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, useWindowDimensions } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/images/logo.png';
// 3/31/23
const NewPasswordScreen = () => {

    const navigation = useNavigation();

    const [ code, setCode ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');

    const onSubmitPressed = () => {
        console.warn("onSubmitPressed");
        navigation.navigate('SignInScreen');
    }

    const onSignInPressed = () => {
        console.warn("onSignInPressed");
        navigation.navigate('SignInScreen');
    }

    const { height } = useWindowDimensions();

    return (
        <View style={styles.root}>

            <Image
                source={logo}
                style={[styles.logo, { height: height * 0.3 }]}
                resizeMode="contain"/>

            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
                placeholder="Code"
                input={code}
                SetInput={setCode}/>

            <CustomInput
                placeholder="Enter your new password"
                input={newPassword}
                SetInput={setNewPassword}/>
            
            <CustomButton
                text="Submit"
                onPress={onSubmitPressed}/>

            <CustomButton
                text="Back to Sign in"
                onPress={onSignInPressed}
                type="EMPTY"/>

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

export default NewPasswordScreen;