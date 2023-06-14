import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Image, useWindowDimensions, Platform, Button } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import logo from '../../../assets/images/logo.png';
import { link } from 'fs';
import { PlaidLink, LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk';
import { usePlaidLink } from 'react-plaid-link';
const ViewBillScreen = () => {

  // const { callGetUsersList } = useContext(AuthContext);  


  const [linkToken, setLinkToken] = useState(null);

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const [data, setData] = useState('');
  const { userToken } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);

  const config = {
    headers: { Authorization: `Bearer ${userToken}`, "Content-Type" : "application/json" }, 
    body: JSON.stringify({ address: BASE_URL })
  };
  const onSavePressed = () => {
    navigation.navigate('Member Portal');
  }

  const generateToken = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/Users/${userId}/plaid/linktoken`, {
        method: 'GET',
        config,
      });
      console.log(response);
      const data = await response.json();
      setLinkToken(data.link_token);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserBill = () => {
    axios
      .get(`${BASE_URL}/api/Users/${userId}/billinfo`,
        config)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log('ERROR???',error);
      });
  }
  useEffect(() => {
    getUserBill();
   generateToken();
  });

  return (
    <View style={styles.root}>
      <Image
        source={logo}
        style={[styles.logo, { height: height * 0.2 }]}
        resizeMode="contain" />

      <Text style={styles.title}>Bill Info</Text>
      <View style={styles.profile}>

        <Text style={styles.profileItem}>
          Last Bill Amount: <Text style={styles.input}>{data.lastBillAmount}</Text> {'\n'}
          Last Bill Date: <Text style={styles.input}>{data.lastBillDate}</Text>{'\n'}
          Next Bill Amount: <Text style={styles.input}> {data.nextBillAmount}</Text>{'\n'}
          Next Bill Date: <Text style={styles.input}> {data.nextBillDate}</Text>
        </Text>
        
      </View> 
      <PlaidLink
        tokenConfig={{
          token: linkToken,
        }}
        onSuccess={(linkSuccess) => {
          console.log(linkSuccess);
        }}
        onExit={(exit) => {
          console.log(exit);
        }}
      >
        <Text>Add Account</Text>
      </PlaidLink>
      <CustomButton
        text="Go Back"
        onPress={onSavePressed}
        type='EMPTY'
      />
      <View style={{ backgroundColor: '#F9FBFC', flex: 0.5 }} />

    </View>

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

 

export default ViewBillScreen;