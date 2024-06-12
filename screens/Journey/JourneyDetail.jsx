import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput, FlatList, Dimensions, TouchableWithoutFeedback, Modal, SafeAreaView } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, borderUnder, mainColor, textWeight, transparent, txt20, white } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import UIHeader from "../components/UIHeader";
import { useFocusEffect } from "@react-navigation/native";
import HomeStyle from "../../styles/HomeStyle";
import ButtonMain from "../components/ButtonMain";
import { AirbnbRating } from "react-native-ratings";


const JourneyDetail = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width

    const [user, dispatch] = useContext(MyContext)
    const { journeyID, userID } = route.params;
    const isOwner = user.id === userID;

    const [post, setPost] = useState([])
    const [member, setMember] = useState([])
    const [journeyDetailData, setJourneyDetailData] = useState(null)
    const [likedState, setLikedState] = useState({});
    const [openModel, setOpenModel] = useState(false);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true)

    moment.locale('vi');


    useEffect(() => {
        loadPost();
        handleLike();
        loadMember();
        loadJourneyDetail().then(() => setIsLoading(false))
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadPost()
        }, [])
    );

    const renderModel = () => {
        return (
            <Modal visible={openModel} animationType="slide" transparent={true} >
                <View style={{ flex: 1, backgroundColor: transparent, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>

                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Quản lý hành trình</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor="white"
                                color="red"
                                onPress={() => setOpenModel(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {isOwner ? <>

                                <ButtonMain title={'Hoàn thành hành trình'} onPress={() => handleLockJourney()} />
                                <ButtonMain title={'Khóa bình luận'} onPress={() => handleLockComment()} />
                                <ButtonMain title={'Xóa hành trình'} onPress={() => handleDeleteJourney()} />
                            </> : <>
                                <AirbnbRating count={5}
                                    reviews={['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']}
                                    selectedColor="gold"
                                    reviewColor="gold"
                                    size={40}
                                    reviewSize={22}
                                    defaultRating={5}
                                    ratingContainerStyle={JourneyStyle.ratingStyle}
                                    onFinishRating={(rating) => setRating(rating)} />


                                <ButtonMain title={'Đánh giá hành trình'} onPress={() => handleRating()} />
                            </>}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const handleRating = () => {
        console.log(rating)
    }

    const goToProfileUser = (id) => {
        if (id == user.id) {
            navigation.navigate("Profile");
        } else {
            navigation.navigate("ProfileUserScreen", {
                userId: id
            });
        }
    };

    const loadMember = async () => {
        try {
            const res = await API.get(endpoints['member_journey'](journeyID))
            setMember(res.data)
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
                            ToastMess({ type: 'success', text1: 'Xóa hành trình thành công' })
                            setOpenModel(false)


                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra!!' })

                        }
                    },
                },
            ],
            { cancelable: true }
        );
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
                            ToastMess({ type: 'success', text1: 'Xóa thành công' })

                            loadPost()
                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra!!' })
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleLockComment = async () => {
        Alert.alert(
            'Khóa bình luận?',
            'Không ai có thể bình luận vào hành trình của bạn!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Khóa',
                    onPress: async () => {
                        try {
                            let token = await AsyncStorage.getItem('access-token');
                            await authApi(token).patch(endpoints['lock_comment'](journeyID));
                            ToastMess({ type: 'success', text1: 'Khóa bình luận thành công' })
                            loadPost()
                            setOpenModel(false)
                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra!!' })
                            setOpenModel(false)
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleLike = async (postID) => {
        try {
            const token = await AsyncStorage.getItem("access-token")
            const res = await authApi(token).post(endpoints['like_post'](postID))

            setLikedState(prevLikedState => ({ ...prevLikedState, [postID]: true }));
            // Cập nhật bài đăng được thích trong state posts
            setPost(prevPosts => prevPosts.map(post => {
                if (post.id === postID) {
                    return { ...post, liked: true };
                }
                return post;
            }));
            loadPost();

        } catch (error) {
            console.log(error)

        }
    }

    //api load post
    const loadPost = async () => {
        try {
            const token = await AsyncStorage.getItem('access-token');
            const res = await authApi(token).get(endpoints['post'](journeyID))
            const post = res.data
            setPost(post)
            const newLikeState = {}
            post.forEach(post => {
                if (post.liked) {
                    newLikeState[post.id] = true
                }
            });
            setLikedState(newLikeState)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLockJourney = async () => {
        Alert.alert(
            'Bạn đã hoàn thành hành trình?',
            'Chọn đồng ý nếu bạn đã hoàn thành ',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        // Gọi hàm delJourney khi người dùng xác nhận muốn xóau
                        try {
                            let token = await AsyncStorage.getItem('access-token');
                            await authApi(token).patch(endpoints['complete_journey'](journeyID));
                            ToastMess({ type: 'success', text1: 'Chúc mừng bạn đã hoàn thành hành trình' })
                            setOpenModel(false)

                        } catch (error) {
                            ToastMess({ type: 'error', text1: 'Hành trình đã hoàn thành!!' })
                            setOpenModel(false)
                            console.log(error)

                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const loadJourneyDetail = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            const res = await authApi(token).get(endpoints['detail_journey'](journeyID));
            setJourneyDetailData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <View style={{ flex: 1 }}>
            <SafeAreaView>
                {renderModel()}
            </SafeAreaView>
            {isLoading ? ( // Sử dụng isLoading để kiểm soát việc hiển thị loading
                <ActivityIndicator size="large" color={black} style={HomeStyle.styleLoading} /> // Hiển thị loading nếu isLoading là true
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1 }}>
                        <Image source={{ uri: journeyDetailData?.background }} style={JourneyStyle.headerImage} />
                        <View style={JourneyStyle.headerContainer}>
                            <TouchableOpacity style={[JourneyStyle.floadTingButton, { left: 20 }]} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" size={24} color={white} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[JourneyStyle.floadTingButton, { right: 20 }]} onPress={() => setOpenModel(true)}>
                                <Icon name={isOwner ? 'dots-vertical' : 'star'} size={24} color={white} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
                                <Text style={JourneyStyle.headerText}>
                                    {journeyDetailData?.name_journey}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={JourneyStyle.listMember} onPress={() => navigation.navigate('ListMember', { journeyID: journeyID })}>
                        <Text style={JourneyStyle.titleMember}>Thành viên</Text>
                        <View style={JourneyStyle.contentMember}>
                            {member === null ? (
                                <ActivityIndicator color={black} size="large" style={HomeStyle.styleLoading} />
                            ) : (
                                <>
                                    {member.map((member) => (
                                        <View key={member.id}>
                                            <Avatar.Image source={{ uri: member.avatar }} size={30} style={JourneyStyle.imageMember} />
                                            {member.ownerJourney && <Icon name="check-decagram" size={22} color={mainColor} style={JourneyStyle.ownerJourney} />}
                                        </View>
                                    ))}
                                </>
                            )}
                        </View>
                    </TouchableOpacity>

                    {post === null ? <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} /> : <>
                        {
                            post.map(c => (

                                <View style={JourneyStyle.containerPost} key={c.id}>
                                    <View style={JourneyStyle.postHeader}>
                                        <TouchableOpacity onPress={() => goToProfileUser(c.user.id)}>
                                            <Avatar.Image size={36} source={{ uri: c.user.avatar }} style={{ marginTop: 3 }} />
                                        </TouchableOpacity>

                                        <View style={{ flex: 1 }}>
                                            <Text style={JourneyStyle.nameOwner}>{c.user.username} - tại {c.visit_point} </Text>
                                            <Text style={{ marginHorizontal: 5, opacity: 0.7, fontSize: 12 }}>{moment(c.created_date).fromNow()}.</Text>
                                        </View>

                                        {user.id === c.user.id && (
                                            <TouchableOpacity onPress={() => handleDeletePost(c.id)}>
                                                <Icon name="close" size={24} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                    <View style={JourneyStyle.postContent}>
                                        <Text>{c.content}</Text>
                                    </View>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={c.images}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <Image source={{ uri: item.image }} style={JourneyStyle.imagePost} />
                                        )}
                                    />
                                    <View style={JourneyStyle.postFeeling}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableWithoutFeedback onPress={() => handleLike(c.id)} style={JourneyStyle.interactItem}>
                                                {likedState[c.id] ? (<Icon name="heart" size={24} color={'red'} />) : (<Icon name="cards-heart-outline" size={24} color={black} />)}
                                            </TouchableWithoutFeedback>
                                            <Text style={HomeStyle.text}>{c.likes_count} lượt thích</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('CommentScreen', { postID: c.id })
                                            }
                                            style={JourneyStyle.interactItem}>
                                            <Icon name="comment-outline" size={24} />
                                            <Text style={HomeStyle.text}>{c.comments_count} bình luận</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {user.id === c.user.id && (
                                        <View style={JourneyStyle.postInteract}>

                                            <TouchableOpacity style={JourneyStyle.interactItem} onPress={() => navigation.navigate('EditPost', { postID: c.id, post: c })}>
                                                <Icon name="circle-edit-outline" size={24} />
                                                <Text style={{ fontSize: 14, marginLeft: 8 }}>Chỉnh sửa</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}

                                </View>
                            )
                            )

                        }</>}
                </ScrollView>
            )}

            <View style={JourneyStyle.floadTingContainer}>
                {journeyDetailData?.active === true ? (
                    <TouchableOpacity
                        style={JourneyStyle.floadTingAddPost}
                        onPress={() => navigation.navigate('AddPost', { journeyID, userID })}
                    >
                        <Icon name="plus" size={24} color={white} />
                    </TouchableOpacity>
                ) : (
                    <View style={JourneyStyle.floadTingEnd}>
                        <Text style={{ fontWeight: textWeight, color: white }}>Hành trình đã kết thúc</Text>
                    </View>
                )}
            </View>
        </View >
    );
};


export default JourneyDetail;
