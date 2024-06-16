import React, { useContext, useEffect, useState } from "react";
import UIHeader from "../components/UIHeader";
import API, { authApi, endpoints } from "../../config/API";
import { ActivityIndicator, FlatList, TouchableOpacity, View, Text } from "react-native";
import { black, white } from "../../assets/color";
import HomeStyle from "../../styles/HomeStyle";
import JourneyStyle from "../Journey/JourneyStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar } from "react-native-paper";
import ProfileStyle from "./ProfileStyle";
import { ToastMess } from "../components/ToastMess";
import MyContext from "../../config/MyContext";

const FollowList = ({ navigation, route }) => {
    const { userID, isFollow, follow_count } = route.params;
    const title = isFollow === 'followers'
        ? `Người theo dõi: ${follow_count}`
        : `Đang theo dõi: ${follow_count}`;
    const [dataFollow, setDataFollow] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, dispatch] = useContext(MyContext)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let results
            if (isFollow === 'followers') {
                results = await loadFollowers();
            } else {
                results = await loadFollowing();
            }
            if (results) {
                setDataFollow(results);
            }
            console.log(results)
            setLoading(false);
        }
        fetchData()
    }, [userID, isFollow])

    const loadFollowers = async () => {
        try {
            const token = await AsyncStorage.getItem('access-token')

            const res = await authApi(token).get(endpoints['followers'](userID))
            return res.data


        } catch (error) {
            console.log(error)
            return null
        }
    }

    const loadFollowing = async () => {
        try {
            const token = await AsyncStorage.getItem('access-token')

            const res = await authApi(token).get(endpoints['following'](userID))
            return res.data

        } catch (error) {
            console.log(error)
            return null
        }
    }


    const goToProfileUser = (id) => {
        if (id == userID) {
            navigation.navigate("Profile");
        } else {
            navigation.navigate("ProfileUserScreen", {
                userId: id
            });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <UIHeader title={title}
                leftIcon={'arrow-left'}
                handleLeftIcon={() => navigation.goBack()} />
            {loading ? <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} /> : <>
                <FlatList
                    data={dataFollow}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Danh sách trống</Text>}
                    renderItem={({ item }) => (
                        <View
                            key={item.id}
                            style={HomeStyle.containerMember}
                        >
                            {item.id === user.id ? (
                                <Avatar.Image source={{ uri: item.avatar }} size={50} style={JourneyStyle.imageMember} />
                            ) : (
                                <TouchableOpacity onPress={() => goToProfileUser(item.id)}>
                                    <Avatar.Image source={{ uri: item.avatar }} size={50} style={JourneyStyle.imageMember} />
                                </TouchableOpacity>
                            )}
                            <Text>{item.username}</Text>
                            <Text>{item.full_name}</Text>
                        </View>
                    )}
                />
            </>}
        </View >
    )
}

export default FollowList