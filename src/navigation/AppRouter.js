import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MemberPortalScreen from '../screens/MemberPortalScreen';
import MemberCardScreen from '../screens/MemberCardScreen'; 
import ViewBillScreen from '../screens/ViewBillScreen';
import ViewPlanScreen from '../screens/ViewPlanScreen';
import ViewDependentScreen from '../screens/ViewDependentScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createStackNavigator();

const AppRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Member Portal'} component={MemberPortalScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'Member Card'} component={MemberCardScreen} options={{ headerShown: true }} />
                <Stack.Screen name={'ViewBillScreen'} component={ViewBillScreen} options={{ headerShown: false }} />
                <Stack.Screen name={'ViewPlanScreen'} component={ViewPlanScreen} options={{ headerShown: false }} /> 
                <Stack.Screen name={'ViewDependentScreen'} component={ViewDependentScreen} options={{ headerShown: false }} /> 
                <Stack.Screen name={'SuccessScreen'} component={SuccessScreen} options={{ headerShown: false }} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;