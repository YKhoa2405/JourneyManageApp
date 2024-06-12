import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { borderUnder, mainColor, txt20, white } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UIHeader = ({ title, leftIcon, rightIcon, handleLeftIcon, handleRightIcon }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleLeftIcon}>

                <Icon name={leftIcon} size={24} />
            </TouchableOpacity>
            <Text style={styles.name}>{title}</Text>
            <TouchableOpacity onPress={handleRightIcon}>
                <Icon name={rightIcon} size={24} />

            </TouchableOpacity>
        </View>
    )
}

export default UIHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop:30,
        paddingBottom:10,
        borderWidth:1,
        borderColor:borderUnder,
        backgroundColor:white

    },
    name: {
        fontSize: txt20,
        fontWeight: '500'
    }
})