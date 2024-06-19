import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black, white } from "../../assets/color";
import JourneyStyle from "./JourneyStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../config/API";
import { Avatar } from "react-native-paper";

const MapMember = ({ route, navigation }) => {
    
    const [post, setPost] = useState([]);
    const { journeyID } = route.params;

    useEffect(() => {
        loadPost();
    }, [journeyID]);

    const loadPost = async () => {
        try {
            const token = await AsyncStorage.getItem('access-token');
            const res = await authApi(token).get(endpoints['post'](journeyID));
            const postData = res.data;
            setPost(postData);
            console.log(postData); // Kiểm tra dữ liệu đã được lấy từ API thành công hay chưa
        } catch (error) {
            console.log(error);
        }
    };

    const calculateInitialRegion = (markers) => {
        if (markers.length === 0) {
            return {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 100,
                longitudeDelta: 100,
            };
        }

        const latitudes = markers.map(marker => marker.latitude);
        const longitudes = markers.map(marker => marker.longitude);

        const averageLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
        const averageLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

        return {
            latitude: averageLatitude,
            longitude: averageLongitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.02,
        };
    };


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={[JourneyStyle.floadTingButton, { left: 20 }]} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={white} />
            </TouchableOpacity>
            <View style={styles.containerMap}>
                {post.length === 0 ? (
                    <View style={styles.noDataText}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Không có dữ liệu vị trí thành viên.</Text>
                    </View>
                ) : (
                    <MapView style={styles.map} initialRegion={calculateInitialRegion(post)}>
                        {post.map((item) => (
                            <Marker
                                key={item.id}
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }}
                                title={item.visit_point}
                            >
                                <Avatar.Image size={32} source={{ uri: item.user.avatar }} />
                            </Marker>
                        ))}
                    </MapView>
                )}
            </View>
        </View>
    );
};

export default MapMember;

const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    noDataText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
