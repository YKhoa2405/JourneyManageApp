import React from "react";
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { mainColor, white } from "../assets/color";
import ButtonMain from "./components/ButtonMain";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen(){
    const navigation = useNavigation();

    function goLogin(){
        navigation.navigate('Login')
    }

    function goRegister(){
        navigation.navigate('Register')
    }

    return(
        <View >
            <ImageBackground source={require('../assets/welcome.png')} style={styles.imageWelcome}>
                <View style={styles.containerTop}>
                    <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.title}>HK Journey</Text>
                    <Text style={styles.desc}>Chia sẻ hành trình di chuyển của bạn </Text>
                </View>
                <View style={styles.containerBottom}>
                    <ButtonMain title={'Đăng nhập'} onPress={goLogin}></ButtonMain>
                    <TouchableOpacity style ={styles.button}>
                        <Text style={styles.buttonText} onPress={goRegister}>Đăng ký</Text>
                    </TouchableOpacity>

                </View> 
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    imageWelcome:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch',
        flexDirection:'column',
        justifyContent:'space-around'

    },
    containerTop:{
        alignItems:'center',
    },
    containerBottom:{
        marginHorizontal:50,
        justifyContent:'space-around'       
    },

    logo:{
        width:100,
        height:100
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'white',
        marginTop:5
    },
    desc:{
        color:white,
        fontSize:16,
        opacity:0.8,
        fontWeight:'500',
        fontStyle:'italic'
    },
    button:{
        backgroundColor:'white',
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:10
    },
    buttonText:{
        color:'black',
        fontSize:16,
        fontWeight:'500'
    }
})