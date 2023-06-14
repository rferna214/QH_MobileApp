import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(null); 

    //const [userFirstName, setUserFirstname] = useState(null);
    //const [userLastName, setUserLastname] = useState(null);
    //const [userEmail, setUserEmail] = useState(null);
    //const [userName, setUserName] = useState(null);


    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    const login = (username, password) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/api/users/auth/token`, {
                username,
                password,
            }).then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                setUserToken(userInfo.token); 
                setUserId(userInfo.id);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                AsyncStorage.setItem('userToken', JSON.stringify(userInfo.token)); 
                AsyncStorage.setItem('userId', userInfo.id); 
                console.log(res.data);
                console.log('User token: ' + userInfo.token);
                console.log('User id: ' + userInfo.id); 
            }).catch(e => {
            console.log(`Login error ${e}`);
            }); 

        setIsLoading(false);
    }


    const logout = () => {

        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userId');
        setIsLoading(false);

    }

    const isLoggedIn = async () => { 
             
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            let userId = await AsyncStorage.getItem('userId'); 
            //let userFirstName = await AsyncStorage.getItem('userFirstName');
            //let userLastName = await AsyncStorage.getItem('userLastName');
            //let userEmail = await AsyncStorage.getItem('userEmail');
            //let userName = await AsyncStorage.getItem('userName');
            userInfo = JSON.parse(userInfo);
 
            if (userInfo) {
                setUserToken(userToken);
                setUserInfo(userInfo);
                setUserId(userId); 
                //setUserEmail(userEmail);
                //setUserFirstname(userFirstName);
                //setUserLastname(userLastName);
                //setUserName(userName);
            }  
            setIsLoading(false);
        }catch (e) {
            console.log(`isLogged in error ${e}`)
        }
        
        
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    const callGetUsersList = () => { 
        axios
            .get(`${BASE_URL}/api/Users/me`,
            config  
            ).then(res => {
                console.log('User Credentials:', res.data);
            }).catch(e => {
                console.log(`User info error ${e}`);
            });
    }; 

    return (
        <AuthContext.Provider value={
            {
                login,
                logout,
                isLoading,
                userToken,
                userInfo,
                userId,
                callGetUsersList,
                //userEmail,
                //userFirstName,
                //userLastName,
                //userName
            }}>
            {children}
        </AuthContext.Provider>
    );
}