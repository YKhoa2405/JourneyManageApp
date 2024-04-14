import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageSuss({ message }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dc143c',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        position: 'absolute',
        top: 5,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
        
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
