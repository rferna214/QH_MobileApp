import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import Pdf from 'react-native-pdf';
const MemberCardScreen = () => {


    const { userId } = useContext(AuthContext);


    const source = {
        uri:
            Platform.OS === 'android'
                ? 'file://' + 'sdcard/Download' + `/${userId}_ID_Card.pdf` :
                'sdcard/Download' + `/${userId}_ID_Card.pdf`, cache: true
    };


    return (
        <View style={styles.root}>
            <Pdf
                source={source}
                onError={(error) => {
                    console.log('Test', error);
                    Alert.alert('This Plan does not have an ID.')
                }}
                style={styles.pdf} />
        </View>
    );

};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    }, 
    pdf: {
        width: Dimensions.get('window').height,
        height: Dimensions.get('window').height,
    }
});

export default MemberCardScreen;