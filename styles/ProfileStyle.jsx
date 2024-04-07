import { StyleSheet } from "react-native";
import { borderUnder, item, mainColor, white } from "../assets/color";

const ProfileStyle = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingHorizontal:10
    },
    profileHeader:{
        alignItems:'center',
    },
    avatar:{
        width:110,
        height:110,
        borderWidth:1,
        borderColor:mainColor,
        borderRadius:100,
        marginBottom:15
    },
    userName:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:10
    },
    buttonFollow:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        paddingHorizontal:70

        
    },
    buttonFollower:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:borderUnder,
        borderRadius:10
    },
    buttonChat:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:mainColor,
        borderRadius:10,
        marginTop:20
    }
})

export default ProfileStyle