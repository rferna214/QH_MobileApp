import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, useWindowDimensions, Alert } from 'react-native';
import CustomButton from '../../components/CustomButton';
import logo from '../../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../../../src/config.js';
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk'


// 3/31/23
const MemberPortalScreen = () => {
    const [data, setData] = useState('');
    
    const [dependentData, setDependentData] = useState([]);
    const { userToken } = useContext(AuthContext);
    const { userId } = useContext(AuthContext);


    const { logout } = useContext(AuthContext);

    const { height } = useWindowDimensions();

    const navigation = useNavigation();

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };

    const getUserDependent = () => {
        axios
            .get(`${BASE_URL}/api/Users/${userId}/dependents`,
                config)
            .then((response) => {
                console.log(response.data);
                setDependentData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    } 

    const getUser = () => {
        axios
            .get(`${BASE_URL}/api/Users/me`
                , config)
            .then((response) => { 
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
        getUserDependent();
    }, []);

    

    const onCheckMemberCardPressed = () => {
        navigation.navigate('Member Card');
    }
    const onSignOutPressed = () => {
        logout();
    }

    const onViewBillPressed = () => {
        navigation.navigate('ViewBillScreen');
    }
    
    const onViewPlanPressed = () => {
        navigation.navigate('ViewPlanScreen');
    }
    const onViewDependentPressed = () => {
        navigation.navigate('ViewDependentScreen');
    } 

    return (
        <View style={styles.root}>

            {dependentData.length === 0 ? console.log('user has no dependents') : Alert.alert("Please Make sure to input your dependents SSN")}
            <Image
                source={logo}
                style={[styles.logo, { height: height * 0.2 }]}
                resizeMode="contain" />

            <View style={styles.profile}>

                <Text style={styles.profileItem}>
                    Username: <Text style={styles.input}>{data.userName}</Text> {'\n'}
                    Full Name: <Text style={styles.input}>{data.firstName}{' '}{data.lastName}</Text>{'\n'}
                    Phone Number: <Text style={styles.input}> {data.phoneNumber}</Text>{'\n'}
                    Email: <Text style={styles.input}> {data.email}</Text>{'\n'}
                    MemberID: <Text style={styles.input}>{data.memberId}</Text>
                </Text>
            </View>
            <CustomButton
                text="View Bill"
                onPress={onViewBillPressed}
            />
            <CustomButton
                text="View Plan"
                onPress={onViewPlanPressed}
                type='SECONDARY'
            />
            <CustomButton
                text="View Dependent"
                onPress={onViewDependentPressed} 
            />

            {/* <CustomButton
                text="Member Card"
                onPress={onCheckMemberCardPressed} 
            />  */}

            {/* <CustomButton
                text="Add New Payments"
                onPress={onAddNewPaymentsPressed}
            />  */}

            {/* <View style={styles.button}>
      <PlaidLink style={styles.button}
        tokenConfig={{ token: '#GENERATED_LINK_TOKEN#', noLoadingState: false }}
        onSuccess={(success) => console.log(success)}
        onExit={(exit) => console.log(exit)}
      />
        <Text style={styles.buttonText}>Add Accounts</Text>
    </View> */}

            <CustomButton
                text="Sign out"
                onPress={onSignOutPressed}
                type="EMPTY"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '60%',
        maxWidth: 300,
        maxHeight: 200,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    profile: {
        borderColor: '#9dcd50',
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        marginBottom: 30,
        backgroundColor: '#fff',
    },
    profileItem: {
        fontSize: 18,
        paddingHorizontal: 30,
        paddingVertical: 20,
        color: '#333',
        fontWeight: 800,
    },
    input: {
        fontSize: 18,
        color: '#333',
        fontWeight: 400,
    },
    label: {
        fontWeight: 'bold',
        color: '#666',
    },
    button: {
        backgroundColor: '#0066cc',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MemberPortalScreen;