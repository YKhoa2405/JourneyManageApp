import React from "react";
import { View, Text, Image, TouchableOpacity, JourneyStyleheet } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { borderUnder, heart, item, white } from "../../assets/color";
import JourneyStyle from "../Journey/JourneyStyle";

const Post = () => {
    return (

        <View style={JourneyStyle.containerPost}>
            <View style={JourneyStyle.timeHeader}>
                <Text style={JourneyStyle.time}>02 martch 2024</Text>
                <View style={JourneyStyle.horizontalLine}></View>
            </View>
            <View style={JourneyStyle.postHeader}>
                <View style={JourneyStyle.owner}>
                    <Avatar.Image size={30} />
                    <Text style={JourneyStyle.nameOwner}>chur baif</Text>
                </View>
                <TouchableOpacity>
                    <Icon name="dots-vertical" size={30}></Icon>
                </TouchableOpacity>
            </View>
            <View style={JourneyStyle.postContent}>
                <Text>noojdsakfhas</Text>
            </View>
            <Image source={require('../../assets/welcome.png')} style={JourneyStyle.postImage}></Image>
            <View style={JourneyStyle.postFeeling}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="cards-heart" color={heart} size={24} />
                    <Text style={JourneyStyle.nameOwner}>50 Like</Text>
                </View>
                <Text> 50 commment</Text>
            </View>
            <View style={JourneyStyle.postInteract}>
                <View style={JourneyStyle.interactItem}>
                    <Icon name="cards-heart-outline" size={26} />
                    <Text style={JourneyStyle.nameOwner}>Thích</Text>
                </View>
                <View style={JourneyStyle.interactItem}>
                    <Icon name="comment-outline" size={26} />
                    <Text style={JourneyStyle.nameOwner}>Bình luận</Text>
                </View>
            </View>
        </View>
    )
}

export default Post
