import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, ActivityIndicator, Alert, Button, TextInput, FlatList, StyleSheet, Dimensions, PermissionsAndroid } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, Chip } from "react-native-paper";
import { black, borderUnder, errorMess, heart, mainColor, successMess, txt16, txt18, txt20, txt22, white } from "../../assets/color";
import 'moment/locale/vi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../config/MyContext";
import { ToastMess } from "../components/ToastMess";
import { authApi, endpoints } from "../../config/API";
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import JourneyStyle from "./JourneyStyle";


const EditPost = ({ route, navigation }) => {

    const { postID, post } = route.params;
    console.log(post)
    const [user, dispatch] = useContext(MyContext)
    const [loading, setLoading] = useState(false)
    console.log(post.images)

    const [contentPost, setContentPost] = useState(post.content)
    const [imageVisit, setImageVisit] = useState(post.images.map(image => image.image))
    const [visitPoint, setVisitPoint] = useState(post.visit_point)

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
    };

    const handleDeleteImage = (index) => {
        setImageVisit(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleEditPost = async () => {
        setLoading(true)
        let formPost = new FormData()
        formPost.append('content', contentPost)
        formPost.append('visit_point', visitPoint)
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
            await authApi(token).patch(endpoints['edit_post'](postID), formPost, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            ToastMess({ type: 'success', text1: 'Cập nhật bài viết thành công' })
            navigation.goBack()

        } catch (error) {
            console.log(error)
            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerAvatar}>
                    <Avatar.Image source={{ uri: user.avatar }} size={40} />
                    <Text style={{ fontSize: txt18, fontWeight: 'bold', marginLeft: 10 }}>{user.username}</Text>
                </View>
                <View>
                    {loading ? (<ActivityIndicator size="large" color={black} />) :
                        (<TouchableOpacity style={styles.buttonPost}
                            onPress={() => handleEditPost()}>
                            <Text style={{ fontWeight: '500', fontSize: txt18, color: white }}>Cập nhật</Text>
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
                    style={[styles.content, { flex: 1 }]} multiline={true}
                    value={contentPost}
                    onChangeText={t => setContentPost(t)} />

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={imageVisit}
                    keyExtractor={(item, index) => (item && item.id) ? item.id.toString() : index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={imageVisit.length === 1 ? JourneyStyle.singleImagePost : JourneyStyle.imagePost} />
                    )}
                />

                <TouchableOpacity
                    style={styles.uploadPic}
                    onPress={selectImages}>
                    <Icon name="file-image-outline" color={mainColor} size={28} />
                    <Text style={{ marginLeft: 10 }}>Tải hình ảnh của bạn</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditPost

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
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
    deleteButton: {
        top: 10,

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
