import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput } from "react-native";
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
import MessageSuss from "../components/MessageError";


const JourneyDetail = ({ route }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [user, dispatch] = useContext(MyContext)
    const navigation = useNavigation()
    const [post, setPost] = useState(null)
    // Lưu comment
    const [content, setContent] = useState()
    const [comment, setComment] = useState()
    const [showComment, setShowComment] = useState(false)
    const { journeyID } = route.params;
    moment.locale('vi');


    useEffect(() => {
        loadPost()
        delJourney()
        loadComment()
    }, [])

    //api load post
    const loadPost = async () => {
        try {
            let res = await API.get(endpoints['post'](journeyID))
            setPost(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // api xóa journey
    const delJourney = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            await authApi(token).delete(endpoints['del_journey'](journeyID));
            // Trả về true nếu xóa thành công
            return true;
        } catch (error) {
            if (error.response && error.response.status === 403) {
                return false; // Trả về false nếu lỗi là 403
            }
            // Trả về false nếu xóa không thành công
            return false;
        }
    };

    const handleDelete = async () => {
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
                        const deleted = await delJourney(journeyID);
                        if (deleted) {
                            // Nếu xóa thành công, chuyển về màn hình trước
                            navigation.goBack();
                        } else {
                            // Nếu xóa không thành công và lỗi là 403, hiển thị thông báo
                            setShowNotification(true);
                            setTimeout(() => {
                                setShowNotification(false);
                            }, 3000); // 3 giây
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const showBottomSheet=()=>{}

    const addComment = async (postID) => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).post(endpoints['add_comment'](postID), {
                "content": content
            })
            setContent('');
        } catch (error) {
            console.log(error)
        }
    }

    const loadComment = async (postID) => {
        try {
            let res = await API.get(endpoints['get_comment'](postID))
            console.log(res.data)
            setComment(res.data)
            setShowComment(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <View style={JourneyStyle.JourneyPostContainer}>
            {/* <TouchableOpacity style={JourneyStyle.addPostButton}>
                <Icon name="add" size={30} />
            </TouchableOpacity> */}
            <View>
                {showNotification && (
                    <MessageSuss
                        message="Bạn không phải chủ bài!"
                        color={errorMess}
                        tcolor={white}
                    />
                )}</View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={JourneyStyle.delIcon}>
                    <TouchableOpacity style={JourneyStyle.touIcon}>
                        <Icon name="circle-edit-outline" size={28} color={black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={JourneyStyle.touIcon}
                        onPress={handleDelete}>
                        <Icon name="delete-outline" size={28} color={'red'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={JourneyStyle.touIcon}
                    >
                        <Icon name="alert-octagon-outline" size={28} color={black} />
                    </TouchableOpacity>
                </View>
                <View style={JourneyStyle.listMember}>
                    <Text>dnah sacsh thanf htvien</Text>
                    <Text style={{ fontSize: txt22, fontWeight: 'bold', marginTop: 10 }}>Bài đăng</Text>
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
                                        <Text style={JourneyStyle.nameOwner}>{c.user.username}</Text>
                                    </View>
                                    <TouchableOpacity
                                    onPress={showBottomSheet}>
                                        <Icon name="dots-vertical" size={30}></Icon>
                                    </TouchableOpacity>
                                </View>
                                <View style={JourneyStyle.postContent}>
                                    <Text>{c.content}</Text>
                                </View>
                                <ScrollView horizontal>
                                    {c.images.map((image, index) => (
                                        <Image source={{ uri: image.Object }} style={JourneyStyle.postImage} key={index} />
                                    ))}
                                </ScrollView>
                                <View style={JourneyStyle.postFeeling}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name="cards-heart" color={heart} size={24} />
                                        <Text style={JourneyStyle.nameOwner}>50 Like</Text>
                                    </View>
                                    <Text> {c.id}</Text>
                                </View>
                                <View style={JourneyStyle.postInteract}>
                                    <View style={JourneyStyle.interactItem}>
                                        <Icon name="cards-heart-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Thích</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => loadComment(c.id)}
                                        style={JourneyStyle.interactItem}>
                                        <Icon name="comment-outline" size={26} />
                                        <Text style={JourneyStyle.nameOwner}>Bình luận</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={JourneyStyle.commentContainer}>
                                    <Avatar.Image source={{ uri: user.avatar }} size={30} />
                                    <TextInput
                                        value={content}
                                        onChangeText={t => setContent(t)}
                                        placeholder="Viết bình luận..."
                                        style={JourneyStyle.inputComment} />

                                    <TouchableOpacity onPress={() => addComment(c.id)}>
                                        <Icon name="send" size={28}></Icon>
                                    </TouchableOpacity>
                                </View>
                                {showComment && ( // Conditionally render comments if showComments is true
                                    comment === null ? (
                                        <ActivityIndicator color={black} size={'small'} />
                                    ) : (
                                        comment.map(c => (
                                            <View style={JourneyStyle.viewComment} key={c.id}>
                                                <Avatar.Image source={{ uri: c.avatar }} size={30} />
                                                <View style={JourneyStyle.contentComment}>
                                                    <Text style={{ fontWeight: 'bold' }}>{c.user.username}</Text>
                                                    <Text>{c.content}</Text>
                                                    {/* You might want to format the date */}
                                                    <Text style={{ fontWeight: '500' }}>{moment(c.created_date).fromNow()}</Text>
                                                </View>
                                            </View>
                                        ))
                                    )
                                )}

                            </View>
                        )
                        )

                    }</>}
            </ScrollView>
        </View>
    );
};

export default JourneyDetail;