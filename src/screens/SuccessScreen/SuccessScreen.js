import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { BASE_URL } from '../../config'; 

const SuccessScreen = () => {
  const [data, setData] = useState(null); 

  // Fetch balance data
  const getBalance = useCallback(async () => {
    await fetch(`${BASE_URL}/api/Users/${userId}/plaid`, {
      method: "PATCH",
      headers: { 
         Authorization: `Bearer ${userToken}` 
         ,"Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  useEffect(() => {
    if (data == null) {
      getBalance();
    }
  }, [data])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.heading}>
        <Text style={styles.titleText}>Balance Response</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.baseText}>
            {
              JSON.stringify(data)
            }
        </Text>
      </View>
    </View>
  );
};



export default SuccessScreen;