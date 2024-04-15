import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { mainColor, white } from "../../assets/color";

export default function InputPass({ placeholder, onChangeText, value }){
    const [hidePassword, setHidePassword] = useState(true);

    function handlePass(){
      setHidePassword(!hidePassword);
    }

    return(
        <View style={styles.container}>
            <TextInput  placeholder={placeholder} 
                        onChangeText={onChangeText} 
                        secureTextEntry={hidePassword}
                        value={value} style={styles.inputPass}>
            </TextInput>
            <TouchableOpacity style={styles.icon} onPress={handlePass}>
                <Icon
                name={hidePassword ? 'visibility-off' : 'visibility'}
                size={24}
                color={hidePassword ? '#888' : mainColor}
                />
            </TouchableOpacity>
        </View> 
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:1,
        marginTop:15,
        justifyContent:'space-between',
        backgroundColor:white
    },
    inputPass:{
        width:'90%'
    }

})