import React, { useContext, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MyContext from "../../config/MyContext";
import { ActivityIndicator, Avatar } from "react-native-paper";
import API, { authApi, endpoints } from "../../config/API";
import { black, txt16, txt18, txt20 } from "../../assets/color";
import HomeStyle from "../../styles/HomeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UIHeader from "../components/UIHeader";

const MyJourney = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])


    useFocusEffect(
        useCallback(() => {
            JourneyGetUser()
        }, [])
    );


    const JourneyGetUser = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token")
            const res = await authApi(token).get(endpoints['user_journeys']);
            setData(res.data)
            console.log(res.data)
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
            <TouchableOpacity style={JourneyStyle.itemJourney} key={item.id}
                onPress={() => gotoPost(item.id, item.user_create.id)}>
                <View style={JourneyStyle.itemImage}>
                    <Image source={{ uri: item.background }} style={JourneyStyle.itemImage}></Image>
                </View>
                <View style={JourneyStyle.itemContent}>
                    <View style={JourneyStyle.infoJourney}>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16, marginBottom: 10 }}>
                            {item.name_journey.length > 30? item.name_journey.split(' ').slice(0, 4).join(' ') + '...' : item.name_journey}
                        </Text>

                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.start_location.length > 20 ? item.start_location.split(' ').slice(0, 3).join(' ') + '...' : item.start_location}
                        </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>
                            {item.end_location.length > 30 ? item.end_location.split(' ').slice(0, 3).join(' ') + '...' : item.end_location}
                        </Text>
                    </View>
                    {item.active ? (
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Đang diễn ra</Text>
                    ) : (
                        <View style={JourneyStyle.userJourney}>
                            <Icon name="star" color={"gold"} size={24} />
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item.average_rating}</Text>
                        </View>
                    )}
                    <View style={JourneyStyle.userJourney}>
                        <View>
                            <Avatar.Image size={30} source={{ uri: item.user_create.avatar }} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item.user_create.username}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={JourneyStyle.JourneyContainer}>
            <UIHeader
                title={'Hành trình của tôi'}
                leftIcon={'arrow-left'}
                handleLeftIcon={() => navigation.goBack()}
                rightIcon={''} />
            {isLoading ? (
                <ActivityIndicator color={black} size='small' style={HomeStyle.styleLoading} />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={JourneyStyle.flatListContent}
                    keyExtractor={(item) => item.id.toString()} // Thêm keyExtractor để tránh cảnh báo
                    ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Không có hành trình nào</Text>} // Hiển thị thông báo khi danh sách trống
                />
            )}
        </View>
    )

}
export default MyJourney

