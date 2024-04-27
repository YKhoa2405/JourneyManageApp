import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, heart } from "../../assets/color";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JourneyDetail = ({ route }) => {
    const navigation = useNavigation()
    const [post, setPost] = useState(null)
    const { journeyID } = route.params;

    useEffect(() => {
        loadPost()
        delJourney()
    }, [])

    const loadPost = async () => {
        try {
            let res = await API.get(endpoints['post'](journeyID))
            setPost(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const delJourney = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token')
            console.log(token)
            console.log(journeyID)
            await authApi(token).delete(endpoints['del_journey'](journeyID))
        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = () => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa hành trình này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: () => {
                        // Gọi hàm delJourney khi người dùng xác nhận muốn xóa
                        delJourney(journeyID);
                        navigation.goBack();
                    },
                },
            ],
            { cancelable: true }
        );
    };
    return (

        <View style={JourneyStyle.JourneyContainer}>
            {/* <TouchableOpacity style={JourneyStyle.addPostButton}>
                <Icon name="add" size={30} />
            </TouchableOpacity> */}
            <ScrollView>
                <View style={JourneyStyle.coverImage}>
                    <Image style={{ height: 300, resizeMode: 'cover' }} source={require('../../assets/welcome.png')} />
                </View>
                <View style={JourneyStyle.delIcon}>
                    <TouchableOpacity
                        onPress={handleDelete}>
                        <Icon name="delete-outline" size={30} color={'white'}></Icon>
                    </TouchableOpacity>
                </View>
                {post === null ? <ActivityIndicator color={black} size={'large'} /> : <>
                    {
                        post.map(c => (
                            <View style={JourneyStyle.containerPost} key={c.id}>


                                <View style={JourneyStyle.timeHeader}>
                                    <Text style={JourneyStyle.time}>{moment(c.created_date).format('DD/MM/YYYY')}</Text>
                                    <View style={JourneyStyle.horizontalLine}></View>
                                </View>
                                <View style={JourneyStyle.postHeader}>
                                    <View style={JourneyStyle.owner}>
                                        <Avatar.Image size={30} source={{ uri: c.user.avatar }} />
                                        <Text style={JourneyStyle.nameOwner}>{c.user.username}</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <Icon name="dots-vertical" size={30}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <View style={JourneyStyle.postContent}>
                                    <Text>{c.content}</Text>
                                </View>
                                <ScrollView horizontal>
                                    {c.images.map((image, index) => (
                                        <Image source={{ uri: image.uri }} style={JourneyStyle.postImage} key={index} />
                                    ))}
                                </ScrollView>
                                <View style={JourneyStyle.postFeeling}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="cards-heart" color={heart} size={24} />
                                        <Text style={JourneyStyle.nameOwner}>50 Like</Text>
                                    </View>
                                    <Text> 50 commment</Text>
                                </View>
                                <View style={JourneyStyle.postInteract}>
                                    <View style={JourneyStyle.interactItem}>
                                        <Icon name="cards-heart-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Thích</Text>
                                    </View>
                                    <View style={JourneyStyle.interactItem}>
                                        <Icon name="comment-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Bình luận</Text>
                                    </View>
                                </View>
                            </View>
                        )
                        )


                    }</>}
            </ScrollView>
        </View>
    );
};

export default JourneyDetail;