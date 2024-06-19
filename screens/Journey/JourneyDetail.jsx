import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, Text, Image, ActivityIndicator, Alert, FlatList, TouchableWithoutFeedback, Modal, SafeAreaView, RefreshControl } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import API, { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";
import { black, mainColor, textWeight, transparent, txt20, white } from "../../assets/color";
import moment from "moment";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import { useFocusEffect } from "@react-navigation/native";
import HomeStyle from "../../styles/HomeStyle";
import ButtonMain from "../components/ButtonMain";
import { AirbnbRating } from "react-native-ratings";



const JourneyDetail = ({ route, navigation }) => {
    const [user, dispatch] = useContext(MyContext)
    const { journeyID, userID } = route.params;
    const isOwner = user.id === userID;

    const [post, setPost] = useState([])
    const [member, setMember] = useState([])
    const [journeyDetailData, setJourneyDetailData] = useState(null)
    const [likedState, setLikedState] = useState({});
    const [openModel, setOpenModel] = useState(false);
    const [openModelDots, setOpenModelDots] = useState(false);
    const [openModelRating, setOpenModelRating] = useState(false);
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [vnpayURL, setVnpayURL] = useState()


    const dataFromScreen1 = { journeyDetailData: journeyDetailData };
    moment.locale('vi');

    const loadData = useCallback(async () => {
        setIsLoading(true);
        await loadPost();
        await loadMember();
        await loadJourneyDetail();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const handleRating = async () => {
        console.log(rating)
        try {
            let token = await AsyncStorage.getItem('access-token');
            await authApi(token).post(endpoints['rating_journey'](journeyID), {
                rating: rating
            })
            ToastMess({ type: 'success', text1: 'Đánh giá thành công' })
            setOpenModelDots(false)
            setOpenModelRating(false)
        } catch (error) {
            console.log(error)
            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
            setOpenModelRating(false)
            setOpenModelDots(false)
        }
    }

    const renderModelRating = () => {
        return (
            <Modal visible={openModelRating} animationType="slide" transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: transparent,
                    alignItems: "center",
                    justifyContent: 'center'
                }}>
                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Đánh giá hành trình</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor='white'
                                color="red"
                                onPress={() => setOpenModelRating(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <AirbnbRating count={5}
                                reviews={['Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời']}
                                selectedColor="gold"
                                reviewColor="gold"
                                size={40}
                                reviewSize={22}
                                defaultRating={0}
                                ratingContainerStyle={JourneyStyle.ratingStyle}
                                onFinishRating={(rating) => setRating(rating)} />

                            <ButtonMain title={'Đánh giá hành trình'} onPress={() => handleRating()} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const renderModel = () => {
        return (
            <Modal visible={openModel} animationType="slide" transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: transparent,
                    alignItems: "center",
                    justifyContent: 'flex-end', paddingBottom: 20
                }}>
                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Quản lý hành trình</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor='white'
                                color="red"
                                onPress={() => setOpenModel(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            {journeyDetailData?.active === true && <ButtonMain title={'Hoàn thành hành trình'} onPress={() => handleLockJourney()} />}
                            {journeyDetailData?.active === true && <ButtonMain title={'Khóa bình luận'} onPress={() => handleLockComment()} />}

                            <ButtonMain title={'Chỉnh sửa hành trình'} onPress={() => handleEditJourney()} />
                            <ButtonMain title={'Xóa hành trình'} onPress={() => handleDeleteJourney()} />
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const renderModelDots = () => {
        return (
            <Modal visible={openModelDots} animationType="slide" transparent={true} >
                <View style={{
                    flex: 1,
                    backgroundColor: transparent,
                    alignItems: "center",
                    justifyContent: 'flex-end', paddingBottom: 20
                }}>
                    <View style={JourneyStyle.styleModel}>
                        <View style={JourneyStyle.headerModel}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: txt20
                            }}>Đánh giá và ủng hộ</Text>
                            <Icon.Button
                                size={24}
                                name="close"
                                backgroundColor='white'
                                color="red"
                                onPress={() => setOpenModelDots(false)} />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <ButtonMain title={'Đánh giá hành trình'} onPress={() => setOpenModelRating(true)} />
                            <ButtonMain title={'Ủng hộ chủ hành trình (VNPay)'} onPress={() => goToVNpay()} />

                        </View>
                    </View>
                </View>
            </Modal>
        )
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
                            setOpenModel(false)

                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const handleEditJourney = () => {
        navigation.navigate('EditJourney', { dataFromScreen1 })
    }

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
            console.log(post)
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
                            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
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

    const goToVNpay = async () => {
        try {
            let token = await AsyncStorage.getItem('access-token');
            let res = await authApi(token).post(endpoints['vnpay_post'], {
                "amount": 50000
            });
            navigation.navigate('VNPayScreen', { user_create: journeyDetailData.user_create, url: res.data.payment_url });
        } catch (error) {
            console.log(error);
        }
        setOpenModelDots(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                {renderModel()}
                {renderModelDots()}
                {renderModelRating()}
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
                            {!isOwner && journeyDetailData?.active === false || isOwner ? (
                                <TouchableOpacity
                                    style={[JourneyStyle.floadTingButton, { right: 20 }]}
                                    onPress={() => isOwner ? setOpenModel(true) : setOpenModelDots(true)}
                                >
                                    <Icon name={'dots-vertical'} size={24} color={white} />
                                </TouchableOpacity>
                            ) : null}
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 200 }}>
                                <Text style={JourneyStyle.headerText}>
                                    {journeyDetailData?.name_journey}
                                </Text>
                                <Text style={JourneyStyle.headerText}>
                                    {journeyDetailData?.departure_time}
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

                    {post === null ? (
                        <ActivityIndicator color={black} size={'large'} style={HomeStyle.styleLoading} />
                    ) : (
                        <>
                            {post.length === 0 ? (
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={JourneyStyle.emptyList}>Hãy chia sẻ khoảng khắc đầu tiên của bạn</Text>
                                </View>
                            ) : (
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
                                                <Image source={{ uri: item.image }} style={c.images.length === 1 ? JourneyStyle.singleImagePost : JourneyStyle.imagePost} />
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
                                                onPress={() => navigation.navigate('CommentScreen', { postID: c.id })}
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
                                ))
                            )}
                        </>
                    )}

                </ScrollView>
            )}

            <View style={JourneyStyle.floadTingContainer}>
                {journeyDetailData?.active === false ? (
                    <View style={JourneyStyle.floadTingEnd}>
                        <Text style={{ fontWeight: textWeight, color: white }}>Hành trình đã kết thúc</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={JourneyStyle.floadTingAddPost}
                        onPress={() => navigation.navigate('AddPost', { journeyID, userID })}
                    >
                        <Icon name="plus" size={24} color={white} />
                    </TouchableOpacity>
                )}
            </View>
        </View >
    );
};


export default JourneyDetail;
