import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { mainColor } from "../../assets/color";

export default function InputCpm({ placeholder, onChangeText, value }){
    return(
        <View>
            <TextInput  placeholder={placeholder} 
                        onChangeText={onChangeText} 
                        value={value} style={styles.inputLogin}>
            </TextInput>
        </View> 
    )
}
const styles = StyleSheet.create({
    inputLogin:{
        borderWidth:1,
        borderColor:'grey',
        borderRadius:10,
        padding:10,
        marginTop:10,
        backgroundColor:'white'
    }
})