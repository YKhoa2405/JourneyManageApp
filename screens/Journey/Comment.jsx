import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import JourneyStyle from "./JourneyStyle";
import API, { authApi, endpoints } from "../../config/API";
import { black, mainColor } from "../../assets/color";

const CommentScreen = ({ route }) => {
    const { postID } = route.params;
    const [user, dispatch] = useContext(MyContext);

    const [comment, setComment] = useState([]);
    const [content, setContent] = useState("");
    const [replyingTo, setReplyingTo] = useState(null); // State để lưu id của comment đang phản hồi
    const inputRef = useRef(null);

    useEffect(() => {
        loadComment();
    }, []);

    const loadComment = async () => {
        try {
            const res = await API.get(endpoints["get_comment"](postID));
            const sortedComments = res.data.sort(
                (a, b) => new Date(b.created_date) - new Date(a.created_date)
            );
            setComment(sortedComments);
        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            let res = await authApi(token).post(endpoints["add_comment"](postID), {
                content: content,
            });
            ToastMess({ type: "success", text1: "Bình luận thành công" });
            setContent("");
            loadComment();
        } catch (error) {
            console.log(error);
        }
    };

    const replyCommentPost = async (commentID) => {
        inputRef.current.focus();
        setReplyingTo(commentID); // Đặt id của comment đang phản hồi vào state
    };

    const handleReplySubmit = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            await authApi(token).post(endpoints["reply_commment_post"](postID), {
                content: content,
                comment_id: replyingTo, // Sử dụng id của comment đang phản hồi
            });
            ToastMess({ type: "success", text1: "Phản hồi thành công" });
            setContent("");
            setReplyingTo(null); // Đặt lại state của replyingTo về null để không còn phản hồi nữa
            loadComment();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const token = await AsyncStorage.getItem("access-token");
            await authApi(token).delete(endpoints["delete_comment_post"](postID, commentId));
            ToastMess({ type: "success", text1: "Xóa bình luận thành công" });
            loadComment();
        } catch (error) {
            console.log(error);
            ToastMess({ type: "error", text1: "Có lỗi xảy ra, vui lòng thử lại" });
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {comment === null ? (
                    <ActivityIndicator color={black} size={"large"} style={HomeStyle.styleLoading} />
                ) : comment && comment.length > 0 ? (
                    comment.map((c) => (
                        <View style={JourneyStyle.viewComment} key={c.id}>
                            <Avatar.Image source={{ uri: c.user.avatar }} size={30} />
                            <View style={JourneyStyle.contentComment}>
                                <Text style={{ fontWeight: "bold" }}>{c.user.username}</Text>
                                <Text>{c.content}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                    <Text style={{ fontWeight: "500" }}>{moment(c.created_date).fromNow()}</Text>
                                    {user.id !== c.user.id ? (
                                        <TouchableOpacity onPress={() => replyCommentPost(c.id)}>
                                            <Text style={{ fontWeight: "600" }}>Phản hồi</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => handleDeleteComment(c.id)}>
                                            <Text style={{ fontWeight: "600" }}>Xóa bình luận</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                {c.replies.map((reply) => (
                                    <View key={reply.id} style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Avatar.Image source={{ uri: reply.user.avatar }} size={30} />
                                        <View style={{ marginLeft: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                            <View>
                                                <Text style={{ fontWeight: "bold" }}>{reply.user.username}</Text>
                                                <Text>{reply.content}</Text>
                                                <Text style={{ fontWeight: "500" }}>{moment(reply.created_date).fromNow()}</Text>
                                            </View>
                                            <View>
                                                {user.id !== reply.user.id ? (
                                                    null
                                                ) : (
                                                    <TouchableOpacity onPress={() => handleDeleteComment(c.id)}>
                                                        <Text style={{ fontWeight: "600" }}>Xóa bình luận</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ margin: 10, fontWeight: "bold" }}>Hãy là người đầu tiên bình luận về nội dung này</Text>
                )}
            </ScrollView>

            <View style={JourneyStyle.commentContainer}>
                <Avatar.Image source={{ uri: user.avatar }} size={30} />
                <TextInput
                    value={content}
                    onChangeText={(text) => setContent(text)}
                    placeholder="Viết bình luận..."
                    style={JourneyStyle.inputComment}
                    ref={inputRef}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (content && content.trim() !== "") {
                            if (replyingTo) {
                                handleReplySubmit(); // Nếu đang phản hồi, gọi hàm xử lý phản hồi
                            } else {
                                addComment(postID); // Ngược lại, gọi hàm thêm bình luận
                            }
                        }
                    }}
                    disabled={!content || content.trim() === ""}
                >
                    <Icon
                        name="send"
                        size={28}
                        style={{ color: content && content.trim() !== "" ? mainColor : black }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CommentScreen;
