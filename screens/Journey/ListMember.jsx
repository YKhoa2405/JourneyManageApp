import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import UIHeader from "../components/UIHeader";
import API, { authApi, endpoints } from "../../config/API";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black, borderUnder, item, mainColor, white } from "../../assets/color";
import HomeStyle from "../../styles/HomeStyle";
import { ActivityIndicator, Avatar } from "react-native-paper";
import JourneyStyle from "./JourneyStyle";
import { ToastMess } from "../components/ToastMess";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";




const ListMember = ({ route, navigation }) => {
    const { journeyID } = route.params;
    const [member, setMember] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [user, dispatch] = useContext(MyContext);


    useEffect(() => {
        loadMember();
    }, []);

    const goToProfileUser = (id) => {
        if (id == user.id) {
            navigation.navigate("Profile");
        } else {
            navigation.navigate("ProfileUserScreen", {
                userId: id
            });
        }
    };

    const loadMember = async () => {
        try {
            const res = await API.get(endpoints['member_journey'](journeyID))
            console.log(res.data)
            setMember(res.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteMember = (memberID) => {
        Alert.alert(
            'Xóa thanh viên?',
            'Bạn có chắc muốn xóa thành viên này khỏi hành trình ',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        // Gọi hàm delJourney khi người dùng xác nhận muốn xóa
                        try {
                            const token = await AsyncStorage.getItem('access-token')
                            await authApi(token).patch(endpoints['member_delete'](journeyID), {
                                user_id: memberID
                            });
                            ToastMess({ type: 'success', text1: 'Xóa thành viên thành công' })
                            loadMember()

                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, hãy thử lại' })
                            console.log(error)
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }


    return (
        <View style={{ flex: 1 }}>
            <UIHeader
                title={'Danh sách thành viên'}
                leftIcon={'arrow-left'}
                handleLeftIcon={() => navigation.goBack()}
                handleRightIcon={() => navigation.navigate("MapMember")}
                rightIcon={'map'} />
            {isLoading ? <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} /> : <>
                <FlatList
                    data={member}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View
                            key={item.id}
                            style={HomeStyle.containerMember}
                        >
                            <TouchableOpacity onPress={() => {
                                if (user.id !== item.id) {
                                    goToProfileUser(item.id);
                                }
                            }}>
                                <Avatar.Image source={{ uri: item.avatar }} size={50} style={JourneyStyle.imageMember} />
                            </TouchableOpacity>
                            <Text>{item.username}</Text>
                            <Text>{item.full_name}</Text>
                            {item.ownerJourney ? (<Icon name="check-decagram" size={24} color={mainColor} />) :
                                (<TouchableOpacity onPress={() => handleDeleteMember(item.id)}>
                                    <Icon name="close" size={24} color={'red'} />
                                </TouchableOpacity>)}
                        </View>
                    )}
                />
            </>}
        </View>
    )
}

export default ListMember