import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, TextInput, Modal } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, borderUnder, mainColor, transparent, txt20 } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import HomeStyle from "../../styles/HomeStyle";
import ItemProfile from "../components/ItemProfile";

const CommentScreen = ({ route }) => {
    const { postID } = route.params;
    const [user, dispatch] = useContext(MyContext)

    const [comment, setComment] = useState([])
    const [content, setContent] = useState()

    const [openModel, setOpenModel] = useState(false);

    useEffect(() => {
        loadComment()
    }, [])

    const loadComment = async () => {
        try {
            const res = await API.get(endpoints['get_comment'](postID))
            const comment = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

            setComment(comment)
        } catch (error) {
            console.log(error)
        }
    }

    const addComment = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).post(endpoints['add_comment'](postID), {
                "content": content
            })
            ToastMess({ type: 'success', text1: 'Bình luận thành công' })

            setContent('');
            loadComment()
        } catch (error) {
            console.log(error)
        }
    }

    const renderModel = (commentID) => {
        return (
            <Modal visible={openModel} animationType="slide" transparent={true} >
                <View style={{ flex: 1, backgroundColor: transparent, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>

                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}></Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor="white"
                                color="red"
                                onPress={() => setOpenModel(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <ItemProfile label={'Xóa bình luận'}
                                rightIcon={'delete'}
                                onPress={() => handleDeleteComment(commentID)}
                                backgroundColor={borderUnder}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const handleDeleteComment = async (commentId) => {
        console.log(commentId)
        try {
            const token = await AsyncStorage.getItem("access-token");
            console.log(token)
            console.log(commentId)
            console.log(postID)
            await authApi(token).delete(endpoints['delete_comment_post'](postID, commentId))
            ToastMess({ type: 'success', text1: 'Xóa bình luận thành công' })
            setOpenModel(false)
            loadComment()

        } catch (error) {
            console.log(error)
            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })

        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {comment === null ? (
                    <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} />
                ) : comment && comment.length > 0 ? (
                    comment.map(c => (
                        <View style={JourneyStyle.viewComment} key={c.id}>
                            {renderModel(c.id)}
                            <Avatar.Image source={{ uri: c.user.avatar }} size={30} />
                            <View style={JourneyStyle.contentComment}>
                                <Text style={{ fontWeight: 'bold' }}>{c.user.username}</Text>
                                <Text>{c.content}</Text>
                                {/* You might want to format the date */}
                                <Text style={{ fontWeight: '500' }}>{moment(c.created_date).fromNow()}</Text>
                            </View>
                            {user.id === c.user.id && (

                                <TouchableOpacity onPress={() => setOpenModel(true)}>
                                    <Icon name='dots-vertical' size={24}></Icon>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={{ margin: 10, fontWeight: 'bold' }}>Hãy là người đầu tiên bình luận về nội dung này</Text>
                )}
            </ScrollView>

            <View style={JourneyStyle.commentContainer}>
                <Avatar.Image source={{ uri: user.avatar }} size={30} />
                <TextInput
                    value={content}
                    onChangeText={t => setContent(t)}
                    placeholder="Viết bình luận..."
                    style={JourneyStyle.inputComment} />

                <TouchableOpacity
                    onPress={() => {
                        if (content && content.trim() !== "") {
                            addComment(postID);
                        }
                    }}
                    disabled={!content || content.trim() === ""}
                >
                    <Icon name="send" size={28} style={{ color: content && content.trim() !== "" ? mainColor : black }} />
                </TouchableOpacity>
            </View>
        </View>

    )


}

export default CommentScreen