import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black, borderUnder, mainColor, white } from "../../assets/color";
import { Avatar } from "react-native-paper";
import JourneyStyle from "./JourneyStyle";


const MapMember = ({ navigation }) => {
    const [listVisit, setListVisit] = useState([
        { id: 1, avatar: 'https://res.cloudinary.com/dsbebvfff/image/upload/v1716023980/31191_p73jq8.jpg', longitude: 106.6297, latitude: 10.8231 },
        { id: 2, avatar: 'https://res.cloudinary.com/dsbebvfff/image/upload/v1716023980/31190_fkeow9.jpg', longitude: 105.8542, latitude: 21.0285 },
        { id: 3, avatar: 'https://res.cloudinary.com/dsbebvfff/image/upload/v1716023980/31189_lw8abu.jpg', longitude: 108.2772, latitude: 14.0583 },
    ]);


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={[JourneyStyle.floadTingButton, { left: 20 }]} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={white} />
            </TouchableOpacity>
            <View style={styles.containerMap}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 10.8231,          // Vĩ độ trung tâm (ví dụ: Thành phố Hồ Chí Minh, Việt Nam)
                        longitude: 106.6297,        // Kinh độ trung tâm (ví dụ: Thành phố Hồ Chí Minh, Việt Nam)
                        latitudeDelta: 0.0922,      // Độ phóng to theo vĩ độ (mức độ chi tiết theo chiều dọc)
                        longitudeDelta: 0.0421,     // Độ phóng to theo kinh độ (mức độ chi tiết theo chiều ngang)
                    }} >
                    {listVisit.map((item) => (
                        <Marker
                            key={item.id}
                            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                        >
                            <Avatar.Image size={32} source={{ uri: item.avatar }} />
                        </Marker>
                    ))}
                </MapView>
            </View>
        </View>
    )
}

export default MapMember

const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: "100%",
    },

})