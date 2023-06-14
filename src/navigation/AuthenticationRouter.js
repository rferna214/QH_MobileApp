import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import MemberPortalScreen from '../screens/MemberPortalScreen';
import MemberCardScreen from '../screens/MemberCardScreen';

const Stack = createStackNavigator();

const AuthenticationRouter = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name={'SignInScreen'} component={SignInScreen} options={{ headerShown: false }} />
              <Stack.Screen name={'Member Portal'} component={MemberPortalScreen} options={{ headerShown: true }} />
              <Stack.Screen name={'Member Card'} component={MemberCardScreen} options={{ headerShown: true }} />
              <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} options={{ headerShown: false }} /> 
              <Stack.Screen name={'ConfirmEmailScreen'} component={ConfirmEmailScreen} options={{ headerShown: false }} />
              <Stack.Screen name={'ForgotPasswordScreen'} component={ForgotPasswordScreen} options={{ headerShown: false }} />
              <Stack.Screen name={'NewPasswordScreen'} component={NewPasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationRouter;