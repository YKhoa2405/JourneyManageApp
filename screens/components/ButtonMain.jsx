import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { mainColor } from "../../assets/color";

export default function ButtonMain({title, onPress}){
    return(
        <TouchableOpacity style ={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:mainColor,
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:10,
        elevation:4
    },
    buttonText:{
        color:'white',
        fontSize:16,
        fontWeight:'500'
    }
})