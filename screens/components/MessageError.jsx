import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { txt16, white } from "../../assets/color";

export default function MessageSuss({ message, color,tcolor }) {
    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <Text style={[styles.text, { color: tcolor }]}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        color: white,
        fontSize: txt16,
    },
});
