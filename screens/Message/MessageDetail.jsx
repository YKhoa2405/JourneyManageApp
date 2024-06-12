import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, TextInpu, Image } from "react-native";
import MessageStyle from "./MessageStyle";
import { Avatar, Badge } from "react-native-paper";
import JourneyStyle from "../Journey/JourneyStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import UIHeader from "../components/UIHeader";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { firestore } from "../../config/FirebaseConfig";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import MyContext from "../../config/MyContext";
import { black, mainColor } from "../../assets/color";



const MessageDetail = ({ route, navigation }) => {
    const { userChatID } = route.params;
    const [user, dispatch] = useContext(MyContext);
    const chatId = [user.id.toString(), userChatID.id.toString()].sort().join('_');


    const [messages, setMessages] = useState([])
    console.log(userChatID);
    console.log(user.id);



    useEffect(() => {

        const subscriber = collection(firestore, "chats", chatId, "messages")
        const shortSubscriber = query(subscriber, orderBy("createdAt", "desc"))

        const unsubscribe = onSnapshot(shortSubscriber, (querySnapshot) => {
            const allMessages = querySnapshot.docs.map((doc) => {
                return { ...doc.data(), createdAt: doc.data().createdAt.toDate() }; // Chuyển đổi thời gian tạo thành đối tượng Date
            });
            setMessages(allMessages);
        });
        return () => unsubscribe();
    }, [])


    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const timestamp = new Date()
        const chatSessionDocRef = doc(firestore, "chatSessions", chatId)

        try {
            const chatSessionDoc = await getDoc(chatSessionDocRef)
            if (!chatSessionDoc.exists()) {
                await setDoc(chatSessionDocRef, {
                    userSendById: user,
                    userSendToId: userChatID,
                    lastMess: msg.text,
                    lastMessTime: timestamp,
                    isSeen: false //chưa xem khi gửi đi

                })
            } else {
                await updateDoc(chatSessionDocRef, {
                    lastMess: msg.text,
                    lastMessTime: timestamp,
                    isSeen: false //chưa xem khi gửi đi

                })
            }
        } catch (error) {
            console.error("Lỗi khi lưu tin nhắn vào chat session:", error);
        }
        const myMsg = {
            ...msg,
            sendBy: user.id,
            sendTo: userChatID.id,
            createdAt: msg.createdAt, // Sử dụng createdAt trực tiếp
            isSeen: false //chưa xem khi gửi đi
        }

        addDoc(collection(firestore, "chats", chatId, "messages"), myMsg);
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [userChatID])


    return (
        <View style={{ flex: 1 }}>
            <UIHeader
                title={userChatID.username}
                leftIcon={'arrow-left'}
                handleLeftIcon={() => navigation.goBack()}
            />

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: user.id }}
                renderAvatar={(props) => <Avatar.Image {...props} source={{ uri: userChatID.avatar }} size={32} />}
                renderSend={props => {
                    return (
                        <Send {...props} >
                            <Image source={require("../../assets/send.png")} style={{ width: 22, height: 22, marginRight: 14, marginBottom: 12 }} />
                        </Send>
                    )
                }}
            />
        </View>
    )
}

export default MessageDetail



