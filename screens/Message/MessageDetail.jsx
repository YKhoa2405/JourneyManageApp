import React, { useState } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import MessageStyle from "./MessageStyle";
import { Avatar, Badge } from "react-native-paper";
import UIHeader from "../components/UIHeader";
import { useNavigation } from "@react-navigation/native";

const MessageDetail = ({ route }) => {
    const { userChat } = route.params;
    const navigation = useNavigation()

    const goMess = () => {
        navigation.goBack()
    }

    const [chatHistory, setChatHistory] = useState([
        {
            url: 'https://randomuser.me/api/results',
            isSender: true,
            message: 'Hello',
            timestamp: 16416542380000,
        }, {
            url: 'https://randomuser.me/api/',
            isSender: true,
            message: 'How are you hjgflsdjkfhalsdkjhfljksdfhlasdljhkfhasdfhksjldflkahjsd',
            timestamp: 16416542980000,
        },
        // false là mình
        {
            url: 'https://randomuser.me/api/',
            isSender: false,
            message: 'im fine ,and you',
            timestamp: 16416543000000,
        },
        {
            url: 'https://randomuser.me/api/',
            isSender: true,
            message: 'toi klhor klkkk',
            timestamp: 16416543500000,
        },
    ])
    return (
        <View>
            <UIHeader
                title={userChat.name}
                leftIcon={'arrow-left'}
                rightIcon={'alert-circle'}
                handleLeftIcon={goMess}
            />
            <FlatList
                data={chatHistory}
                keyExtractor={(item) => item.message} // Sử dụng trường 'name' làm key
                renderItem={({ item }) => (
                    <View style={[MessageStyle.itemContainer, { flexDirection: item.isSender ? 'row':'row-reverse' }]}>
                        {/* Hiển thị Avatar bên trái nếu isSender là false, và bên phải nếu isSender là true */}
                        <Avatar.Image source={{ uri: item.url }} size={40} style={{ marginHorizontal: 5 }} />
                        <View style={[MessageStyle.messageContent, { justifyContent: item.isSender ? 'flex-start' : 'flex-end' }]}>
                            <Text style={MessageStyle.messageText}>{item.message}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default MessageDetail