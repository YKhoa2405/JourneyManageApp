import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, TextInput, Alert, TouchableWithoutFeedback, Modal } from "react-native";
import JourneyStyle from "../Journey/JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, borderUnder, mainColor, transparent, txt20 } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import UIHeader from "../components/UIHeader";
import { firestore } from "../../config/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import HomeStyle from "../../styles/HomeStyle";

const CommentJourneyScreen = ({ route, navigation }) => {
    const { journeyID, user_create } = route.params;

    const [user, dispatch] = useContext(MyContext)
    const isOwner = user.id === user_create;
    const [comment, setComment] = useState([])
    const [content, setContent] = useState()
    const [isLock, setIsLock] = useState('')
    const [isMember, setMember] = useState({});
    const inputRef = useRef(null);
    const timestamp = new Date();

    useEffect(() => {
        loadComment();
        loadJourneyLock()
    }, [])

    const loadJourneyLock = async () => {
        const res = await API.get(endpoints['edit_journey'](journeyID))
        setIsLock(res.data.lock_cmt)
    }

    const handleCheckComment = async (commentId, userID) => {
        Alert.alert(
            'Duyệt thành viên?',
            'Bạn có chắc muốn duyệt nguời này tham gia hành trình!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Duyệt',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("access-token");
                            console.log(token)
                            console.log(commentId)
                            const res = await authApi(token).post(endpoints['approve_comment'](journeyID), {
                                'comment_id': commentId
                            })

                            setMember(prevLikedState => ({ ...prevLikedState, [commentId]: true }));
                            // Cập nhật bài đăng được thích trong state posts
                            setComment(comment => comment.map(comment => {
                                if (comment.id === commentId) {
                                    return { ...comment, is_member: true };
                                }
                                return comment;
                            }));
                            ToastMess({ type: 'success', text1: 'Thêm thành viên thành công' })
                            loadComment()

                            try {
                                // Thêm thông báo vào collection "notifications" với trường userID là ID của người nhận
                                const notifiCollectionRef = collection(firestore, "notifications");
                                await addDoc(notifiCollectionRef, {
                                    timestamp: timestamp,
                                    userID: userID, // ID của người nhận
                                    user: user, // Thông tin về người thực hiện hành động
                                    message: `${user.username} đã duyệt bạn vào hành trình của họ`,
                                    status: "unread",
                                    journeyID: journeyID,
                                    notifityle: "journey"
                                });

                                console.log("Thông báo đã được gửi thành công.");
                            } catch (error) {
                                console.log("Lỗi khi gửi thông báo:", error);
                            }
                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra!!' })
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const loadComment = async () => {
        try {
            const res = await API.get(endpoints['get_comment_journey'](journeyID))
            const comment = res.data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

            setComment(comment)
            console.log(res.data)
            console.log(comment.replies)
            const newIsMember = {}
            comment.forEach(comment => {
                if (comment.is_member) {
                    newIsMember[comment.id] = true
                }
            });
            setMember(newIsMember)

        } catch (error) {
            console.log(error)
        }
    }


    const addComment = async () => {
        try {
            let token = await AsyncStorage.getItem("access-token");
            await authApi(token).post(endpoints['add_comment_journey'](journeyID), {
                "content": content
            })
            ToastMess({ type: 'success', text1: 'Bình luận thành công' })
            setContent('');
            loadComment()
            console.log(user_create)

            if (user_create !== user.id) {
                // Thêm thông báo vào collection "notifications" với trường userID là ID của người nhận
                const notifiCollectionRef = collection(firestore, "notifications");
                await addDoc(notifiCollectionRef, {
                    timestamp: timestamp,
                    userID: user_create, // ID của người nhận
                    user: user, // Thông tin về người thực hiện hành động
                    message: `${user.username} đã bình luận vào hành trình của bạn`,
                    status: "unread",
                    journeyID: journeyID,
                    notifityle: "comment"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        Alert.alert(
            'Xóa bình luận?',
            'Bạn có chắc muốn xóa bình luận này!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Xóa',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem("access-token");
                            console.log(token)
                            await authApi(token).delete(endpoints['delete_comment_journey'](journeyID, commentId))
                            ToastMess({ type: 'success', text1: 'Xóa bình luận thành công' })
                            loadComment()

                        } catch (error) {
                            console.log(error)
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })

                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }

    const handleReplyComment = async (commentID) => {
        // Focus vào input
        inputRef.current.focus();
        
        try {
            let token = await AsyncStorage.getItem("access-token");

            const response = await authApi(token).post(endpoints['reply_comment'](journeyID), {
                "content": content,
                "comment_id": commentID
            });

            ToastMess({ type: 'success', text1: 'Bình luận thành công' });
            setContent('');
            loadComment();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <UIHeader
                title={'Bình luận hành trình'}
                leftIcon={'arrow-left'}
                handleLeftIcon={() => navigation.goBack()} />
            <ScrollView>
                {comment === null ? (
                    <ActivityIndicator size={'large'} color={black} style={HomeStyle.styleLoading} />
                ) : comment && comment.length > 0 ? (
                    comment.map(c => (
                        <View style={JourneyStyle.viewComment} key={c.id}>
                            <Avatar.Image source={{ uri: c.user.avatar }} size={30} />
                            <View style={JourneyStyle.contentComment}>
                                <Text style={{ fontWeight: 'bold' }}>{c.user.username}</Text>
                                <Text>{c.content}</Text>
                                {comment.replies && (

                                    <View style={JourneyStyle.viewCommentRep}>
                                        {comment.replies.map(c => {
                                            <Avatar.Image source={{ uri: c.user.avatar }} size={30} />
                                        })}
                                    </View>
                                )}
                                {/* You might want to format the date */}
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <Text style={{ fontWeight: '500' }}>{moment(c.created_date).fromNow()}</Text>
                                    {user.id !== c.user.id ? (
                                        // <TouchableOpacity onPress={() => handleReplyComment(c.id)}>
                                        //     <Text style={{ fontWeight: '600' }}>Phản hồi</Text>
                                        // </TouchableOpacity>
                                        null
                                    ) : (
                                        <TouchableOpacity onPress={() => handleDeleteComment(c.id)}>
                                            <Text style={{ fontWeight: '600' }}>Xóa bình luận</Text>
                                        </TouchableOpacity>)}
                                </View>
                            </View>
                            {isOwner && c.user.id !== user_create && (
                                <TouchableWithoutFeedback onPress={() => handleCheckComment(c.id, c.user.id)}>
                                    {isMember[c.id] ? (
                                        <Icon name="check-decagram" size={24} color={mainColor} />
                                    ) : (
                                        <Icon name="check-decagram" size={24} color={black} />
                                    )}
                                </TouchableWithoutFeedback>
                            )}


                        </View>
                    ))
                ) : (
                    <Text style={{ margin: 10, fontWeight: 'bold' }}>Hãy là người đầu tiên bình luận về nội dung này</Text>
                )}
            </ScrollView>

            <View style={JourneyStyle.commentContainer}>
                {isLock ? <>
                    <Text style={{ fontWeight: 'bold' }}>Chủ sở hữu đã khóa bình luận</Text>
                </> : <>
                    <Avatar.Image source={{ uri: user.avatar }} size={30} />
                    <TextInput
                        value={content}
                        onChangeText={t => setContent(t)}
                        placeholder="Viết bình luận..."
                        style={JourneyStyle.inputComment}
                        ref={inputRef} />

                    <TouchableOpacity
                        onPress={() => {
                            if (content && content.trim() !== "") {
                                addComment()
                            }
                        }}
                        disabled={!content || content.trim() === ""}
                    >
                        <Icon name="send" size={28} style={{ color: content && content.trim() !== "" ? mainColor : black }} />
                    </TouchableOpacity>
                </>}

            </View>
        </View>

    )


}

export default CommentJourneyScreen