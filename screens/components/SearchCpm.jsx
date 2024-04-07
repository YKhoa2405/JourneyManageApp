import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { mainColor } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialIcons";
export default function SearchCpm({ placeholder, onChangeText, value }){
    return(
        <View style={styles.searchBar}>
            <View style={styles.search}>
                <Icon name="search" size={25} color="grey"></Icon>
            </View>
            <TextInput placeholder={placeholder} style={styles.field}></TextInput>
            <View style={styles.addJourney}>
                <TouchableOpacity>
                    <Icon name="add-circle-outline" size={30} ></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    searchBar:{
        flexDirection:'row',
        paddingEnd:10,
        paddingTop:20,
        alignItems:'center',
    },

    field:{
        backgroundColor:'white',
        flex:1,
        paddingVertical:10,
        paddingStart:30,
        paddingEnd:10,
        borderRadius:10,
        borderColor:mainColor,
        borderWidth:1
    },
    search:{
        left:30,
        zIndex:1
    },
    addJourney:{
        padding:10,
    }
})