import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

// If you want to create a different button create a container/text for it as follows:
// container_(name of button) <--- without parenthesis. The original button will always default to the
// PRIMARY button

// if you want to add a change to several buttons add the element to the parameter then go to signin screen
// and add the element to the Custom Button
const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        // Pressable is for when a user presses a button: in this case it is used
        // for the log in button
        <Pressable
            onPress={onPress}
            style={[[styles.container,
            styles[`container_${type}`]],
                bgColor ? { backgroundColor: bgColor } : {}
            ]}>
            <Text
                style={[[styles.text,
                    styles[`text_${type}`]],
                    fgColor ? { color: fgColor } : {}
                ]}>
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#9dcd50',
    },
    container_SECONDARY: {
        borderColor: '#9dcd50',
        borderWidth: 2,
    },
    container_EMPTY: {
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_SECONDARY: {
        color: '#9dcd50',
    },
    text_EMPTY: {
        color: 'grey',
    },
});

export default CustomButton;