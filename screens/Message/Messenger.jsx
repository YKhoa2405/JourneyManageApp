import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import MessageStyle from "./MessageStyle";
import { Avatar, Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UIHeader from "../components/UIHeader";

export default function MessengerScreen() {

    const navigation = useNavigation()

    const [userChat, setUserChat] = useState([
        {
            id:1,
            url: 'https://randomuser.me/api/',
            name: 'nguyen y ',
            message: 'hola, how a you'

        },
        {
            id:2,
            url: 'https://randomuser.me/api/',
            name: 'nguyen y kho',
            message: 'hola, how a you'

        }
    ])

    return (
        <View style={MessageStyle.container}>
            <UIHeader
                title={'Trò chuyện'}
                leftIcon={'arrow-left'}
                rightIcon={'account-search-outline'} />
            <FlatList
                data={userChat}
                keyExtractor={(item) => item.id} // Sử dụng trường 'name' làm key
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MessageDetail', { userChat: item })
                        }}>
                        <View style={MessageStyle.itemContainer}>
                            {/* Hiển thị ảnh từ 'url' (để thực hiện lấy ảnh từ API) */}
                            <Avatar.Image source={{ uri: item.url }} size={60} style={{ marginRight: 5 }} />
                            <View style={MessageStyle.messageContainer}>
                                <View>
                                    <Text style={MessageStyle.name}>{item.name}</Text>
                                    <Text>{item.message}</Text>
                                </View>
                                <View>
                                    <Text style={MessageStyle.time}>12:25</Text>
                                    <Badge>3</Badge>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}