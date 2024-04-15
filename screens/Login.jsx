import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, TouchableHighlight } from "react-native";
import { mainColor } from "../assets/color";
import ButtonMain from "./components/ButtonMain";
import InputCpm from "./components/InputCpm";
import LoginStyle from "../styles/LoginStyle";
import RegisterScreen from "./Register";
import InputPass from "./components/InputPass";
import NaviBottom from "./navigation/NaviBottom";
import axios from 'axios';
import MyContext from "../config/MyContext";
import API, { endpoints } from "../config/API";
import { ActivityIndicator } from "react-native-paper";
export default function LoginScreen() {


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, dispatch] = useContext(MyContext)

    const [isRegister, setIsRegister] = useState(false)
    const [isHome, setIsHome] = useState(false)
    const [loading, setLoading] = useState(false);
    // Chuyển đến trang login
    function goRegister() { setIsRegister(true) }
    if (isRegister) { return <RegisterScreen /> }
    // Chuyến đến trang đăng nhập
    function goHome() { setIsHome(true) }
    if (isHome) { return <NaviBottom /> }


    // Xử lý đăng nhập
    const handleLogin = async () => {
        setLoading(true)
        try {
            let header = {
                'Content-Type': 'application/x-www-form-urlencoded' // Change Content-Type
            };
            let data = {
                username: username,
                password: password,
                client_id: "KVmbMpN6sjvf8joWQdWRCISHqiI8PcbIqw2ZRyXP",
                client_secret: "JJFWE3qFRLMdiBW91JRJNop139fBnEurmKKONHHJsTZigpEgqTyoClqtcE0MaMw1AacAroiSqxivUhux72Ac1xDzqaFe8UuXFPadoDJNHyCBx3gcKQlNJZTr5vnYAhGN",
                grant_type: "password",
            };
            let res = await API.post(endpoints["login"], data, { headers: header });
            console.info(res.data);

            dispatch({
                type: 'login',
                payload: res.data
            })
        } catch (ex) {
            if (ex.response) {
                // Server trả về phản hồi có lỗi
                console.error("Server error:", ex.response.data);
                Alert.alert("Server error:", ex.response.data);
            } else if (ex.request) {
                // Không nhận được phản hồi từ server
                console.error("No response received from server");
                Alert.alert("No response received from server");
            } else {
                // Lỗi xảy ra khi thiết lập yêu cầu
                console.error("Error setting up request:", ex.message);
                Alert.alert("Error setting up request:", ex.message);
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={LoginStyle.container}>
            <View style={LoginStyle.comtainerTitle}>
                <Text style={LoginStyle.title}>Xin chào</Text>
                <Text style={LoginStyle.wellcome}>Chào mừng trở lại</Text>
                <Text style={LoginStyle.wellcome}>Vui lòng nhập thông tin của bạn.</Text>
            </View>
            <View>
                <InputCpm placeholder={'Tên tài khoản'}
                    onChangeText={text => setUsername(text)}
                    value={username}></InputCpm>
                <InputPass placeholder={'Mật khẩu'}
                    onChangeText={text => setPassword(text)}
                    value={password}></InputPass>

            </View>
            <View style={LoginStyle.inputContainer}>
                <TouchableOpacity>
                    <Text style={LoginStyle.forgotPass}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
            </View>
            <View>
                {loading ? (<ActivityIndicator color="black" size={'small'} />) : (
                    <ButtonMain title={'Đăng nhập'} onPress={handleLogin}></ButtonMain>
                )}
            </View>
            <View style={LoginStyle.lineContainer}>
                <View style={LoginStyle.line}></View>
                <Text style={LoginStyle.lineText}>hoặc</Text>
                <View style={LoginStyle.line}></View>
            </View>
            <View style={LoginStyle.optionLoginContainer}>
                <TouchableOpacity>
                    <Image source={require('../assets/google.png')} style={LoginStyle.optionImage}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/facebook.png')} style={LoginStyle.optionImage}></Image>
                </TouchableOpacity>
            </View>
            <View style={LoginStyle.registerContainer}>
                <Text style={LoginStyle.forgotPass}>Bạn chưa có tài khoản ? </Text>
                <TouchableOpacity onPress={goRegister}><Text style={{ fontWeight: '500', color: mainColor }}>Đăng ký ngay</Text></TouchableOpacity>
            </View>
        </View>
    )
}
