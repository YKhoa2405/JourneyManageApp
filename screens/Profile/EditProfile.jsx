import React, { useContext, useState, ActivityIndicator } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MyContext from "../../config/MyContext";
import ProfileStyle from "./ProfileStyle";
import { FAB } from "react-native-paper";
import InputCpm from "../components/InputCpm";
import ButtonMain from "../components/ButtonMain";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../config/API";
import { ScrollView } from "react-native-gesture-handler";
import MessageSuss from "../components/MessageError";
import { black, successMess } from "../../assets/color";


const EditProfile = () => {
    const [user, dispatch] = useContext(MyContext)
    const [showNotification, setShowNotification] = useState(false);

    const [username, setUsername] = useState(user.username)
    const [first_name, setFirstName] = useState(user.first_name)
    const [last_name, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)
    const [avatar, setAvatar] = useState(null)

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setAvatar(result.assets[0].uri)
        }
    }

    const handleSave = async () => {
        let formEdit = new FormData()
        formEdit.append('username', username)
        formEdit.append('first_name', first_name)
        formEdit.append('last_name', last_name)
        formEdit.append('email', email)
        formEdit.append('phone', phone)
        if (avatar) {
            const uriParts = avatar.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formEdit.append('avatar', {
                uri: avatar,
                name: `avatar.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        try {
            let token = await AsyncStorage.getItem('access-token')
            let res = await authApi(token).patch(endpoints['update_user'], formEdit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch({ type: 'update_user', payload: res.data });
            setShowNotification(true);

            setTimeout(() => {
                setShowNotification(false);
            }, 3000); // 3 giây

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            <View style={ProfileStyle.editContainer}>
                <View>
                    {showNotification && (
                        <MessageSuss
                            message="Cập nhật thành công!"
                            color={successMess}
                            tcolor={black}
                        />
                    )}</View>
                <View style={{ alignItems: 'center' }}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={ProfileStyle.avatar} />
                    ) : (
                        <Image source={{ uri: user.avatar }} style={ProfileStyle.avatar} />
                    )}
                    <TouchableOpacity style={ProfileStyle.fabContainer}
                        onPress={handleChooseImage}>
                        <FAB
                            icon="pen"
                            style={ProfileStyle.fabAvatar}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ marginVertical: 40 }}>
                    <InputCpm placeholder={'Tên tài khoản'} value={username} onChangeText={(t) => setUsername(t)} />
                    <InputCpm placeholder={'Họ'} value={first_name} onChangeText={(t) => setFirstName(t)} />
                    <InputCpm placeholder={'Tên'} value={last_name} onChangeText={(t) => setLastName(t)} />
                    <InputCpm placeholder={'Email'} value={email} onChangeText={(t) => setEmail(t)} />
                    <InputCpm placeholder={'Số điện thoại'} value={phone} onChangeText={(t) => setPhone(t)} />

                </View>
                <View>
                    <ButtonMain title={'Lưu thông tin'} onPress={handleSave}></ButtonMain>
                </View>
            </View>
        </ScrollView>
    )
}

export default EditProfile