import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, TouchableHighlight } from "react-native";
import { mainColor } from "../assets/color";
import ButtonMain from "./components/ButtonMain";
import InputCpm from "./components/InputCpm";
import LoginStyle from "../styles/LoginStyle";
import RegisterScreen from "./Register";
import InputPass from "./components/InputPass";
import NaviBottom from "./navigation/NaviBottom";
export default function LoginScreen(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const [isRegister,setIsRegister] = useState(false)
    const [isHome,setIsHome] =useState(false)
    // Chuyển đến trang login
    function goRegister(){
        setIsRegister(true)
    }
    if(isRegister){return <RegisterScreen/>}

    // Xử lý đăng nhập
    if(isHome){return <NaviBottom/>}
    function handleLogin(){
        // Kiểm tra tên đăng nhập và mật khẩu
        if (username === '1' && password === '1') {
            setIsHome(true)    
        } 
        else {
          Alert.alert('Error', 'Invalid username or password');
        }
    };

    return(
        <View style={LoginStyle.container}>
            <View style={LoginStyle.comtainerTitle}>
                <Text style={LoginStyle.title}>Xin chào</Text>
                <Text style={LoginStyle.wellcome}>Chào mừng trở lại</Text>
                <Text style={LoginStyle.wellcome}>Vui lòng nhập thông tin của bạn.</Text>
            </View>
            <View>
                <InputCpm   placeholder={'Số điện thoại, tên người dùng'}
                            onChangeText={text => setUsername(text)}
                            value={username}></InputCpm>
                <InputPass  placeholder={'Mật khẩu'}
                            onChangeText={text => setPassword(text)}
                            value={password}></InputPass>
                            
            </View>
            <View style={LoginStyle.inputContainer}>
                <TouchableOpacity>
                    <Text style={LoginStyle.forgotPass}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
            </View>
            <View>
                <ButtonMain title={'Đăng nhập'} onPress={handleLogin}></ButtonMain>
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
                <TouchableOpacity onPress={goRegister}><Text style={{fontWeight:'500', color:mainColor}}>Đăng ký ngay</Text></TouchableOpacity>
            </View>
        </View>
    )
}
