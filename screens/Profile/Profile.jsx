import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, SafeAreaView, Modal, ActivityIndicator, FlatList, TextInput, ScrollView } from "react-native";
import ProfileStyle from "./ProfileStyle";
import ItemProfile from "../components/ItemProfile";
import HomeStyle from "../../styles/HomeStyle";
import MyContext from "../../config/MyContext";
import MyJourney from "../Journey/MyJourney";
import EditProfile from "./EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../config/API";
import { ToastMess } from "../components/ToastMess";
import UIHeader from "../components/UIHeader";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import JourneyStyle from "../Journey/JourneyStyle";
import { black, mainColor, transparent, txt16, txt20, white } from "../../assets/color";
import { useFocusEffect } from "@react-navigation/native";
import ButtonMain from "../components/ButtonMain";


const ProfileScreen = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);

    const [myJourney, setMyJourney] = useState([])
    const [openModel, setOpenModel] = useState(false);
    const [openModelChild, setOpenModelChild] = useState(false);
    const [isLoading, setLoading] = useState(true)

    console.log(user)

    useFocusEffect(
        useCallback(() => {
            getMyJourney()
        }, [user.id])
    )
    // Logout
    const handleLogout = async () => {
        dispatch({
            'type': 'logout'
        })

    }

    const handleDeleteUser = async () => {
        Alert.alert(
            'Xóa tài khoản?',
            'Bạn có chắc muốn xóa tài khoản!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: async () => {
                        // Gọi hàm delJourney khi người dùng xác nhận muốn xóa
                        try {
                            let token = await AsyncStorage.getItem('access-token');
                            await authApi(token).delete(endpoints['delete_user'])
                            ToastMess({ type: 'success', text1: 'Xóa tài khoản thành công' })
                            handleLogout()

                        } catch (error) {
                            console.log(error)
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderModel = () => {
        return (
            <Modal visible={openModel} animationType="slide" transparent={true} >
                <View style={{ flex: 1, backgroundColor: transparent, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>

                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Hoạt động</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor="white"
                                color="red"
                                onPress={() => setOpenModel(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <ItemProfile label={'Đăng xuất'}
                                rightIcon={'chevron-right'}
                                onPress={handleLogout}
                                backgroundColor={mainColor} />

                            {/* <ItemProfile label={'Đánh giá ứng dụng'}
                                rightIcon={'star'}
                                onPress={() => setOpenModelChild(true)}
                                backgroundColor={mainColor} /> */}

                            <ItemProfile label={'Xóa tài khoản'}
                                rightIcon={'account-off-outline'}
                                onPress={handleDeleteUser}
                                backgroundColor={'red'} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const renderModelRatingApp = () => {
        return (
            <Modal visible={openModelChild} animationType="slide" transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: transparent,
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Đánh giá ứng dụng</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor="white"
                                color="red"
                                onPress={() => setOpenModelChild(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ marginVertical: 20 }}>
                                <TextInput
                                    style={JourneyStyle.InputTime}
                                    placeholder="Nhập nội dung đánh giá ứng dụng..."
                                    multiline
                                />
                            </View>

                            <View>
                                <ButtonMain title={"Phản hồi"} />
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const getMyJourney = async () => {
        try {
            const res = await API.get(endpoints['user_journey_profile'](user.id));
            setMyJourney(res.data)
        } catch (error) {
            console.log('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    const gotoPost = (journeyID, userID) => {
        navigation.navigate('JourneyDetail', { journeyID: journeyID, userID: userID });
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={JourneyStyle.itemJourney} key={item.id}
                onPress={() => gotoPost(item.id, user.id)}>
                <View style={JourneyStyle.itemImage}>
                    <Image source={{ uri: item.background }} style={JourneyStyle.itemImage}></Image>
                </View>
                <View style={JourneyStyle.itemContent}>
                    <View style={JourneyStyle.infoJourney}>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16, marginBottom: 10 }}>
                            {item.name_journey.length > 30 ? item.name_journey.split(' ').slice(0, 2).join(' ') + '...' : item.name_journey}
                        </Text>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.start_location.length > 20 ? item.start_location.split(' ').slice(0, 3).join(' ') + '...' : item.start_location}
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.end_location.length > 30 ? item.end_location.split(' ').slice(0, 3).join(' ') + '...' : item.end_location}
                        </Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        <Icon name="star" color={'gold'} size={24}></Icon>
                        <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item.average_rating}</Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        {item.active == false ? (
                            <Text style={{ fontWeight: 'bold', fontSize: txt16, color: mainColor }}>Hoàn thành </Text>

                        ) : (
                            <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Đang diễn ra </Text>

                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={ProfileStyle.container}>
            <UIHeader title={user.username}
                leftIcon={''}
                rightIcon={'dots-vertical'}
                handleRightIcon={() => setOpenModel(true)} />
            <View>
                <View style={ProfileStyle.profileHeader}>
                    <Avatar.Image source={{ uri: user.avatar }} size={70} />
                    <View style={ProfileStyle.headerItem}>
                        <Text style={ProfileStyle.lableTop}>{user.journey_count}</Text>
                        <Text>hành trình</Text>
                    </View>
                    <TouchableOpacity style={ProfileStyle.headerItem} onPress={() => navigation.navigate('FollowList', { userID: user.id, isFollow: 'followers', follow_count: user.follower_count })}>
                        <Text style={ProfileStyle.lableTop}>{user.follower_count}</Text>
                        <Text>người theo dõi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ProfileStyle.headerItem} onPress={() => navigation.navigate('FollowList', { userID: user.id, isFollow: 'following', follow_count: user.following_count })}>
                        <Text style={ProfileStyle.lableTop}>{user.following_count}</Text>
                        <Text>đang theo dõi</Text>
                    </TouchableOpacity>
                </View>
                <View style={ProfileStyle.fullnameUser}>
                    <Text style={ProfileStyle.lableFullname}>{user.first_name}</Text>
                </View>
                <View style={ProfileStyle.fullnameUser}>
                    <Text style={HomeStyle.text}>{user.email}</Text>
                </View>
                <View style={ProfileStyle.fullnameStar}>
                    <Text style={HomeStyle.text}>Đánh giá: </Text>
                    <Text style={{ fontWeight: '400', marginRight: 2 }}>{user.rate}</Text>
                    <Icon name="star" size={20} color={"gold"} />
                </View>
                <View style={ProfileStyle.profileHeader}>
                    <TouchableOpacity style={[ProfileStyle.buttonFollow, { backgroundColor: mainColor }]} onPress={() => navigation.navigate(MyJourney)}>
                        <Text style={[ProfileStyle.lableButton, { color: white }]}>Hành trình tham gia</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ProfileStyle.buttonFollow} onPress={() => navigation.navigate(EditProfile)}>
                        <Text style={ProfileStyle.lableButton}>Chỉnh sửa hồ sơ</Text>
                    </TouchableOpacity>
                </View>
                <View style={ProfileStyle.contentIcon}>
                    <Icon name="view-list-outline" size={28} style={{ opacity: 0.8 }}></Icon>
                </View>
                <SafeAreaView>
                    {renderModel()}
                    {renderModelRatingApp()}
                </SafeAreaView>
            </View>
            {isLoading ? (
                <ActivityIndicator color={black} size='small' />
            ) : (
                <FlatList
                    data={myJourney}
                    renderItem={renderItem}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()} // Thêm keyExtractor để tránh cảnh báo
                    ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Không có hành trình nào</Text>} // Hiển thị thông báo khi danh sách trống
                />
            )}
        </View>
    );
}

export default ProfileScreen