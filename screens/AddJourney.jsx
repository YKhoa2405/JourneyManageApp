import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform, TextInput, TouchableOpacity } from "react-native";
import InputCpm from "./components/InputCpm";
import HomeStyle from "../styles/HomeStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonMain from "./components/ButtonMain";
import { mainColor, white } from "../assets/color";

export default function AddJourney() {
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


    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                <Text style={HomeStyle.text}>Tên hành trình</Text>
                <Icon name="wallet-travel" size={26} style={styles.icon}></Icon>
                <InputCpm placeholder={'Tên hành trình'}></InputCpm>
            </View>
            <View style={styles.itemContainer}>
                <Text style={HomeStyle.text}>Địa điểm khởi hành</Text>
                <Icon name="map-outline" size={26} style={styles.icon}></Icon>
                <InputCpm placeholder={'Địa điểm khởi hành'}></InputCpm>

            </View>
            <View style={styles.itemContainer}>
                <Text style={HomeStyle.text}>Địa điểm kết thúc</Text>
                <Icon name="map-outline" size={26} style={styles.icon}></Icon>
                <InputCpm placeholder={'Địa điểm kết thúc'}></InputCpm>
            </View>
            <View style={styles.itemContainer}>
                <Icon name="calendar-blank-outline" size={26} style={styles.icon}></Icon>
                <Text style={HomeStyle.text}>Thời gian bắt đầu</Text>
                {!showPicker && (
                    <Pressable onPress={toggleDatepicker}>
                        <TextInput placeholder={'Thời gian bắt đầu'}
                            value={dateStart}
                            onChangeText={setDateStart}
                            editable={false}
                            style={styles.InputTime}></TextInput>
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
            <View style={styles.addButtonContainer}>
                <ButtonMain title={'Tạo hành trình'}></ButtonMain>
            </View>
            <View>
                <TouchableOpacity style={styles.buttonCancel}>
                    <Text style={styles.buttonText}>Thoát</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    addButtonContainer: {
        marginTop: 50
    },
    itemContainer: {
        marginTop: 25
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
    buttonCancel: {
        backgroundColor:white,
        padding:18,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:mainColor,
        marginTop:15,
        elevation:4
    },
    buttonText:{
        color:mainColor,
        fontSize:16,
        fontWeight:'500'
    }
})