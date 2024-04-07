import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ButtonMain from "./components/ButtonMain";
import ProfileStyle from "../styles/ProfileStyle";

export default function ProfileScreen(){
    return(
        <View style ={ProfileStyle.container}>
            <View style={ProfileStyle.headerContainer}>
                <Icon name="person-add-outline" size={25} style={{padding:20}}></Icon>
            </View>
            <View style={ProfileStyle.profileHeader}>
                <Image source={require('../assets/welcome.png')} style={ProfileStyle.avatar}/>
                <Text style={ProfileStyle.userName}>Tên người dùng</Text>
                <Text style={ProfileStyle.bio}>24/05/2003</Text>
                <TouchableOpacity style={ProfileStyle.buttonChat}>
                    <Text style={{color:'white'}}>Nhắn tin</Text>
                </TouchableOpacity>
            </View>
            
            <View style={ProfileStyle.buttonFollow}>
                <TouchableOpacity style={ProfileStyle.buttonFollower}>
                    <Text>0 Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ProfileStyle.buttonFollower}>
                    <Text>0 Following</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}