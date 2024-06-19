import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, ActivityIndicator, ScrollView } from "react-native";
import { borderUnder, errorMess, mainColor } from "../../assets/color";
import ButtonMain from "../components/ButtonMain";
import InputCpm from "../components/InputCpm";
import InputPass from "../components/InputPass";
import * as ImagePicker from 'expo-image-picker';
import API, {  endpoints } from "../../config/API";
import { ToastMess } from "../components/ToastMess";
import HomeStyle from "../../styles/HomeStyle";


const RegisterScreen = ({ navigation }) => {
    const [nullValue, setNullValue] = useState(false) //Kiểm tra thông tin có Đầy đủ thông tin
    const [isLoading, setIsLoading] = useState(false)
    // Biến lưu giá trị đăng ký
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState(null)


    // Tải hình ảnh
    async function chooseImage() {
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


    // Xử lý đăng ký
    const handeRegister = async () => {

        if (!first_name || !phone || !last_name || !username || !email || !password || !avatar) {
            ToastMess({ type: 'error', text1: 'Vui lòng nhập đầy đủ thông tin' })
            return;
        }

        let formRegister = new FormData();
        formRegister.append('first_name', first_name);
        formRegister.append('last_name', last_name);
        formRegister.append('username', username);
        formRegister.append('email', email);
        formRegister.append('phone', phone);
        formRegister.append('password', password);
        if (avatar) {
            const uriParts = avatar.split('.');
            const fileType = uriParts[uriParts.length - 1];
            formRegister.append('avatar', {
                uri: avatar,
                name: `avatar.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        console.log(formRegister)

        setIsLoading(true)

        try {
            const response = await API.post(endpoints['user'], formRegister, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setIsLoading(false);
            ToastMess({ type: 'success', text1: 'Đăng ký tài khoản thành công' })

            navigation.navigate('LoginScreen')
        } catch (error) {
            setIsLoading(false);
            console.log(error)
            // Xử lý lỗi
            if (error.response && error.response.status === 400) {
                ToastMess({ type: 'error', text1: 'Người dùng đã tồn tại' })

            } else {
                ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
            }
        }



    }


    return (
        <View style={styles.container}>
            <View style={{ display: isLoading || nullValue ? 'flex' : 'none' }}>
                {nullValue && ToastMess({ type: 'error', text1: 'Vui lòng nhập đầy đủ thông tin' })}
            </View>
            <View style={styles.comtainerTitle}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.wellcome}>Xin chào bạn,</Text>
                <Text style={styles.wellcome}>Chia sẻ chuyến đi tuyện vời.</Text>
            </View>
            <View>
                <InputCpm placeholder={'Họ'} onChangeText={(value) => setFirstName(value)} />
                <InputCpm placeholder={'Tên'} onChangeText={(value) => setLastName(value)} />
                <InputCpm placeholder={'Tên tài khoản'} onChangeText={(value) => setUsername(value)} />
                <InputCpm placeholder={'Email'} onChangeText={(value) => setEmail(value)} />
                <InputCpm placeholder={'Số điện thoại (+84)'} onChangeText={(value) => setPhone(value)} />
                <InputPass placeholder={'Mật khẩu'} onChangeText={(value) => setPassword(value)} />
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.imageUpload} />
                ) : (
                    <TouchableOpacity onPress={chooseImage} style={{ width: '100%', height: 50, backgroundColor: borderUnder, borderRadius: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16 }}>Tải ảnh của bạn</Text>
                    </TouchableOpacity>
                )}

            </View>
            <View style={styles.buttonContainer}>
                {isLoading ? (<ActivityIndicator color={'black'} size={'large'} style={HomeStyle.styleLoading} />) : (
                    <ButtonMain title={'Đăng ký'} onPress={handeRegister}></ButtonMain>
                )}
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                {/* <Text style={styles.lineText}>hoặc</Text>
                <View style={styles.line}></View> */}
            </View>
            {/* <View style={styles.optionLoginContainer}>
                <TouchableOpacity>
                    <Image source={require('../../assets/google.png')} style={styles.optionImage}></Image>
                </TouchableOpacity>
            </View> */}
            <View style={styles.loginContainer}>
                <Text style={styles.forgotPass}>Bạn đã có tài khoản ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}><Text style={{ fontWeight: '500', color: mainColor }}>Đăng nhập</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 30,
        flex: 1
    },
    comtainerTitle: {
        marginBottom: 10,
        marginTop: 40
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: mainColor,
        marginBottom: 8
    },
    wellcome: {
        fontSize: 18,
        fontWeight: '500'
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    imageUpload: {
        marginTop: 15,
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 100,
        borderColor: mainColor,
        borderWidth: 1
    },
    buttonContainer: {
        marginTop: 30
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: 'grey',
        opacity: 0.8
    },
    lineText: {
        marginHorizontal: 5,
        fontWeight: '600'
    },
    optionLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 80
    },
    optionImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }
})