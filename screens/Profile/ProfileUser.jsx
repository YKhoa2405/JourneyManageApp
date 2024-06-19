import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Alert,
    StyleSheet,
    FlatList,
    Modal,
    TextInput,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import HomeStyle from "../../styles/HomeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../config/API";
import { ToastMess } from "../components/ToastMess";
import UIHeader from "../components/UIHeader";
import {
    black,
    borderUnder,
    item,
    mainColor,
    textWeight,
    transparent,
    txt16,
    white
} from "../../assets/color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar, Button } from "react-native-paper";
import JourneyStyle from "../Journey/JourneyStyle";
import ButtonMain from "../components/ButtonMain";
import ProfileStyle from "./ProfileStyle";
import { firestore } from "../../config/FirebaseConfig";
import {
    addDoc,
    collection,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc
} from "firebase/firestore";
import MyContext from "../../config/MyContext";

const ProfileUserScreen = ({ navigation, route }) => {
    const { userId } = route.params;
    const [myUser, setMyUser] = useState(null);
    const [myJourney, setMyJourney] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [openModel, setOpenModel] = useState(false);
    const [report, setReport] = useState("");
    const timestamp = new Date();

    const [user] = useContext(MyContext)


    useEffect(() => {
        const loadProfileData = async () => {
            await loadProfileUser();
            await getMyJourney();
            setLoading(false);
        };
        loadProfileData();
    }, []);

    const loadProfileUser = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token")
            const response = await authApi(token).get(endpoints["user_profile"](userId));
            setMyUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    const getMyJourney = async () => {
        try {
            const res = await API.get(endpoints['user_journey_profile'](userId));
            setMyJourney(res.data)
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    const handleReport = async () => {
        Alert.alert(
            "Báo cáo tài khoản?",
            "Bạn có chắc muốn báo cáo tài khoản này",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đồng ý",
                    onPress: async () => {
                        try {
                            let formData = new FormData();
                            formData.append('reason', report);
                            const token = await AsyncStorage.getItem("access-token");
                            await authApi(token).post(endpoints["report_user"](userId),
                                formData,
                                {
                                    headers: {
                                        'accept': 'application/json',
                                        'Content-Type': 'multipart/form-data',
                                    }
                                });
                            ToastMess({
                                type: "success",
                                text1: "Báo cáo thành công, chúng tôi đã ghi nhận thông tin"
                            });
                            setOpenModel(false);
                            setReport("");
                        } catch (error) {
                            console.log(error);
                            ToastMess({
                                type: "error",
                                text1: "Có lỗi xảy ra, vui lòng thử lại"
                            });
                            setOpenModel(false);
                            setReport("");
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleFollow = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            await authApi(token).post(endpoints["follow"](userId));
            loadProfileUser()
            if (myUser.followed === false) {
                try {
                    // Thêm thông báo vào collection "notifications" với trường userID là ID của người nhận
                    const notifiCollectionRef = collection(firestore, "notifications");
                    await addDoc(notifiCollectionRef, {
                        timestamp: timestamp,
                        userID: userId, // ID của người nhận
                        user: user, // Thông tin về người thực hiện hành động
                        message: `${user.first_name} đã bắt đầu theo dõi bạn.`,
                        status: "unread",
                        notifityle: "follow"
                    });

                    console.log("Thông báo đã được gửi thành công.");
                } catch (error) {
                    console.log("Lỗi khi gửi thông báo:", error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={JourneyStyle.itemJourney} key={item.id}>
                <View style={JourneyStyle.itemImage}>
                    <Image source={{ uri: item.background }} style={JourneyStyle.itemImage}></Image>
                </View>
                <View style={JourneyStyle.itemContent}>
                    <View style={JourneyStyle.infoJourney}>
                        <Text style={{ fontWeight: "bold", fontSize: txt16, marginBottom: 10 }}>
                            {item.name_journey.length > 30
                                ? item.name_journey.split(" ").slice(0, 3).join(" ") + "..."
                                : item.name_journey}
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: txt16 }}>
                            {item.start_location.length > 30
                                ? item.start_location.split(" ").slice(0, 3).join(" ") + "..."
                                : item.start_location}
                        </Text>
                        <Text style={{ fontWeight: "bold", fontSize: txt16 }}>
                            {item.end_location.length > 30
                                ? item.end_location.split(" ").slice(0, 3).join(" ") + "..."
                                : item.end_location}
                        </Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        <Icon name="star" color={"gold"} size={24}></Icon>
                        <Text style={{ fontWeight: 'bold' }}>{item.average_rating}</Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        {item.active == false ? (
                            <Text style={{ fontWeight: "bold", fontSize: txt16, color: mainColor }}>Hoàn thành </Text>
                        ) : (
                            <Text style={{ fontWeight: "bold", fontSize: txt16 }}>Đang diễn ra </Text>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    const renderModel = () => {
        return (
            <Modal visible={openModel} animationType="slide" transparent={true}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: transparent,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <View style={styles.styleModel}>
                        <View style={styles.headerModel}>
                            <Text style={ProfileStyle.lableTop}>Lý do báo cáo</Text>
                            <TouchableOpacity onPress={() => setOpenModel(false)}>
                                <Icon name="close" size={24} color={"red"} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 20 }}>
                            <TextInput
                                style={JourneyStyle.InputTime}
                                placeholder="Nhập lý do báo cáo tài khoản..."
                                multiline
                                value={report}
                                onChangeText={(t) => setReport(t)}
                            />
                        </View>
                        <View>
                            <ButtonMain title={"Báo cáo"} onPress={() => handleReport()} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    if (isLoading) {
        return (
            <View style={HomeStyle.styleLoading}>
                <ActivityIndicator size="large" color={black} />
            </View>
        );
    }

    return (
        <View style={ProfileStyle.container}>
            {myUser && (
                <UIHeader
                    title={myUser.username}
                    leftIcon={"arrow-left"}
                    rightIcon={"alert-decagram-outline"}
                    handleLeftIcon={() => navigation.goBack()}
                    handleRightIcon={() => setOpenModel(true)}
                />
            )}
            {myUser && (
                <View>
                    <View style={styles.header}>
                        <Avatar.Image source={{ uri: myUser.avatar }} size={70} />
                        <View style={ProfileStyle.headerItem}>
                            <Text style={ProfileStyle.lableTop}>{myUser.journey_count}</Text>
                            <Text>hành trình</Text>
                        </View>
                        <TouchableOpacity style={ProfileStyle.headerItem} onPress={() => navigation.navigate('FollowList', { userID: userId, isFollow: 'followers', follow_count: myUser.follower_count })}>
                            <Text style={ProfileStyle.lableTop}>{myUser.follower_count}</Text>
                            <Text>người theo dõi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ProfileStyle.headerItem} onPress={() => navigation.navigate('FollowList', { userID: userId, isFollow: 'following', follow_count: myUser.following_count })}>
                            <Text style={ProfileStyle.lableTop}>{myUser.following_count}</Text>
                            <Text>đang theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fullnameUser}>
                        <Text style={styles.lableFullname}>{myUser.first_name}</Text>
                    </View>
                    <View style={ProfileStyle.fullnameStar}>
                        <Text style={{ opacity: 0.7 }}>Đánh giá: </Text>
                        <Text style={{ fontWeight: "400", marginRight: 2 }}>{myUser.rate}</Text>
                        <Icon name="star" size={20} color={"gold"} />
                    </View>
                    <View style={styles.header}>
                        <TouchableOpacity style={[styles.buttonFollow, { backgroundColor: myUser.followed ? borderUnder : mainColor }]} onPress={() => handleFollow(myUser.id)}>
                            <Text style={[ProfileStyle.lableButton, { color: myUser.followed ? null : white }]}>
                                {myUser.followed ? 'Đang theo dõi' : 'Theo dõi'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonFollow}
                            onPress={() => {
                                navigation.navigate("MessageDetail", { userChatID: myUser });
                            }}
                        >
                            <Text style={ProfileStyle.lableButton}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ProfileStyle.contentIcon}>
                        <Icon name="view-list-outline" size={28} style={{ opacity: 0.8 }}></Icon>
                    </View>
                    <SafeAreaView>{renderModel()}</SafeAreaView>
                </View>
            )}
            <FlatList
                data={myJourney}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Không có hành trình nào</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    fullnameUser: {
        paddingLeft: 20
    },
    lableFullname: {
        fontWeight: textWeight,
        fontSize: txt16
    },
    buttonFollow: {
        paddingHorizontal: 50,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: borderUnder
    },
    styleModel: {
        width: "90%",
        backgroundColor: white,
        borderRadius: 20,
        padding: 20,
        elevation: 5
    },
    headerModel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputReport: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: item
    }
});

export default ProfileUserScreen;