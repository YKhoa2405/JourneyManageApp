import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { black, borderUnder, mainColor, txt16, white } from "../../assets/color";
import { Avatar } from "react-native-paper";
import JourneyStyle from "./JourneyStyle";

const MapMember = ({ route, navigation }) => {
    const { memberMap } = route.params;
    const filteredMemberMap = memberMap.filter(item => item.post.latitude !== null && item.post.longitude !== null);

    const calculateInitialRegion = (markers) => {
        if (markers.length === 0) {
            return {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 100,
                longitudeDelta: 100,
            };
        }

        const latitudes = markers.map(marker => marker.post.latitude);
        const longitudes = markers.map(marker => marker.post.longitude);

        const averageLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
        const averageLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;

        return {
            latitude: averageLatitude,
            longitude: averageLongitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.02,
        };
    };

    const initialRegion = calculateInitialRegion(filteredMemberMap);

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={[JourneyStyle.floadTingButton, { left: 20 }]} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={24} color={white} />
            </TouchableOpacity>
            <View style={styles.containerMap}>
                {filteredMemberMap.length === 0 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: txt16 }}>Không có dữ liệu vị trí thành viên.</Text>
                    </View>
                ) : (
                    <MapView
                        style={styles.map}
                        initialRegion={initialRegion}
                    >
                        {filteredMemberMap.map((item) => (
                            <Marker
                                key={item.id}
                                coordinate={{ latitude: item.post.latitude, longitude: item.post.longitude }}
                            >
                                <Avatar.Image size={32} source={{ uri: item.avatar }} />
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
        height: "100%",
    },
    noDataText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: black,
    },
});
