import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Platform, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMain from "../components/ButtonMain";
import { ImagesRandom, black } from "../../assets/color";
import JourneyStyle from "./JourneyStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API, { authApi, endpoints } from "../../config/API";
import moment from "moment";
import { ToastMess } from "../components/ToastMess";

export default function AddJourney({ navigation, route }) {

    // các giá trị của tạo hành trình
    const [journeyName, setJourneyName] = useState('')
    const [startLocation, setStartLocation] = useState(null)
    const [endLocation, setEndLocation] = useState(null)
    const [dateStart, setDateStart] = useState('')
    const [distance, setDistance] = useState('')
    const [estimatedTime, seteStimatedTime] = useState('')
    const [background, setBackground] = useState(null)

    const [date, setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [loading, setLoading] = useState(false)

    const { lon, lat, nameLoc, lon1, lat1, nameLoc1, distanceFotmat } = route.params || {};

    useEffect(() => {
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
        getRandomImage()
    }, [nameLoc, nameLoc1, distance]);



    // Khi phương thức được gọi, sẽ đảo ngươc giá trị của biến showPicker
    // Gọi hàm để ẩn hiện Picker
    const toggleDatepicker = () => {
        setShowPicker(!showPicker)
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
                setDateStart(moment(currentDate).format('DD-MM-YYYY'));
            }
        }
        else {
            toggleDatepicker()
        }
    }



    const getRandomImage = () => {
        const randomImage = ImagesRandom[Math.floor(Math.random() * ImagesRandom.length)].image;
        setBackground(randomImage);
    };

    const handeAddJourney = async () => {
        if (!journeyName || !dateStart || !startLocation || !endLocation) {
            ToastMess({ type: 'error', text1: 'Vui lòng nhập đầy đủ thông tin' })
            return
        }

        let formJourney = new FormData()
        formJourney.append('name_journey', journeyName)
        formJourney.append('departure_time', dateStart)
        formJourney.append('start_location', startLocation)
        formJourney.append('background ', background)
        formJourney.append('end_location', endLocation)
        formJourney.append('distance', distance)
        formJourney.append('estimated_time', estimatedTime)

        setLoading(true)
        try {
            let token = await AsyncStorage.getItem('access-token');
            console.log(token)
            await authApi(token).post(endpoints['post_journey'], formJourney, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            },)
            ToastMess({ type: 'success', text1: 'Tạo hành trình thành công' })
            navigation.navigate("HomeScreen")
            setJourneyName('');
            setStartLocation('');
            setEndLocation('');
            setDateStart('');
            setDistance('');

        } catch (error) {
            if (error.response && error.response.status === 400) {
                ToastMess({ type: 'error', text1: 'Vui lòng đăng nhập tài khoản' })
                console.log(error)
            } else {
                // Lỗi khác xảy ra
                ToastMess({ type: 'error', text1: 'Có lỗi xảy ra, vui lòng thử lại' })
            }
        } finally {
            setLoading(false);
        }

    };



    return (
        <ImageBackground source={require('../../assets/bg.jpg')} style={JourneyStyle.container}>

            <View style={JourneyStyle.itemContainer}>
                <Icon name="wallet-travel" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput style={JourneyStyle.InputTime}
                    placeholder="Tên hành trình"
                    onChangeText={t => setJourneyName(t)}
                />
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
            <TouchableOpacity
                style={JourneyStyle.itemContainer}
                onPress={() => navigation.navigate("MapSearch", { previousScreen: 'AddJourney' })}>
                <Icon name="map-marker" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput style={JourneyStyle.InputTime}
                    placeholder="Địa điểm bắt đầu hành trình"
                    value={startLocation}
                    onChangeText={setStartLocation}
                    editable={false} />
            </TouchableOpacity>

            <TouchableOpacity
                style={JourneyStyle.itemContainer}
                onPress={() => navigation.navigate("MapSearch", { previousScreen: 'AddJourney' })}>
                <Icon name="map-marker" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput style={JourneyStyle.InputTime}
                    placeholder="Địa điểm kết thúc hành tình"
                    value={endLocation}
                    onChangeText={setEndLocation}
                    editable={false} />
            </TouchableOpacity>

            <View style={JourneyStyle.itemContainer}>
                <Icon name="wallet-travel" size={26} style={JourneyStyle.icon}></Icon>
                <TextInput style={JourneyStyle.InputTime}
                    editable={false}
                    // value={distance+ " km"}
                    value={distanceFotmat}
                    placeholder="Khoảng cách"
                    onChangeText={setDistance} />
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
            {loading ? (<ActivityIndicator size={'large'} color={black} />) : (

                <ButtonMain
                    title={'Tạo hành trình'}
                    style={JourneyStyle.addButtonContainer}
                    onPress={handeAddJourney}
                    disabled={loading} />
            )}
        </ImageBackground>

    );
}
