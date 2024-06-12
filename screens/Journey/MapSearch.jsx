import {
    StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import MapView, { BingMapsProvider, Marker, Polyline, } from "react-native-maps";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Searchbar } from 'react-native-paper';
import { black, borderUnder, mainColor, txt16, white } from "../../assets/color";
import getDistance from "geolib/es/getPreciseDistance";

const MapSearch = ({ navigation, route }) => {
    const [animation] = useState(new Animated.Value(400));
    const textInputRef = useRef(null);
    const API_key =
        "ArvHYzlNC_zl-qapSPj9KUSjb17DNAmCTHf0Lv-_sWiptCT-R26Ss9wvW5n9ytMr ";

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const [latitude1, setLatitude1] = useState(0);
    const [longitude1, setLongitude1] = useState(0);

    const [searchQuery, setsearchQuery] = useState("");
    const [searchQuery1, setsearchQuery1] = useState("");

    const [suggestions, setSuggestions] = useState([]);
    const [suggestions1, setSuggestions1] = useState([]);

    const [searching, setsearching] = useState(false);
    const [searching1, setsearching1] = useState(false);

    const [showConfirmButton, setShowConfirmButton] = useState(false);

    const startCoords = { latitude: latitude, longitude: longitude };
    const endCoords = { latitude: latitude1, longitude: longitude1 };

    const distanceJourney = getDistance(startCoords, endCoords)
    const distanceFotmat = (distanceJourney / 1000).toString()


    const handleFocus = (type) => {
        if (type === 'start') {
            setsearching(true);
        } else if (type === 'end') {
            setsearching1(true);
        }
    };

    const handleUnFocus = (type) => {
        if (type === 'start') {
            setsearching(false);
        } else if (type === 'end') {
            setsearching1(false);
        }
    };


    const handleFind = async (t, type) => {
        if (type === 'start') {
            setsearchQuery(t);
            textInputRef.current.blur();
            setsearching(false);
            try {
                const response = await fetch(
                    `https://dev.virtualearth.net/REST/v1/Locations?query=${t}&key=${API_key}`
                );
                const data = await response.json();
                const firstLocation = data.resourceSets[0].resources[0];
                const newlatitude = firstLocation.point.coordinates[0];
                const newlongitude = firstLocation.point.coordinates[1];

                // Set new latitude and longitude
                // This will update the map region
                setLatitude(newlatitude);
                setLongitude(newlongitude);
                setShowConfirmButton(true);
            } catch (error) {
                console.error("Error searching location:", error);
                Alert.alert(
                    "Error",
                    "An error occurred while searching for the location. Please try again later."
                );
            }
        } else if (type === 'end') {
            setsearchQuery1(t);
            textInputRef.current.blur();
            setsearching1(false);
            try {
                const response = await fetch(
                    `https://dev.virtualearth.net/REST/v1/Locations?query=${t}&key=${API_key}`
                );
                const data = await response.json();
                const firstLocation = data.resourceSets[0].resources[0];
                const newlatitude = firstLocation.point.coordinates[0];
                const newlongitude = firstLocation.point.coordinates[1];

                // Set new latitude and longitude
                // This will update the map region
                setLatitude1(newlatitude);
                setLongitude1(newlongitude);
                setShowConfirmButton(true);
            } catch (error) {
                console.error("Error searching location:", error);
                Alert.alert(
                    "Error",
                    "An error occurred while searching for the location. Please try again later."
                );
            }
        }
    };


    const handleQuery = async (t, type) => {
        if (type === 'start') {
            setsearchQuery(t);
            setShowConfirmButton(!(t === "" || searching));
            if (t === "") {
                return;
            }
            try {
                const response = await fetch(
                    `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${t}&key=${API_key}`
                );
                const data = await response.json();
                const suggestion = data.resourceSets[0].resources[0].value.map(
                    (a) => a.address.formattedAddress
                );
                setSuggestions(suggestion);
            } catch (error) {
                console.error("Error searching suggestions:", error);
            }
        } else if (type === 'end') {
            setsearchQuery1(t);
            setShowConfirmButton(!(t === "" || searching));
            if (t === "") {
                return;
            }
            try {
                const response = await fetch(
                    `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${t}&key=${API_key}`
                );
                const data = await response.json();
                const suggestion = data.resourceSets[0].resources[0].value.map(
                    (a) => a.address.formattedAddress
                );
                setSuggestions1(suggestion);
            } catch (error) {
                console.error("Error searching suggestions:", error);
            }
        }
    };


    const fetchLocation = async (query) => {
        try {
            const response = await fetch(
                `https://dev.virtualearth.net/REST/v1/Locations?query=${query}&key=${API_key}`
            );
            const data = await response.json();
            return data.resourceSets[0].resources[0].name;
        } catch (error) {
            console.error("Error searching location:", error);
            throw new Error("An error occurred while searching for the location. Please try again later.");
        }
    };
    // Click check nhận giá trị
    const handleConfirmLocation = async () => {
        try {
            const locationName = await fetchLocation(searchQuery);
            const locationName1 = await fetchLocation(searchQuery1);

            const previousScreen = route.params?.previousScreen;

            // Tùy thuộc vào màn hình trước đó, thực hiện điều hướng tương ứng
            switch (previousScreen) {
                case 'AddJourney':
                    navigation.navigate('AddJourney', { lat: latitude, lon: longitude, nameLoc: locationName, lat1: latitude1, lon1: longitude1, nameLoc1: locationName1, distanceFotmat: distanceFotmat });
                    break;
                default:
                    navigation.goBack(); // Trường hợp mặc định, quay lại màn hình trước
                    break;
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.container}>

            <MapView
                provider={BingMapsProvider}
                apiKey={API_key}
                style={styles.map}
                region={{
                    latitude: (latitude + latitude1) / 2,
                    longitude: (longitude + longitude1) / 2,
                    latitudeDelta: Math.abs(latitude - latitude1) * 1.5,
                    longitudeDelta: Math.abs(longitude - longitude1) * 1.5,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title="Điểm bắt đầu"
                    description="Địa điểm bạn sẽ bắt đầu hành trình"
                />
                <Marker
                    coordinate={{
                        latitude: latitude1,
                        longitude: longitude1,
                    }}
                    title="Điểm kết thúc"
                    description="Địa điểm bạn sẽ kết thúc hành trình"
                />
                <Polyline
                    coordinates={[
                        { latitude: latitude, longitude: longitude },
                        { latitude: latitude1, longitude: longitude1 },
                    ]}
                    strokeWidth={4}
                    strokeColor="blue"
                />
            </MapView>

            <View style={styles.headerSearch}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color={black} size={28}></Icon>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Nhập điểm bắt đầu..."
                        value={searchQuery}
                        onChangeText={(t) => handleQuery(t, 'start')}
                        onFocus={() => handleFocus('start')}
                        onBlur={() => handleUnFocus('start')}
                        ref={textInputRef}
                        iconColor="black"
                    />
                    <Searchbar
                        style={styles.searchInput}
                        placeholder="Nhập điểm kết thúc..."
                        value={searchQuery1}
                        onChangeText={(t) => handleQuery(t, 'end')}
                        onFocus={() => handleFocus('end')}
                        onBlur={() => handleUnFocus('end')}
                        ref={textInputRef}
                        iconColor="black"
                    />
                </View>

                <View style={styles.suggestion}>
                    {suggestions.length == 0 || searching == false ? (
                        <></>
                    ) : (
                        <>
                            {suggestions.map((s, index) => (
                                <TouchableOpacity key={index} onPress={() => handleFind(s, 'start')}>
                                    <Text style={styles.txtsugestion}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                    {suggestions1.length == 0 || searching1 == false ? (
                        <></>
                    ) : (
                        <>
                            {suggestions1.map((s, index) => (
                                <TouchableOpacity key={index} onPress={() => handleFind(s, 'end')}>
                                    <Text style={styles.txtsugestion}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>

            </View>

            {showConfirmButton && (
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
                    <Icon name="check" color={white} size={30}></Icon>
                </TouchableOpacity>
            )}

        </View>
    );
};

export default MapSearch;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    headerSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        padding: 8,
        top: 20
    },
    searchInput: {
        width: '92%',
        borderWidth: 1,
        borderColor: borderUnder,
        backgroundColor: white,
        marginBottom: 5,
        marginLeft: 10
    },
    suggestion: {
        width: '96%',
        position: "absolute",
        left: '4%',
        top: 140,
        backgroundColor: white,
        borderRadius: 10,
        borderColor: borderUnder,
        borderWidth: 1,
    },
    txtsugestion: {
        fontSize: txt16,
        borderBottomWidth: 1,
        borderColor: borderUnder,
        padding: 14
    },
    confirmButtonText: {
        fontWeight: "bold",
        fontSize: 16,

    },
    confirmButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: mainColor,
        borderRadius: 20,
        bottom: 10,
    }
});