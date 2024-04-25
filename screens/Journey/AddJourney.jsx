import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Platform, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import InputCpm from "../components/InputCpm";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMain from "../components/ButtonMain";
import { black, borderUnder, mainColor, txt16, white } from "../../assets/color";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_API_KEY from "../../config/GOOGLE_API_KEY";
import axios from "axios";
import AutocompleteInput from "react-native-autocomplete-input";
import JourneyStyle from "./JourneyStyle";

export default function AddJourney() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    // các giá trị của tạo hành trình
    const [journeyName, setJourneyName] = useState('')
    const [startLocation, setStartLocation] = useState(null)
    const [endLocation, setEndLocation] = useState(null)
    const [dateStart, setDateStart] = useState('')

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    // Khi phương thức được gọi, sẽ đảo ngươc giá trị của biến showPicker
    // Gọi hàm để ẩn hiện Picker
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
    }
    const fotmatDate = (rawDate) => {
        let date = new Date(rawDate)

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    }
    //onChange: xử lý sự kiện 
    const onChange = ({ type }, selectedDate) => {
        // type===set có nghĩa là nhấn ok
        if (type == 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

            // nếu là nền tảng android thì đongs picker lại và set giá trị hiển thị currentDate
            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateStart(fotmatDate(currentDate));
            }
        }
        else {
            toggleDatepicker()
        }
    }

    // Gán địa chỉ lên bản đồ
    // const handleFind = async (text) => {
    //     setSearchQuery(text)
    //     try {
    //         const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?query=${text}&key=${GOOGLE_API_KEY}`)

    //         const data = await response.json()
    //         const first
    //     } catch (error) {

    //     }

    // }
    // Tìm kiếm ddịa điểm, fetxh api 
    const handleQuery = async (text) => {
        setSearchQuery(text);
        if (text === '') {
            return;
        }
        try {
            const response = await fetch(
                `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${text}&key=${GOOGLE_API_KEY}`
            );
            const data = await response.json();
            const suggestions = data.resourceSets[0].resources.map((resource) => resource.value.map((a) => a.address.formattedAddress));
            setSuggestions(suggestions);
        } catch (error) {
            console.error("Error searching suggestions:", error);
        }
    };


    const handeAddJourney = () => {
        console.log('Start Location:', startLocation);
        console.log('End Location:', endLocation);
        console.log('End Location:', dateStart);
    };


    return (
        <View style={JourneyStyle.container}>
            <MapView style={JourneyStyle.map} />
            <View style={JourneyStyle.searchContainer}>

                <View style={JourneyStyle.itemContainer}>
                    <Icon name="wallet-travel" size={26} style={JourneyStyle.icon}></Icon>
                    <TextInput style={JourneyStyle.InputTime}
                        placeholder="Tên hành trình" />
                </View>
                <View style={JourneyStyle.itemContainer}>
                    <Icon name="calendar-blank-outline" size={26} style={JourneyStyle.icon}></Icon>
                    {!showPicker && (
                        <Pressable onPress={toggleDatepicker}>
                            <TextInput placeholder={'Thời gian bắt đầu'}
                                value={dateStart}
                                onChangeText={setDateStart}
                                editable={false}
                                style={JourneyStyle.InputTime}></TextInput>
                        </Pressable>
                    )}
                </View>
                {/* /* Hiển thị picker ngày tháng */}
                <View>
                    {showPicker && (
                        <DateTimePicker
                            mode="date"
                            value={date}
                            display="spinner"
                            onChange={onChange}
                        />
                    )}
                </View>
                <View style={JourneyStyle.itemContainer}>
                    <Icon name="map-outline" size={26} style={JourneyStyle.icon}></Icon>
                    <TextInput
                        placeholder="Search"
                        style={JourneyStyle.InputTime}
                        value={searchQuery}
                        onChangeText={handleQuery}
                    />
                </View>
                <View style={JourneyStyle.suggestion}>
                    {suggestions.length == 0  ? (
                        <></>
                    ) : (
                        <>
                            {suggestions.map((s, index) => (
                                <TouchableOpacity key={index} onPress={() => handleFind(s)}>
                                    <Text style={JourneyStyle.txtsugestion}>{s}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            </View>
        </View>

    );
}
