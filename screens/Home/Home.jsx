import React, { useEffect, useContext, useState } from "react";
import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchCpm from "../components/SearchCpm";
import axios from "axios";
import { item, mainColor } from "../../assets/color";
import ButtonMain from "../components/ButtonMain";
import { Avatar } from "react-native-paper";
import MyContext from "../../config/MyContext";
import API, { endpoints } from "../../config/API";
import moment from "moment";
import Toast from "react-native-toast-message";


const HomeScreen = () => {
    const [isLoading, setLoading] = useState(true);
    const [user, dispatch] = useContext(MyContext);

    const [dataJourney, setDataJourney] = useState([])
    


    useEffect(() => {
        const intervalId = setInterval(() => {
            JourneyGet(); // Gọi API ở đây
        }, 5000); // Thực hiện gọi API mỗi 5 giây (có thể thay đổi số giây tùy ý)

        // Xóa interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, [])

    const JourneyGet = async () => {
        try {
            const res = await API.get(endpoints['get_journey']);
            const journey = res.data.results
            setDataJourney(journey)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    const toast = () => {
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Xóa nhà trọ thành công.',
            visibilityTime: 3000, // Thời gian tồn tại của toast (milliseconds)
            autoHide: true, // Tự động ẩn toast sau khi hết thời gian tồn tại
        });
    }


    const renderJourneyItem = ({ item }) => {
        return (
            <View style={HomeStyle.containerItemHome}>
                <View style={HomeStyle.titleItemHome}>
                    <View >
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar.Image size={30} source={{ uri: item.user_create.avatar }} />
                            <Text style={HomeStyle.nameUser}>{item.user_create.username}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Icon name="dots-vertical" size={25}></Icon>
                    </TouchableOpacity>
                </View>

                <View style={HomeStyle.cardJourney}>
                    <View style={HomeStyle.cardImage}>
                        <Image style={{ width: '100%', height: 150, resizeMode: 'cover', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} source={require('../../assets/welcome.png')} />
                    </View>

                    <View style={HomeStyle.cardContent}>
                        <Text style={HomeStyle.nameJourney}>{item.name_journey}</Text>
                        <View>
                            <View style={HomeStyle.goStart}>
                                <Icon name="map-marker" color={mainColor} size={30}></Icon>
                                <Text style={HomeStyle.text}>{item.start_location}</Text>
                            </View>
                            <View style={HomeStyle.line}></View>
                            <View style={HomeStyle.goStart}>
                                <Icon name="map-marker" color={mainColor} size={30}></Icon>
                                <Text style={HomeStyle.text}>{item.end_location}</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: 10, marginLeft: 4 }}>
                            <View style={HomeStyle.goStart}>
                                <Icon name="clock-time-four-outline" size={25}></Icon>
                                <Text style={HomeStyle.text}>{moment(item.departure_time).format('DD-MM-YYYY')}</Text>
                            </View>
                        </View>
                        <View style={HomeStyle.cardInfo}>
                            <View>
                                <View style={HomeStyle.goStart}>
                                    <Icon name="star-outline" color={'gold'} size={30}></Icon>
                                    <Text>Điểm</Text>
                                </View>
                            </View>
                            <View style={HomeStyle.optionHomeItem}>
                                <TouchableOpacity>
                                    <Icon name="cards-heart-outline" size={25} style={{ marginRight: 15 }}></Icon>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="share-circle" size={25}></Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={HomeStyle.btnAddJourney}>
                            <ButtonMain title="Tham gia hành trình" onPress={toast}/>
                        </View>
                    </View>
                </View>

            </View>
        )
    }




    return (
        <View style={HomeStyle.container}>
            <View style={HomeStyle.header}>
                <View style={HomeStyle.headerTitle}>
                    <Avatar.Image size={30} source={require('../../assets/google.png')} />
                    <Text style={HomeStyle.nameTitle}>Xin chào,  </Text>
                </View>
                <View>
                    <SearchCpm placeholder={'Tìm kiếm hành trình...'}></SearchCpm>
                </View>
            </View>

            {isLoading ? (
                <ActivityIndicator color="black" size={'large'} />
            ) : (
                <FlatList
                    data={dataJourney}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderJourneyItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );

}

export default HomeScreen
