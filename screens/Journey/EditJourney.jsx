import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Platform, ActivityIndicator } from "react-native";
import ProfileStyle from "../Profile/ProfileStyle";
import JourneyStyle from "./JourneyStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"; // Make sure to install moment.js for date formatting
import ButtonMain from "../components/ButtonMain"; // Ensure this is the correct path to your ButtonMain component
import { black } from "../../assets/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../config/API";
import { ToastMess } from "../components/ToastMess";

const EditJourney = ({ navigation, route }) => {
    const [journeyID, setJourneyID] = useState('');
    const [journeyName, setJourneyName] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [distance, setDistance] = useState('');

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false)

    // const { journeyID, journeyDetailData } = route.params;
    // const { lon, lat, nameLoc, lon1, lat1, nameLoc1, distanceFotmat } = route.params || {};


    useEffect(() => {
        if (route.params?.dataFromScreen1) {
            const journeyDetailData = route.params.dataFromScreen1.journeyDetailData;
            setJourneyID(journeyDetailData.id)
            setJourneyName(journeyDetailData.name_journey);
            setDateStart(journeyDetailData.departure_time);
            setStartLocation(journeyDetailData.start_location);
            setEndLocation(journeyDetailData.end_location);
            setDistance(journeyDetailData.distance);
        }
        if (route.params?.dataFromScreen2) {
            const { nameLoc, nameLoc1, distanceFotmat } = route.params.dataFromScreen2;
            if (nameLoc) {
                const nameLocFormat = nameLoc.length > 40 ? `${nameLoc.split(' ').slice(0, 11).join(' ')}...` : nameLoc;
                setStartLocation(nameLocFormat);
            }
            if (nameLoc1) {
                const nameLocFormat = nameLoc1.length > 40 ? `${nameLoc1.split(' ').slice(0, 11).join(' ')}...` : nameLoc1;
                setEndLocation(nameLocFormat);
            }
            if (distanceFotmat) {
                setDistance(distanceFotmat);
            }
        }
    }, [route.params]);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setDateStart(moment(currentDate).format('DD-MM-YYYY'));
            }
        } else {
            toggleDatepicker();
        }
    };

    const saveChanges = async () => {
        setLoading(true)
        let formJourney = new FormData()
        formJourney.append('name_journey', journeyName)
        formJourney.append('departure_time', dateStart)
        formJourney.append('start_location', startLocation)
        formJourney.append('end_location', endLocation)
        formJourney.append('distance', distance)

        console.log(formJourney)

        try {
            let token = await AsyncStorage.getItem('access-token');
            await authApi(token).patch(endpoints['edit_journey'](journeyID), formJourney, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            })
            ToastMess({ type: 'success', text1: ' Chỉnh sửa hành trình thành công' })
            navigation.goBack()

        } catch (error) {
            ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
            console.log(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={JourneyStyle.itemContainer}>
                <Icon name="wallet-travel" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput
                    style={JourneyStyle.InputTime}
                    placeholder="Tên hành trình"
                    value={journeyName}
                    onChangeText={setJourneyName}
                />
            </View>
            <View style={JourneyStyle.itemContainer}>
                <Icon name="calendar-blank-outline" size={26} style={JourneyStyle.icon}></Icon>
                {!showPicker && (
                    <Pressable onPress={toggleDatepicker}>
                        <TextInput
                            placeholder={'Thời gian bắt đầu'}
                            value={dateStart}
                            onChangeText={setDateStart}
                            editable={false}
                            style={JourneyStyle.InputTime}
                        />
                    </Pressable>
                )}
            </View>
            <TouchableOpacity
                style={JourneyStyle.itemContainer}
                onPress={() => navigation.navigate("MapSearch", { previousScreen: 'EditJourney' })}
            >
                <Icon name="map-marker" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput
                    style={JourneyStyle.InputTime}
                    placeholder="Địa điểm bắt đầu hành trình"
                    value={startLocation}
                    onChangeText={setStartLocation}
                    editable={false}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={JourneyStyle.itemContainer}
                onPress={() => navigation.navigate("MapSearch", { previousScreen: 'EditJourney' })}
            >
                <Icon name="map-marker" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput
                    style={JourneyStyle.InputTime}
                    placeholder="Địa điểm kết thúc hành tình"
                    value={endLocation}
                    onChangeText={setEndLocation}
                    editable={false}
                />
            </TouchableOpacity>
            <View style={JourneyStyle.itemContainer}>
                <Icon name="wallet-travel" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput
                    style={JourneyStyle.InputTime}
                    editable={false}
                    value={distance}
                    placeholder="Khoảng cách"
                    onChangeText={setDistance}
                />
            </View>
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
            {loading ? (<ActivityIndicator size="large" color={black} />) : (
                <ButtonMain
                    title="Lưu thông tin"
                    onPress={() => saveChanges()}
                />
            )}
        </View>
    );
};

export default EditJourney;
