import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ProfileStyle from "./ProfileStyle";
import ItemProfile from "../components/ItemProfile";
import HomeStyle from "../../styles/HomeStyle";
import MyContext from "../../config/MyContext";
import MyJourney from "../Journey/MyJourney";
import EditProfile from "./EditProfile";

const ProfileScreen=({navigation})=> {
    const [user, dispatch] = useContext(MyContext);
    const [dataJourney,setDataJourney] = useState([])
    // Logout
    const handleLogout =()=>{
        dispatch({
            'type':'logout'
        })
    }

    return (
        <View style={ProfileStyle.container}>
            <View style={ProfileStyle.profileHeader}>
                <View>
                    <Image source={{ uri: user.avatar }} style={ProfileStyle.avatar} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={ProfileStyle.userName}>{user.username}</Text>
                    <Text style={HomeStyle.text}>{user.email}</Text>
                </View>
            </View>
            <View style={ProfileStyle.ProfileInfo}>
                <View style={ProfileStyle.profileContent}>
                    <ItemProfile label={'Chỉnh sửa thông tin'}
                        icon={'account-edit-outline'}
                        onPress={() => navigation.navigate(EditProfile)} />
                </View>
                <View style={ProfileStyle.profileContent}>
                    <ItemProfile label={'Đang theo dõi'}
                        icon={'account-eye-outline'} />
                    <ItemProfile label={'Người theo dõi'}
                        icon={'account-check-outline'} />
                </View>
                <View style={ProfileStyle.profileContent}>
                    <ItemProfile label={'Hành trình'}
                        icon={'wallet-travel'}
                        onPress={() => navigation.navigate(MyJourney)} />
                </View>
                <View style={ProfileStyle.profileContent}>
                    <ItemProfile label={'Đăng xuất'}
                        icon={'logout'}
                        onPress={handleLogout}/>
                </View>
            </View>
        </View>

        
    );
}

export default ProfileScreen