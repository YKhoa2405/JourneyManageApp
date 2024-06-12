import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { mainColor, txt16 } from "../../assets/color";

export default function ButtonMain({title, onPress, disable}){
    return(
        <TouchableOpacity style ={styles.button} onPress={onPress} disabled={disable}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:mainColor,
        padding:16,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:10,
        elevation:4
    },
    buttonText:{
        color:'white',
        fontSize:txt16,
        fontWeight:'500'
    }
})