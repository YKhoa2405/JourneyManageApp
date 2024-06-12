import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, SafeAreaView, Modal, ActivityIndicator, FlatList } from "react-native";
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


const ProfileScreen = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);
    const [myJourney, setMyJourney] = useState([])
    const [openModel, setOpenModel] = useState(false);
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        getMyJourney()
    }, []);
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
    console.log(user)

    const getMyJourney = async () => {
        try {
            const res = await API.get(endpoints['get_journey']);
            const journey = res.data.results

            const filteredJourney = journey.filter(item => item.user_create.id === user.id);
            console.log(user.id)
            setMyJourney(filteredJourney)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    const gotoPost = (journeyID, userID) => {
        navigation.navigate('JourneyDetail', { journeyID: journeyID, userID: userID });
    };

    const renderItem = ({ item }) => {

        // Kiểm tra nếu item.id giống với user.id thì hiển thị nội dung
        return (
            <TouchableOpacity style={[JourneyStyle.itemJourney, { opacity: item.active ? 1 : 0.5 }]} key={item.id}
                onPress={() => gotoPost(item.id, user.id)}>
                <View style={JourneyStyle.itemImage}>
                    <Image source={{ uri: item.background }} style={JourneyStyle.itemImage}></Image>
                </View>
                <View style={JourneyStyle.itemContent}>
                    <View style={JourneyStyle.infoJourney}>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16, marginBottom: 10 }}>
                            {item.name_journey.length > 30 ? item.name_journey.split(' ').slice(0, 4).join(' ') + '...' : item.name_journey}
                        </Text>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.start_location.length > 20 ? item.start_location.split(' ').slice(0, 4).join(' ') + '...' : item.start_location}
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.end_location.length > 30 ? item.end_location.split(' ').slice(0, 4).join(' ') + '...' : item.end_location}
                        </Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        <Icon name="star" color={'gold'} size={24}></Icon>
                        <Text style={HomeStyle.text}>Điểm</Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        {item.active == false ? (
                            <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Hoàn thành </Text>

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
                        <Text style={ProfileStyle.lableTop}>10</Text>
                        <Text>hành trình</Text>
                    </View>
                    <View style={ProfileStyle.headerItem}>
                        <Text style={ProfileStyle.lableTop}>{user.follower_count}</Text>
                        <Text>người theo dõi</Text>
                    </View>
                    <View style={ProfileStyle.headerItem}>
                        <Text style={ProfileStyle.lableTop}>{user.following_count}</Text>
                        <Text>đăng theo dõi</Text>
                    </View>
                </View>
                <View style={ProfileStyle.fullnameUser}>
                    <Text style={ProfileStyle.lableFullname}>{user.first_name}</Text>
                </View>
                <View style={ProfileStyle.fullnameUser}>
                    <Text style={HomeStyle.text}>{user.email}</Text>
                </View>
                <View style={ProfileStyle.fullnameStar}>
                    <Text style={HomeStyle.text}>Đánh giá: </Text>
                    <Text style={{ fontWeight: '400', marginRight: 2 }}>5</Text>
                    <Icon name="star" size={20} color={"gold"} />
                </View>
                <View style={ProfileStyle.profileHeader}>
                    <TouchableOpacity style={[ProfileStyle.buttonFollow, { backgroundColor: mainColor }]} onPress={() => navigation.navigate(MyJourney)}>
                        <Text style={[ProfileStyle.lableButton, { color: white }]}>Hành trình của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ProfileStyle.buttonFollow} onPress={() => navigation.navigate(EditProfile)}>
                        <Text style={ProfileStyle.lableButton}>Chỉnh sửa hồ sơ</Text>
                    </TouchableOpacity>
                </View>
                <View style={ProfileStyle.contentIcon}>
                    <Icon name="view-list-outline" size={32} style={{ opacity: 0.8 }}></Icon>
                </View>
                <View>
                    {isLoading ? (
                        <ActivityIndicator color={black} size='small' />
                    ) : (
                        <FlatList
                            data={myJourney}
                            renderItem={renderItem}
                            numColumns={2}
                            contentContainerStyle={JourneyStyle.flatListContent}
                            keyExtractor={(item) => item.id.toString()} // Thêm keyExtractor để tránh cảnh báo
                            ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Không có hành trình nào</Text>} // Hiển thị thông báo khi danh sách trống
                        />
                    )}
                </View>
                <SafeAreaView>
                    {renderModel()}
                </SafeAreaView>
            </View>
        </View>



    );
}

export default ProfileScreen