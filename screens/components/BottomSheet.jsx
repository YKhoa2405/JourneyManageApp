import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { borderUnder, white } from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BottomSheet = () => {
    return (
        <View style={styles.backDrop}>
            <View style={styles.bottomSheet}>
                <TouchableOpacity style={styles.itemSheet}>
                    <Icon name="circle-edit-outline" size={28} style={{ marginRight: 10 }} />
                    <Text>Chỉnh sửa bài đăng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemSheet} >
                    <Icon name="delete-outline" size={28} style={{ marginRight: 10 }} />
                    <Text>Xóa bài đăng</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}

export default BottomSheet

const styles = StyleSheet.create({
    backDrop: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: borderUnder,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        zIndex:1
    },
    bottomSheet: {
        width: '100%',
        height: '17%',
        backgroundColor: white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    itemSheet: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 10
    }
})