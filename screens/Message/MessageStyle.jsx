import React from "react";
import { StyleSheet } from "react-native";
import { borderUnder, txt18, white } from "../../assets/color";

const MessageStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        padding: 10
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    name: {
        fontSize: txt18,
        fontWeight: '600',
        marginBottom: 5
    }, time: {
        opacity: 0.8
    },
    messageContent: {
        flex:1,
        flexDirection:'row'
    },
    messageText: {
        backgroundColor: borderUnder,
        paddingVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 15,
      
    }
})


export default MessageStyle