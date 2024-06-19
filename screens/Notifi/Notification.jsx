import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-paper";
import { black, borderUnder, item, mainColor, txt16, white } from "../../assets/color";
import HomeStyle from "../../styles/HomeStyle";
import MessageStyle from "../Message/MessageStyle";
import UIHeader from "../components/UIHeader";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyContext from "../../config/MyContext";
import { firestore } from "../../config/FirebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import moment from 'moment';  // Import moment

export default function NotificationScreen({ navigation }) {
    const [user, dispatch] = useContext(MyContext);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notifiCountUnred, setNotifiCountUnred] = useState(0)

    useEffect(() => {
        if (!user || !user.id) {
            setLoading(false); // Stop loading when there is no user.id
            return;
        }

        const notifiCollectionRef = collection(firestore, "notifications");
        const queryRef = query(notifiCollectionRef, where("userID", "==", user.id), orderBy("timestamp", "desc"));

        let unreadCount = 0;

        const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const notificationsData = [];
            snapshot.forEach((doc) => {
                const data = doc.data();
                notificationsData.push({ id: doc.id, ...data });

                if (data.status === "unread") {
                    unreadCount++;
                }
            });

            setNotifiCountUnred(unreadCount);
            setNotifications(notificationsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user, firestore]);


    const handleNotifiRead = async (notifityle, param) => {
        switch (notifityle) {
            case 'follow':
                navigation.navigate("ProfileUserScreen", {
                    userId: param
                });
                break;
            case 'journey':
                navigation.navigate('JourneyDetail', { journeyID: param.journeyID, userID: param.userID });
                break;
            case 'comment':
                navigation.navigate('CommentJourneyScreen', { journeyID: param.journeyID, user_create: user.id });
                break;

        }
    };

    return (
        <View style={{ flex: 1 }}>
            <UIHeader title={'Thông báo'} />
            {loading ? (
                <ActivityIndicator color={black} size='small' />
            ) : notifications.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Không có thông báo nào.</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.container, item.status === "unread" ? styles.colorUnred : null]}
                            key={item.id}
                            onPress={() => {
                                let param;
                                switch (item.notifityle) {
                                    case 'follow':
                                        param = item.user.id;
                                        break;
                                    case 'journey':
                                        param = { journeyID: item.journeyID, userID: item.user.id };
                                        break;
                                    case 'comment':
                                        param = { journeyID: item.journeyID, user_create: user.id };
                                        break;
                                }
                                handleNotifiRead(item.notifityle, param);
                            }}
                        >
                            <Avatar.Image source={{ uri: item.user.avatar }} />
                            <View style={styles.notifi}>
                                <Text style={styles.user}></Text>
                                <Text style={styles.content}>{item.message} </Text>
                                {item.message.includes('thích') && <Icon name="heart" size={24} color={'red'} style={styles.iconNotifi}></Icon>}
                                {item.message.includes('bình luận') && <Icon name="comment" size={24} color={'#87ceeb'} style={styles.iconNotifi}></Icon>}
                                {item.message.includes('duyệt') && <Icon name="check-decagram" size={24} color={mainColor} style={styles.iconNotifi}></Icon>}
                                {item.message.includes('theo dõi') && <Icon name="account-plus" size={24} color={"blue"} style={styles.iconNotifi}></Icon>}
                                {item.message.includes('đăng một bài viết') && <Icon name="plus-circle" size={24} color={black} style={styles.iconNotifi}></Icon>}
                                <Text style={MessageStyle.time}>{moment(item.timestamp.seconds * 1000).fromNow()}</Text>

                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: item,
        backgroundColor: borderUnder,
    },
    colorUnred: {
        backgroundColor: '#e6e6fa'
    },
    notifi: {
        paddingHorizontal: 10,
        flex: 1,
    },
});
