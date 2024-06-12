import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground, TouchableWithoutFeedback } from "react-native";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchCpm from "../components/SearchCpm";
import axios from "axios";
import { black, item, mainColor } from "../../assets/color";
import ButtonMain from "../components/ButtonMain";
import { Avatar } from "react-native-paper";
import MyContext from "../../config/MyContext";
import API, { authApi, endpoints } from "../../config/API";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeScreen = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [user, dispatch] = useContext(MyContext);


    const [searchQuery, setSearchQuery] = useState('');
    const [dataJourney, setDataJourney] = useState([])
    const [likedState, setLikedState] = useState({});


    useEffect(() => {
        JourneyGet();
        handleLike();
    }, []);

    useFocusEffect(
        useCallback(() => {
            JourneyGet()
        }, [])
    );

    const handleLike = async (journeyID) => {
        try {
            const token = await AsyncStorage.getItem("access-token")
            console.log(token)

            const res = await authApi(token).post(endpoints['like_journey'](journeyID))

            setLikedState(prevLikedState => ({ ...prevLikedState, [journeyID]: true }));
            // Cập nhật bài đăng được thích trong state posts
            setDataJourney(prevPosts => prevPosts.map(journey => {
                if (journey.id === journeyID) {
                    return { ...journey, liked: true };
                }
                return journey;
            }));
            JourneyGet();

        } catch (error) {
            console.log(error)

        }
    }


    const JourneyGet = async () => {
        try {
            const token = await AsyncStorage.getItem("access-token")
            const res = await authApi(token).get(endpoints['get_journey']);
            let journey = res.data.results
            console.log(journey)
            journey = journey.filter(j => j.active);
            setDataJourney(journey)

            const newLikeState = {}
            journey.forEach(journey => {
                if (journey.liked) {
                    newLikeState[journey.id] = true
                }
            });
            setLikedState(newLikeState)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }



    const handleSearch = async () => {
        try {

            const response = await API.get(endpoints['search_journey'](searchQuery))
            const dataSearch = response.data.results
            setDataJourney(dataSearch)
        } catch (error) {
            console.log(error)
        }
    };

    const goToProfileUser = (id) => {
        if (user.id === null) {
            navigation.navigate("Đăng nhập");
        } else if (id === user.id) {
            navigation.navigate("Trang cá nhân");
        } else {
            navigation.navigate("ProfileUserScreen", {
                userId: id
            });
        }
    };

    const renderJourneyItem = ({ item }) => {
        return (
            <View style={HomeStyle.containerItemHome} key={item.id}>
                <View style={HomeStyle.titleItemHome}>
                    <View >
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={() => goToProfileUser(item.user_create.id)}>
                            <Avatar.Image size={30} source={{ uri: item.user_create.avatar }} />
                            <Text style={HomeStyle.nameUser}>{item.user_create.username}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={HomeStyle.cardJourney}>
                    <View style={HomeStyle.cardImage}>
                        <Image style={{ width: '100%', height: 190, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={{ uri: item.background }} />
                    </View>

                    <View style={HomeStyle.cardContent}>
                        <Text style={HomeStyle.nameJourney}>{item.name_journey}</Text>
                        <View>
                            <View style={HomeStyle.goStart}>
                                <Icon name="map-marker" color={mainColor} size={24}></Icon>
                                <Text style={HomeStyle.text}>{item.start_location}</Text>
                            </View>
                            <View style={HomeStyle.line}></View>
                            <View style={HomeStyle.goStart}>
                                <Icon name="map-marker" color={mainColor} size={24}></Icon>
                                <Text style={HomeStyle.text}>{item.end_location}</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 6 }}>
                            <View style={HomeStyle.goStart}>
                                <Icon name="clock-time-four-outline" size={24}></Icon>
                                <Text style={HomeStyle.text}>{item.departure_time}</Text>
                            </View>
                        </View>
                        <View style={{ marginBottom: 5 }}>
                            <View style={HomeStyle.goStart}>
                                <Icon name="motorbike" size={24}></Icon>
                                <Text style={HomeStyle.text}>{item.distance} km</Text>
                            </View>
                        </View>

                        {user !== null && (
                            <>
                                <View style={HomeStyle.optionHomeItem}>
                                    <View style={HomeStyle.cardInfo}>
                                        <TouchableWithoutFeedback onPress={() => handleLike(item.id)} >
                                            {likedState[item.id] ? (<Icon name="heart" size={24} color={'red'} />) : (<Icon name="cards-heart-outline" size={24} color={black} />)}
                                        </TouchableWithoutFeedback>
                                        <Text style={HomeStyle.text}>{item.likes_count} lượt thích</Text>
                                    </View>
                                    <View style={HomeStyle.cardInfo}>

                                        <TouchableOpacity onPress={() => navigation.navigate('CommentJourneyScreen', { journeyID: item.id, user_create: item.user_create.id })}>
                                            <Icon name="comment-outline" size={24}></Icon>
                                        </TouchableOpacity>
                                        <Text style={HomeStyle.text}>{item.comments_count} bình luận</Text>

                                    </View>
                                </View>
                            </>
                        )}

                    </View>
                </View>

            </View>
        )
    }

    return (
        <View style={HomeStyle.container}>
            <View style={HomeStyle.header}>
                <View style={HomeStyle.headerTitle}>
                    {user !== null ? (
                        user.avatar !== null && user.username !== null ? (
                            <>
                                <Avatar.Image size={30} source={{ uri: user.avatar }} />
                                <Text style={HomeStyle.nameTitle}>Xin chào, {user.username}</Text>
                            </>
                        ) : (
                            <Text style={HomeStyle.nameTitle}>Đăng nhập để trải nghiệm nhiều hơn</Text>
                        )
                    ) : (
                        <Text style={HomeStyle.nameTitle}>Đăng nhập để trải nghiệm nhiều hơn</Text>
                    )}
                </View>
                <View>
                    <SearchCpm
                        placeholder={'Tìm kiếm hành trình...'}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={handleSearch} />
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator color="black" size={'large'} style={HomeStyle.styleLoading} />
            ) : dataJourney.length > 0 ? (
                <FlatList
                    data={dataJourney}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderJourneyItem}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Không có hành trình khả dụng.</Text>
                </View>
            )}
        </View>
    );

}

export default HomeScreen
