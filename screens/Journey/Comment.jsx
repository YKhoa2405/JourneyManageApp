import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, TextInput } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, mainColor } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import Toast from "react-native-toast-message";

const CommentScreen = ({ route }) => {
    const { postID } = route.params;
    const [user, dispatch] = useContext(MyContext)

    const [comment, setComment] = useState([])
    const [content, setContent] = useState()

    useEffect(() => {
        loadComment()
    }, [])

    const loadComment = async () => {
        try {
            let res = await API.get(endpoints['get_comment'](postID))
            setComment(res.data)
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
            setTimeout(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Bình luận thành công',
                });
            }, 4000);
            setContent('');
            loadComment()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {comment === null ? (
                    <ActivityIndicator />
                ) : comment && comment.length > 0 ? (
                    comment.map(c => (
                        <View style={JourneyStyle.viewComment} key={c.id}>
                            <Avatar.Image source={{ uri: c.user.avatar }} size={30} />
                            <View style={JourneyStyle.contentComment}>
                                <Text style={{ fontWeight: 'bold' }}>{c.user.username}</Text>
                                <Text>{c.content}</Text>
                                {/* You might want to format the date */}
                                <Text style={{ fontWeight: '500' }}>{moment(c.created_date).fromNow()}</Text>
                            </View>
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