import { StyleSheet } from "react-native";
import { borderUnder, item, mainColor, txt22, white } from "../../assets/color";

const ProfileStyle = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:white
    },
    profileHeader:{
        alignItems:'center',
        flexDirection:'row',
        marginLeft:20,
        marginTop:50
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
        fontSize:txt22,
        fontWeight:'bold',
        marginBottom:5
    },
    buttonChat:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:mainColor,
        borderRadius:10,
        marginVertical:20
    },
    profileContent:{
        paddingHorizontal: 20,
        borderTopWidth:1,
        borderColor:borderUnder,
    }
})

export default ProfileStyle