import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { borderUnder, mainColor, txt18, item } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



const ItemProfile = ({ label, value, icon, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name={icon} size={26} style={styles.iconStyle}></Icon>
                    <Text style={styles.profileText}>{label}</Text>
                </View>
                <View>
                    <Icon name='chevron-right' size={26} ></Icon>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemProfile

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileText: {
        fontSize: txt18,

    },
    iconStyle: {
        backgroundColor: item,
        padding: 5,
        borderRadius: 10,
        marginRight: 15

    }
})