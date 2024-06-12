import React, { useContext, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
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




    useEffect(() => {
        JourneyGetUser()
    }, [])

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
            <TouchableOpacity style={[JourneyStyle.itemJourney, { opacity: item.active ? 1 : 0.6 }]} key={item.id}
                onPress={() => gotoPost(item.id, item.user_create.id)}>
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
                        <View>
                            <Avatar.Image size={30} source={{ uri: item.user_create.avatar }} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item.user_create.username}</Text>
                            <Text style={HomeStyle.text}>{item.user_create.phone} 0866695643</Text>
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

