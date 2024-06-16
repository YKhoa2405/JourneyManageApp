import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert, TouchableHighlight } from "react-native";
import { mainColor } from "../../assets/color";
import ButtonMain from "../components/ButtonMain";
import InputCpm from "../components/InputCpm";
import LoginStyle from "../../styles/LoginStyle";
import InputPass from "../components/InputPass";
import MyContext from "../../config/MyContext";
import API, { authApi, endpoints } from "../../config/API";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client_id } from "../../config/GOOGLE_API_KEY";
const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, dispatch] = useContext(MyContext)


    const [loading, setLoading] = useState(false);


    // useEffect(() => {
    //     GoogleSignin.configure({
    //         webClientId: client_id,
    //         offlineAccess: false, // whether to access Google API when the user is not logged in
    //         forceCodeForRefreshToken: true, // recommended for iOS
    //     });
    // }, []);

    // const signInGoogle = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         // userInfo contains user data
    //         console.log(userInfo);
    //     } catch (error) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             // user cancelled the login flow
    //             console.log('Google login cancelled');
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             // operation (e.g. sign in) is in progress already
    //             console.log('Google login is already in progress');
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             // play services not available or outdated
    //             console.log('Google play services are not available or outdated');
    //         } else {
    //             // some other error happened
    //             console.error('Google login error', error);
    //         }
    //     }
    // };

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
                client_id: "LBXajny8yeTJ2htXFtXQI9ObsORb2asnIhtUDfJM",
                client_secret: "vH9OlZXMiGm3IUYfxohsM2EjIawGjJgexSE2Y9RsB8EBe7CkeWyr3Cj6M9NbwoZxVAkzx9ST6NUtSaY4OToh5J8QdGBzi8h7GtPSzgNJefdD9UeOgZ8QfMO2JyhtgCX0",
                grant_type: "password",
            };
            let res = await API.post(endpoints["login"], data, { headers: header });
            await AsyncStorage.setItem("access-token", res.data.access_token)

            let user = await authApi(res.data.access_token).get(endpoints["current_user"]);

            dispatch({
                'type': 'login',
                'payload': user.data
            })
            goHome()
        } catch (error) {

            if (error.response && error.response.status === 400) {
                ToastMess({ type: 'error', text1: 'Thông tin tài khoản hoặc mật khẩu không chính xác' })
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
                <TouchableOpacity >
                    <Image source={require('../../assets/google.png')} style={LoginStyle.optionImage}></Image>
                </TouchableOpacity>
            </View>
            <View style={LoginStyle.registerContainer}>
                <Text style={LoginStyle.forgotPass}>Bạn chưa có tài khoản ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}><Text style={{ fontWeight: '500', color: mainColor }}>Đăng ký ngay</Text></TouchableOpacity>
            </View>
        </View>
    )
}


export default LoginScreen