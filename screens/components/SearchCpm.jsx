import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { mainColor } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";
export default function SearchCpm({ placeholder, onChangeText, value }){
    return(

        <Searchbar style={styles.searchBar} placeholder={placeholder} />
    )
}
const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:'white',
        borderRadius:10,
        marginHorizontal:20,
        color:'black',


    },
})