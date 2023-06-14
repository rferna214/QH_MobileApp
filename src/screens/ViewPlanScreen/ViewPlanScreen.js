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


const ViewPlanScreen = () => {

    // const { callGetUsersList } = useContext(AuthContext);  

    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    const [data, setData] = useState('');
    const { userToken } = useContext(AuthContext);
    const { userId } = useContext(AuthContext); 
    const onViewPlanPressed = () => { navigation.navigate('Member Card'); }

    const config = {
        headers: { Authorization: `Bearer ${userToken}` }
    };
    const onSavePressed = () => {
        navigation.navigate('Member Portal');
    }

    const getUserPlan = () => {
        axios
            .get(`${BASE_URL}/api/Users/${userId}/plans`,
                config)
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getUserPlan();
    }, []);



    const getMemberCard = (userPlan) => {
        // axios
        //     .get(`${BASE_URL}/api/Users/${userId}/plans/${userPlan}/card`,
        //         config)
        //     .then((response) => { 
        //             console.log("The file saved to ", response.path());
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        let dirs = RNFetchBlob.fs.dirs
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'pdf',
            path: dirs.DownloadDir + `/${userId}_ID_Card.pdf`
        })
            .fetch("GET", `${BASE_URL}/api/Users/${userId}/plans/${userPlan}/card`, {
                Authorization: `Bearer ${userToken}`,
            })
            .then((res) => {
                console.log("The file saved to ", res.path());
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

                    <Text style={styles.title}>Plan Info</Text>

                    <ScrollView>
                        <View style={styles.profile}>
                            <View style={styles.profileItem}>
                                <FlatList
                                    scrollEnabled={false}
                                    data={data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => (
                                        <View
                                            style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: "#ccc",
                                                paddingBottom: 20,
                                            }}
                                        >
                                            <Text style={styles.input}>Plan Name: {item.planName}</Text>
                                            <CustomButton text="Download ID Card"
                                                onPress={() => {
                                                    new Promise((resolve) => {
                                                        getMemberCard(item.id);
                                                        resolve();
                                                    }).then(() => {
                                                        setTimeout(() => {
                                                            onViewPlanPressed(Alert.alert('Notification','If your ID Card does not appear when you close this'+
                                                            ' notification please retry or check your downloads folder to see if your ID card is downloaded. If it is not downloaded please wait for it to finish.'));
                                                        },3000);
                                                    });

                                                }} />
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
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
    }, profile: {
        borderColor: '#9dcd50',
        borderWidth: 2,
        borderRadius: 5,
        padding: 20,
        marginBottom: 30,
        backgroundColor: '#fff',
    }, input: {
        fontSize: 18,
        color: '#333',
        fontWeight: 400,
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



export default ViewPlanScreen;