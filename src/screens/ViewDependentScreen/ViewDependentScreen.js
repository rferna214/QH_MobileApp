import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, FlatList, Alert, ScrollView } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import logo from '../../../assets/images/logo.png';
import RNFetchBlob from 'rn-fetch-blob';
import PDFView from 'react-native-pdf';
import { TextInput } from 'react-native-gesture-handler';


const ViewDependentScreen = () => {

    // const { callGetUsersList } = useContext(AuthContext);  

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [data, setData] = useState('');
    const [ssn, setSSN] = useState('');

    const { userToken } = useContext(AuthContext);
    const { userId } = useContext(AuthContext);

    const onViewPlanPressed = () => { navigation.navigate('Member Card'); }

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };
    const onSavePressed = () => {
        navigation.navigate('Member Portal');
    }

    const getUserDependent = () => {
        axios
            .get(`${BASE_URL}/api/Users/${userId}/dependents`,
                config)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    } 
    
    const getPlaid = () => {
        axios
            .get(`${BASE_URL}/api/Users/${userId}/plaid`,
                config)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log('TEST', error);
            });
    }
    useEffect(() => {
        getUserDependent();
        getUserDependentID();
        getPlaid();
    }, []); 

    const getUserDependentID = (dependentId) => {
        axios
            .patch(`${BASE_URL}/api/Users/${userId}/dependents/${dependentId}`,
                config, ssn)
            .then((response) => {
                console.log("User Dependent", response);
            })
            .catch((error) => {
                console.log('This is the DependentID', error);
            })
    }



    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={styles.root}>
                    <Image
                        source={logo}
                        style={[styles.logo, { height: height * 0.2 }]}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>Dependents</Text>

                    <ScrollView>

                        {data.length === 0 ? <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.boldText}>No dependents were found</Text>
                        </View> : <View style={styles.profile}>
                            <FlatList
                                scrollEnabled={false}
                                data={data}
                                keyExtractor={(item) => item.crmDependentID}
                                renderItem={({ item }) => (
                                    <View
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: "#ccc",
                                            paddingBottom: 20,
                                        }}
                                    >
                                        <Text style={styles.profileItem}>
                                            Dependent: <Text style={styles.input}>{item.firstName}{' '}{item.lastName}</Text>{'\n'}
                                            Relationship: <Text style={styles.input}> {item.relationship}</Text>{'\n'}
                                            DOB: <Text style={styles.input}> {item.dob}</Text>{'\n'}
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{
                                                    fontSize: 18,
                                                    color: '#333',
                                                    fontWeight: 800, textAlign: 'right'
                                                }}>SSN: </Text>
                                                <TextInput style={{
                                                    fontSize: 18, width: 100, borderColor: 'black',
                                                    borderBottomWidth: 1, padding: 0, marginBottom: 0, marginTop: 0,
                                                }} placeholder={item.ssn} value={ssn} onChangeText={setSSN} />

                                            </View>
                                        </Text>
                                        {/* <CustomButton text="Update Dependent Info"
                                            onPress={() => {
                                                axios
                                                    .put(`${BASE_URL}/api/Users/${userId}/dependents/${item.crmDependentID}`
                                                        , config
                                                        , item.ssn)
                                                    .then((response) => {
                                                        console.log("User Dependent", response);
                                                    })
                                                    .catch((error) => {
                                                        console.log('This is the DependentID', error);
                                                    })
                                            }} /> */}

                                    </View>
                                )}
                            /></View>}

                    </ScrollView>

                    <CustomButton text="Go Back" onPress={onSavePressed} type="EMPTY" />
                    <View style={{ backgroundColor: "#F9FBFC" }} />
                </View>
            </View></ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    profile: {
        borderColor: '#9dcd50',
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        marginBottom: 30,
        backgroundColor: '#fff',
    },
    boldText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
    },
    input: {
        fontSize: 18,
        color: '#333',
        fontWeight: 300,
    },
    inputSocial: {
        fontSize: 18,
        color: '#333',
        borderColor: 'black',
        borderWidth: 1,
    },
    profileItem: {
        fontSize: 18,
        paddingHorizontal: 30,
        paddingVertical: 20,
        color: '#333',
        fontWeight: 800,
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



export default ViewDependentScreen;