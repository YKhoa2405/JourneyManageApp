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
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});
