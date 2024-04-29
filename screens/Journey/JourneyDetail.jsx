import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput, FlatList } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, errorMess, heart, successMess, txt22, white } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import Toast from "react-native-toast-message";


const JourneyDetail = ({ route }) => {
    const [user, dispatch] = useContext(MyContext)
    const navigation = useNavigation()

    const [post, setPost] = useState(null)
    // Lưu comment

    const { journeyID } = route.params;
    moment.locale('vi');


    useEffect(() => {
        loadPost()
    }, [])

    const backMyJourney = () => {
        navigation.goBack()
    }
    //api load post
    const loadPost = async () => {
        try {
            let res = await API.get(endpoints['post'](journeyID))
            setPost(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteJourney = async () => {
        Alert.alert(
            'Bạn có chắc chắn muốn xóa hành tình này?',
            'Tất cả bài đăng cũng sẽ mất!',
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
                            await authApi(token).delete(endpoints['del_journey'](journeyID));
                            navigation.goBack();
                        } catch (error) {
                            if (error.response && error.response.status === 403) {
                                setTimeout(() => {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Bạn không phải chủ hành trình',
                                    });
                                }, 4000);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };


    const goComment = (postID) => {
        navigation.navigate('CommentScreen', { postID: postID });
    };

    const goEditPost = (postID) => {
        let token = 
        navigation.navigate('EditPost', { postID: postID });
    };

    const handleDeletePost = async (postID) => {
        Alert.alert(
            'Xóa bài đăng?',
            'Bạn có chắc muốn xóa bài đăng này!',
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
                            await authApi(token).delete(endpoints['del_post'](postID));
                            setTimeout(() => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Xóa thành công',
                                });
                            }, 4000);
                            loadPost()
                        } catch (error) {
                            if (error.response && error.response.status === 403) {
                                setTimeout(() => {
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Bạn không phải chủ bài đăng',
                                    });
                                }, 4000);
                            }
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (

        <View>
            {/* <TouchableOpacity style={JourneyStyle.addPostButton}>
                <Icon name="add" size={30} />
            </TouchableOpacity> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={JourneyStyle.headerIcon}>
                    <View>
                        <TouchableOpacity style={JourneyStyle.touIcon} onPress={backMyJourney}>
                            <Icon name="arrow-left" size={28} color={black} />
                        </TouchableOpacity>
                    </View>
                    <View style={JourneyStyle.editIcon}>
                        <TouchableOpacity style={JourneyStyle.touIcon}>
                            <Icon name="circle-edit-outline" size={28} color={black} />
                        </TouchableOpacity>
                        <TouchableOpacity style={JourneyStyle.touIcon}
                            onPress={handleDeleteJourney}>
                            <Icon name="delete-outline" size={28} color={'red'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={JourneyStyle.touIcon}
                        >
                            <Icon name="alert-octagon-outline" size={28} color={black} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={JourneyStyle.listMember}>
                    <Text style={{ marginBottom: 20 }}>dnah sacsh thanf htvien</Text>
                </View>
                {post === null ? <ActivityIndicator color={black} size={'large'} /> : <>
                    {
                        post.map(c => (
                            <View style={JourneyStyle.containerPost} key={c.id}>
                                <View style={JourneyStyle.timeHeader}>
                                    <Text style={JourneyStyle.time}>{moment(c.created_date).fromNow()}</Text>
                                    <View style={JourneyStyle.horizontalLine}></View>
                                </View>
                                <View style={JourneyStyle.postHeader}>
                                    <View style={JourneyStyle.owner}>
                                        <Avatar.Image size={30} source={{ uri: c.user.avatar }} />
                                        <View>
                                            <Text style={JourneyStyle.nameOwner}>{c.user.username}</Text>
                                            <Text style={JourneyStyle.nameOwner}>{c.visit_point}</Text>

                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => handleDeletePost(c.id)}>
                                        <Icon name="alpha-x-circle-outline" size={28}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <View style={JourneyStyle.postContent}>
                                    <Text>{c.content}</Text>
                                </View>
                                    <View>

                                        {c.images.map((image, index) => (
                                            <Image source={{ uri: image.image }} style={JourneyStyle.postImage} key={index} />

                                        ))}
                                    </View>
                                <View style={JourneyStyle.postFeeling}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="cards-heart" color={heart} size={24} />
                                        <Text style={JourneyStyle.nameOwner}>50 Like</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => goComment(c.id)}
                                        style={JourneyStyle.interactItem}>
                                        <Icon name="comment-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Bình luận</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={JourneyStyle.postInteract}>
                                    <TouchableOpacity style={JourneyStyle.interactItem}>
                                        <Icon name="cards-heart-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Thích</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={JourneyStyle.interactItem} onPress={()=>goEditPost(c.id)}>
                                        <Icon name="circle-edit-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Chỉnh sửa</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        )
                        )

                    }</>}
            </ScrollView>
        </View >
    );
};

export const EditPost=({route})=>{

}

export default JourneyDetail;