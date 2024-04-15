import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, ActivityIndicator } from "react-native";
import { borderUnder, mainColor } from "../assets/color";
import ButtonMain from "./components/ButtonMain";
import InputCpm from "./components/InputCpm";
import LoginScreen from "./Login";
import InputPass from "./components/InputPass";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import MessageError from "./components/MessageError";
import { Host, endpoints } from "../config/API";



export default function RegisterScreen() {
    const [isLogin, setIsLogin] = useState(false)
    const [nullValue, setNullValue] = useState(false) //Kiểm tra thông tin có Đầy đủ thông tin
    const [isLoading, setIsLoading] = useState(false)
    // Biến lưu giá trị đăng ký
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState(null)

    // chuyển trang login
    function goLogin() {
        setIsLogin(true)
    }
    if (isLogin) {
        return <LoginScreen />
    }
    // Hiển thị thông báo
    function showMessageForFewSeconds(message) {
        setNullValue(true);
        setTimeout(() => {
            setNullValue(false);
        }, 2000); // Message disappears after 5 seconds (5000 milliseconds)
    };
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
    function handeRegister() {

        if (!firstname || !lastname || !username || !email || !password || !avatar) {
            showMessageForFewSeconds('Vui lòng điền đầy đủ thông tin')
            return;
        }

        let formRegister = new FormData();
        formRegister.append('firstname', firstname);
        formRegister.append('lastname', lastname);
        formRegister.append('username', username);
        formRegister.append('email', email);
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

        setIsLoading(true)

        axios.post('https://hieuecourse.pythonanywhere.com/user/', formRegister, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (response) {
                console.log(response);
                setIsLoading(false)
                goLogin()
            })
            .catch(function (error) {
                console.log(error.response);
                setIsLoading(false)

            });


    }


    return (

        <View style={styles.container}>
            <View style={{ display: isLoading || nullValue ? 'flex' : 'none' }}>
                {nullValue && <MessageError message={'Vui lòng nhập đầy đủ thông tin!!'} />}
            </View>
            <View style={styles.comtainerTitle}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.wellcome}>Xin chào bạn,</Text>
                <Text style={styles.wellcome}>Chia sẻ chuyến đi tuyện vời.</Text>
            </View>
            <View>
                <InputCpm placeholder={'Họ'} onChangeText={(value) => setFirstName(value)}></InputCpm>
                <InputCpm placeholder={'Tên'} onChangeText={(value) => setLastName(value)}></InputCpm>
                <InputCpm placeholder={'Tên tài khoản'} onChangeText={(value) => setUsername(value)}></InputCpm>
                <InputCpm placeholder={'Email'} onChangeText={(value) => setEmail(value)}></InputCpm>
                <InputPass placeholder={'Mật khẩu'} onChangeText={(value) => setPassword(value)}></InputPass>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={styles.imageUpload} />
                ) : (
                    <TouchableOpacity onPress={chooseImage} style={{ width: '100%', height: 50, backgroundColor: borderUnder, borderRadius: 1, alignItems: 'center', justifyContent: 'center', marginTop: 15, borderRadius: 10 }}>
                        <Text style={{ fontSize: 16 }}>Tải ảnh của bạn</Text>
                    </TouchableOpacity>
                )}

            </View>
            <View style={styles.buttonContainer}>
                {isLoading ? (<ActivityIndicator color={'black'} size={'large'}/>) : (
                    <ButtonMain title={'Đăng ký'} onPress={handeRegister}></ButtonMain>
                )}
            </View>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
                <Text style={styles.lineText}>hoặc</Text>
                <View style={styles.line}></View>
            </View>
            <View style={styles.optionLoginContainer}>
                <TouchableOpacity>
                    <Image source={require('../assets/google.png')} style={styles.optionImage}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/facebook.png')} style={styles.optionImage}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.forgotPass}>Bạn đã có tài khoản ? </Text>
                <TouchableOpacity onPress={goLogin}><Text style={{ fontWeight: '500', color: mainColor }}>Đăng nhập</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 30,
        flex: 1
    },
    comtainerTitle: {
        marginBottom: 10,
        marginTop: 50
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
        marginTop: 20
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