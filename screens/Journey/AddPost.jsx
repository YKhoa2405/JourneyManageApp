import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput, FlatList, StyleSheet, Dimensions, PermissionsAndroid } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Chip } from "react-native-paper";
import { black, borderUnder, errorMess, heart, mainColor, successMess, textWeight, txt16, txt18, txt20, txt22, white } from "../../assets/color";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import { authApi, endpoints } from "../../config/API";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { firestore } from "../../config/FirebaseConfig";
import * as Location from 'expo-location';
import JourneyStyle from "./JourneyStyle";
import { GOOGLE_API_KEY } from "../../config/GOOGLE_API_KEY";



const AddPost = ({ route, navigation }) => {
    const { journeyID, userID } = route.params;
    const [user, dispatch] = useContext(MyContext)
    const [loading, setLoading] = useState(false)

    const [contentPost, setContentPost] = useState('')
    const [imageVisit, setImageVisit] = useState([])
    const [visitPoint, setVisitPoint] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    console.log(latitude, longitude)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                navigation.goBack()
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});

            const { latitude, longitude } = currentLocation.coords;
            setLatitude(latitude)
            setLongitude(longitude)
            const response = await fetch(
                `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${GOOGLE_API_KEY}`
            );
            const data = await response.json();
            console.log(data)
            if (data.resourceSets && data.resourceSets.length > 0 && data.resourceSets[0].resources.length > 0) {
                setVisitPoint(data.resourceSets[0].resources[0].address.formattedAddress);
            } else {
                setVisitPoint("Không định vị được ")
            }
        })();
    }, []);

    const selectImages = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            allowsMultipleSelection: true
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map(asset => asset.uri);
            setImageVisit(prevImages => [...prevImages, ...selectedImages]);
        }
        console.log(imageVisit);
    };


    const addToPost = async () => {
        setLoading(true)
        let formPost = new FormData()
        formPost.append('journey', journeyID)
        formPost.append('content', contentPost)
        formPost.append('visit_point', visitPoint)
        formPost.append('latitude', latitude)
        formPost.append('longitude', longitude)
        if (imageVisit && imageVisit.length > 0) {
            imageVisit.forEach((imageUri, index) => {
                formPost.append('images', {
                    uri: imageUri,
                    name: `image_${index}.jpg`,
                    type: 'image/jpeg'
                });
            })
        }

        try {
            let token = await AsyncStorage.getItem('access-token');
            await authApi(token).post(endpoints['add_post'], formPost, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            ToastMess({ type: 'success', text1: 'Đăng bài viết thành công' })
            navigation.goBack()

            const timestamp = new Date();

            try {
                // Thêm thông báo vào collection "notifications" với trường userID là ID của người nhận
                const notifiCollectionRef = collection(firestore, "notifications");
                await addDoc(notifiCollectionRef, {
                    timestamp: timestamp,
                    userID: userID, // ID của người nhận
                    user: user, // Thông tin về người thực hiện hành động
                    message: `${user.first_name} đã đăng một bài viết trong hành trình của bạn`,
                    status: "unread",
                    journeyID: journeyID,
                    notifityle: "journey"
                });

                console.log("Thông báo đã được gửi thành công.");
            } catch (error) {
                console.log("Lỗi khi gửi thông báo:", error);
            }

        } catch (error) {
            console.log(error)
            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={postStyles.container}>
            <View style={postStyles.header}>
                <View style={postStyles.headerAvatar}>
                    <Avatar.Image source={{ uri: user.avatar }} size={40} />
                    <Text style={{ fontSize: txt18, fontWeight: 'bold', marginLeft: 10 }}>{user.username}</Text>
                </View>
                <View>
                    {loading ? (<ActivityIndicator size="large" color={black} />) :
                        (<TouchableOpacity style={postStyles.buttonPost}
                            onPress={addToPost}>
                            <Text style={{ fontWeight: textWeight, fontSize: txt18, color: white }}>Đăng</Text>
                        </TouchableOpacity>)}
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <Icon name="map-marker" size={16}></Icon>
                    <Text style={{ marginLeft: 2, opacity: 0.7, fontSize: 16, paddingHorizontal: 10 }}>{visitPoint}</Text>
                </View>
                <TextInput
                    placeholder="Bạn đang nghĩ gì..."
                    style={[postStyles.content, { flex: 1 }]} multiline={true}
                    value={contentPost}
                    onChangeText={t => setContentPost(t)} />


                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={imageVisit}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={imageVisit.length === 1 ? JourneyStyle.singleImagePost : JourneyStyle.imagePost} />
                    )}
                />

                <TouchableOpacity
                    style={postStyles.uploadPic}
                    onPress={selectImages}>
                    <Icon name="file-image-outline" color={mainColor} size={28} />
                    <Text style={{ marginLeft: 10 }}>Tải hình ảnh của bạn</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AddPost

const postStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        borderTopWidth: 1,
        borderColor: borderUnder,
        paddingTop: 10

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonPost: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: mainColor,
        elevation: 4,
        borderRadius: 10
    },
    content: {
        fontSize: txt20,
        margin: 10,
        flex: 1
    },
    geolocationContainer: {
        backgroundColor: white,
    },
    uploadPic: {
        paddingVertical: 15,
        paddingLeft: 10,
        borderColor: borderUnder,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    }
})