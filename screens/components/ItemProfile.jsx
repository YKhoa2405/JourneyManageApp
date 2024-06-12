import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { borderUnder, mainColor, txt18, item } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const ItemProfile = ({ label, onPress,rightIcon,backgroundColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container,{backgroundColor}]}>
                <View>
                    <Text style={styles.profileText}>{label}</Text>
                </View>
                <View>
                    <Icon name={rightIcon} size={26} style={styles.icon}></Icon>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemProfile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:{},
        paddingHorizontal:18,
        paddingVertical:15,
        borderRadius:15,
        marginBottom:10
    },
    profileText: {
        fontSize: txt18,

    },
})