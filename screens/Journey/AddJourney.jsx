import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import InputCpm from "../components/InputCpm";
import HomeStyle from "../../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMain from "../components/ButtonMain";
import { mainColor, white } from "../../assets/color";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import GOOGLE_API_KEY from "../../config/GOOGLE_API_KEY";

export default function AddJourney() {
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

    const handeAddJourney = () => {
        console.log('Start Location:', startLocation);
        console.log('End Location:', endLocation);
        console.log('End Location:', dateStart);
    };


    return (
        <FlatList
            style={styles.container}
            data={['journeyName', 'startingLocation', 'endDestination', 'startTime']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View style={styles.itemContainer}>
                        {index === 0 ? (
                            <>
                                <Text style={HomeStyle.text}>Tên hành trình</Text>
                                <Icon name="wallet-travel" size={26} style={styles.icon} />
                                <InputCpm placeholder={'Tên hành trình'}
                                    value={journeyName}
                                    onChangeText={setJourneyName} />
                            </>
                        ) : index === 1 ? (
                            <>
                                <Text style={HomeStyle.text}>Điểm bắt đầu</Text>
                                <Icon name="map-outline" size={26} style={styles.icon} />
                                <GooglePlacesAutocomplete
                                    placeholder="Điểm bắt đầu"
                                    onPress={(data, details = null) => {
                                        // 'data' chứa thông tin vị trí đã chọn
                                        console.log(data);
                                    }}
                                    query={{
                                        key: 'Ah_ImlEnO0v_llPAVvpW6MQETM5uL3ZBNSlfvh_aIjUs8nmj9rj80HJCzXgmSzRG',
                                        language: 'vi',
                                    }}
                                    styles={{ textInput: styles.InputTime }}
                                />
                            </>
                        ) : index === 2 ? (
                            <>
                                <Text style={HomeStyle.text}>Điểm kết thúc</Text>
                                <Icon name="map-outline" size={26} style={styles.icon} />
                                <GooglePlacesAutocomplete
                                    placeholder="Điểm kết thúc"
                                    onPress={(data, details = null) => {
                                        // 'data' chứa thông tin vị trí đã chọn
                                        console.log(data);
                                    }}
                                    query={{
                                        key: 'Ah_ImlEnO0v_llPAVvpW6MQETM5uL3ZBNSlfvh_aIjUs8nmj9rj80HJCzXgmSzRG',
                                        language: 'vi',
                                    }}
                                    styles={{ textInput: styles.InputTime }}

                                />
                            </>
                        ) : index === 3 ? (
                            <>
                                <Text style={HomeStyle.text}>Thời gian</Text>
                                <Icon name="calendar-blank-outline" size={26} style={styles.icon} />
                                {!showPicker && (
                                    <Pressable onPress={toggleDatepicker}>
                                        <TextInput
                                            placeholder={'Thời gian'}
                                            value={dateStart}
                                            onChangeText={setDateStart}
                                            editable={false}
                                            style={styles.InputTime}
                                        />
                                    </Pressable>
                                )}
                                {showPicker && (
                                    <DateTimePicker
                                        mode="date"
                                        value={date}
                                        display="spinner"
                                        onChange={onChange}
                                    />
                                )}
                            </>
                        ) : (
                            <View style={styles.itemContainer}>
                            </View>
                        )}
                    </View>
                );
            }}
            ListFooterComponent={() => (
                <>
                    <View style={styles.addButtonContainer}>
                        <ButtonMain title={'Tạo hành trình'}
                            onPress={handeAddJourney} />
                    </View>
                    <TouchableOpacity style={styles.buttonCancel}>
                        <Text style={styles.buttonText}>Thoát</Text>
                    </TouchableOpacity>
                </>
            )}
        />

    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    addButtonContainer: {
        marginTop: 50
    },
    itemContainer: {
        marginTop: 20
    },
    icon: {
        paddingVertical: 13,
        paddingHorizontal: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
    },
    InputTime: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        backgroundColor: 'white',
        color: 'black'
    },
    InputMap: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10

    },
    buttonCancel: {
        backgroundColor: white,
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: mainColor,
        marginTop: 15,
        elevation: 4,
        marginBottom: 20
    },
    buttonText: {
        color: mainColor,
        fontSize: 16,
        fontWeight: '500'
    },
    containerMap: {
        marginTop: 20,
        borderRadius: 10
    },
    map: {
        width: '100%',
        height: 250,
        borderRadius: 10
    }
})