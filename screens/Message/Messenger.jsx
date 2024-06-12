import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import MessageStyle from "./MessageStyle";
import { Avatar, Badge } from "react-native-paper";
import UIHeader from "../components/UIHeader";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../../config/FirebaseConfig";
import moment from "moment";
import HomeStyle from "../../styles/HomeStyle";
import { txt16, txt18 } from "../../assets/color";
import MyContext from "../../config/MyContext";


export default function MessengerScreen({ navigation }) {
    const [chatSessions, setChatSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, dispatch] = useContext(MyContext)

    useEffect(() => {
        if (!user?.id) {
            setChatSessions([]);
            setLoading(false);
            return;
        }

        const chatSessionsRef = collection(firestore, 'chatSessions');
        const chatSessionsQuery = query(chatSessionsRef, orderBy('lastMessTime', 'desc'));

        const unsubscribe = onSnapshot(chatSessionsQuery, (querySnapshot) => {
            const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const filteredSessions = sessionsData.filter(session =>
                session.userSendById.id === user.id || session.userSendToId.id === user.id
            );
            setChatSessions(filteredSessions);
            console.log(filteredSessions);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user?.id]);

    const renderItem = ({ item }) => {
        const { lastMess, lastMessTime, userSendToId, userSendById, } = item;

        // Chuyển đổi đối tượng lastMessTime thành chuỗi có thể hiển thị được
        const formattedTime = moment.unix(lastMessTime.seconds).fromNow();

        const otherSender = (userSendById.id !== user.id ? userSendById : userSendToId);

        const truncateText = (text, maxLength) => {
            if (text.length > maxLength) {
                return text.slice(0, maxLength) + '...';
            }
            return text;
        };

        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('MessageDetail', { userChatID: otherSender });
                }}
            >
                <View style={MessageStyle.itemContainer}>
                    {/* Hiển thị ảnh từ 'url' (để thực hiện lấy ảnh từ API) */}
                    <Avatar.Image source={{ uri: otherSender.avatar }} size={60} style={{ marginRight: 5 }} />
                    <View style={MessageStyle.messageContainer}>
                        <View>
                            <Text style={MessageStyle.name}>{otherSender.username}</Text>
                            <Text>
                                {userSendById.id === user.id
                                    ? `Bạn: ${truncateText(lastMess, 25)}`
                                    : truncateText(lastMess, 25)} 
                            </Text>

                        </View>
                        <View>
                            <Text style={MessageStyle.time}>{formattedTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };





    return (
        <View style={MessageStyle.container}>
            <UIHeader
                title={'Trò chuyện'} />
            {loading ? (
                <ActivityIndicator color="black" size="large" style={HomeStyle.styleLoading} />
            ) : !user?.id || chatSessions.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Không có cuộc trò chuyện nào.</Text>
                </View>
            ) : (
                <FlatList
                    data={chatSessions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </View>
    );
}