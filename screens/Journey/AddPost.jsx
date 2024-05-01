import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput, FlatList, StyleSheet } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, borderUnder, errorMess, heart, mainColor, successMess, txt16, txt18, txt20, txt22, white } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import Toast from "react-native-toast-message";
import HomeStyle from "../../styles/HomeStyle";
import ButtonMain from "../components/ButtonMain";



const AddPost = ({ route }) => {

    const { journeyID } = route.params;
    const [user, dispatch] = useContext(MyContext)

    const [contentPost, setContentPost] = useState()

    const addToPost = async () => {
        try {
            let res = await API.post(endpoints['add_post'], {
                'journey': journeyID,
                'content': contentPost,
                'user': user
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setTimeout(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Đăng thành công',
                });
            }, 4000);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerAvatar}>
                    <Avatar.Image source={{ uri: user.avatar }} size={40} />
                    <Text style={{ fontSize: txt18, fontWeight: 'bold', marginLeft: 10 }}>{user.username}</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonPost}
                        onPress={() => addToPost}>
                        <Text style={{ fontWeight: '500', fontSize: txt18 }}>Đăng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <TextInput
                    placeholder="Bạn đang nghĩ gì..."
                    style={[styles.content, { flex: 1 }]} multiline={true}
                    value={contentPost}
                    onChangeText={t => setContentPost(t)} />
                {/* <Image source={require('../../assets/welcome.png')} style={{ flex: 1, width: '100%', resizeMode: 'contain' }}></Image> */}
            </ScrollView>
        </View>
    )
}

export default AddPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        borderTopWidth: 1,
        borderColor: borderUnder,
        paddingTop: 10

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonPost: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: mainColor,
        elevation: 4,
        borderRadius: 10
    },
    content: {
        fontSize: txt20,
        margin: 10,
        flex: 1
    }
})