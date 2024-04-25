import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import JourneyStyle from "./JourneyStyle";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import MyContext from "../../config/MyContext";
import { ActivityIndicator, Avatar } from "react-native-paper";
import API, { endpoints } from "../../config/API";
import { black, txt16, txt18, txt20 } from "../../assets/color";
import JourneyDetail from "./JourneyDetail";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStyle from "../../styles/HomeStyle";

const MyJourney = () => {
    const [user, dispatch] = useContext(MyContext)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const navigation = useNavigation()




    useEffect(() => {
        JourneyGet()
    }, [])

    const JourneyGet = async () => {
        try {
            const res = await API.get(endpoints['get_journey']);
            const journey = res.data.results
            const userFillter = journey.filter(item => item.user_create.id === 3);
            setData(journey)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }


    const gotoPost = (journeyID) => {
        navigation.navigate('JourneyDetail', { journeyID: journeyID });
    };
    const renderItem = ({ item }) => {

        // Kiểm tra nếu item.id giống với user.id thì hiển thị nội dung
        return (
            <TouchableOpacity style={JourneyStyle.itemJourney}
                onPress={() => gotoPost(item.id)}>
                <View style={JourneyStyle.itemImage}>
                    <Image source={require('../../assets/welcome.png')}></Image>
                </View>
                <View style={JourneyStyle.itemContent}>
                    <View style={JourneyStyle.infoJourney}>

                        <Text style={{fontWeight:'bold', fontSize:txt16}}>{item.name_journey}</Text>
                    </View>
                    <View style={JourneyStyle.userJourney}>
                        <View>

                            <Avatar.Image size={30} source={{ uri: item.user_create.avatar }} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>{item.user_create.username}</Text>
                            <Text style={HomeStyle.text}>{item.user_create.phone} 0866695643</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={JourneyStyle.JourneyContainer}>
            {isLoading ? (
                <ActivityIndicator color={black} size='small' />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={2}
                    contentContainerStyle={JourneyStyle.flatListContent}
                    keyExtractor={(item) => item.id.toString()} // Thêm keyExtractor để tránh cảnh báo
                    ListEmptyComponent={<Text style={JourneyStyle.emptyList}>Không có hành trình nào</Text>} // Hiển thị thông báo khi danh sách trống
                />
            )}
        </View>
    )

}
export default MyJourney

