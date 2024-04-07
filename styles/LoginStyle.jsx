import { StyleSheet } from "react-native";
import { mainColor } from "../assets/color";

const LoginStyle = StyleSheet.create({
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

    inputContainer:{
        alignItems:'flex-end'
    },
    forgotPass:{
        marginVertical:20,
        fontWeight:'500',
    }, 
    registerContainer:{
        flexDirection:'row',
        justifyContent:'center'
        ,alignItems:'center'
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

export default LoginStyle