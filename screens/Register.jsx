import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { mainColor } from "../assets/color";
import ButtonMain from "./components/ButtonMain";
import InputCpm from "./components/InputCpm";
import LoginScreen from "./Login";
import InputPass from "./components/InputPass";

export default function RegisterScreen(){
    const [isLogin, setIsLogin] = useState(false)

    function goLogin(){
        setIsLogin(true)
    }
    if(isLogin){
        return <LoginScreen/>
    }

    return(
        <View style={styles.container}>
            <View style={styles.comtainerTitle}>
                <Text style={styles.title}>Đăng ký</Text>
                <Text style={styles.wellcome}>Xin chào bạn,</Text>
                <Text style={styles.wellcome}>Chia sẻ chuyến đi tuyện vời.</Text>
            </View>
            <View>
                <InputCpm placeholder={'Tên người dùng'}></InputCpm>
                <InputCpm placeholder={'Số điện thoại'}></InputCpm>
                <InputCpm placeholder={'Email'}></InputCpm>
                <InputPass placeholder={'Mật khẩu'}></InputPass>
                <InputPass placeholder={'Nhập lại mật khẩu'}></InputPass>
            </View>
            <View  style={styles.buttonContainer}>
                <ButtonMain title={'Đăng ký'}></ButtonMain>
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
                <TouchableOpacity onPress={goLogin}><Text style={{fontWeight:'500', color:mainColor}}>Đăng nhập</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:80,
        paddingHorizontal:30
    },
    comtainerTitle:{
        marginBottom:10
    },
    title:{
        fontSize:25,
        fontWeight:'bold',
        color:mainColor,
        marginBottom:8
    },
    wellcome:{
        fontSize:18,
        fontWeight:'500'
    },
    loginContainer:{
        flexDirection:'row',
        justifyContent:'center',alignItems:'center',
        marginTop:20
    },
    buttonContainer:{
        marginTop:30
    },
    lineContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:20,
    },
    line:{
        height:1,
        flex:1,
        backgroundColor:'grey',
        opacity:0.8
    },
    lineText:{
        marginHorizontal:5,
        fontWeight:'600'
    },
    optionLoginContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:80
    },
    optionImage:{
        width:30,
        height:30,
        resizeMode:'contain'
    }
})