/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import type { Node } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import { PlaidLink } from 'react-native-plaid-link-sdk';


const App: () => Node = () => {
    return (
        <AuthProvider>
            <AppNav/>
        </AuthProvider>
    );
};


export default App;