import { View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import AuthenticationRouter from './AuthenticationRouter';
import AppRouter from './AppRouter';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const AppNav = () => {

    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.root}>
            {userToken !== null ? <AppRouter/> : <AuthenticationRouter /> }
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FBFC'
    },
});

export default AppNav;